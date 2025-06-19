import {
  createNavigatorFactory,
  ParamListBase,
  StackNavigationState,
  StackRouter,
  useNavigationBuilder,
  useTheme,
} from '@react-navigation/native';
import { NativeStackNavigationOptions, NativeStackView } from '@react-navigation/native-stack';
import React from 'react';
import { Platform } from 'react-native';
import { Drawer } from 'vaul';

import { withLayoutContext } from './withLayoutContext';
import modalStyles from '../../assets/modal.module.css';

/** Extend NativeStackNavigationOptions with extra sheet/detent props */
type ModalStackNavigationOptions = NativeStackNavigationOptions & {
  presentation?: 'modal' | 'formSheet' | 'containedModal' | 'card' | 'fullScreenModal';
  sheetAllowedDetents?: (number | string)[];
  sheetInitialDetentIndex?: number;
  sheetGrabberVisible?: boolean;
  /** Largest detent index that remains undimmed (matches iOS). Accepts numeric index, 'none', or 'last'. */
  sheetLargestUndimmedDetentIndex?: number | 'none' | 'last';
  /** Override the corner radius (px) applied to the top of the drawer sheet. */
  sheetCornerRadius?: number;
};

type Props = {
  initialRouteName?: string;
  screenOptions?: ModalStackNavigationOptions;
  children: React.ReactNode;
};

function ModalStackNavigator({ initialRouteName, children, screenOptions }: Props) {
  const { state, navigation, descriptors, NavigationContent, describe } = useNavigationBuilder(
    StackRouter,
    {
      children,
      screenOptions,
      initialRouteName,
    }
  );

  return (
    <NavigationContent>
      <ModalStackView
        state={state}
        navigation={navigation}
        descriptors={descriptors}
        describe={describe}
      />
    </NavigationContent>
  );
}

function ModalStackView({
  state,
  navigation,
  descriptors,
  describe,
}: {
  state: StackNavigationState<ParamListBase>;
  navigation: any;
  descriptors: Record<
    string,
    {
      navigation: any;
      route: any;
      options: ModalStackNavigationOptions;
      render: () => React.ReactNode;
    }
  >;
  describe: any;
}) {
  const isWeb = Platform.OS === 'web';
  const { colors } = useTheme();

  const nonModalRoutes = state.routes.filter((route) => {
    const { presentation } = descriptors[route.key].options || {};
    const isModalType =
      presentation === 'modal' ||
      presentation === 'formSheet' ||
      presentation === 'fullScreenModal' ||
      presentation === 'containedModal';
    return !(isWeb && isModalType);
  });

  let nonModalIndex = nonModalRoutes.findIndex((r) => r.key === state.routes[state.index]?.key);
  if (nonModalIndex < 0) nonModalIndex = nonModalRoutes.length - 1;

  const newStackState = { ...state, routes: nonModalRoutes, index: nonModalIndex };

  return (
    <div style={{ flex: 1, display: 'flex' }}>
      <NativeStackView
        state={newStackState}
        navigation={navigation}
        descriptors={descriptors as any}
        describe={describe}
      />
      {isWeb &&
        state.routes.map((route, i) => {
          const { presentation } = descriptors[route.key].options || {};
          const isModalType =
            presentation === 'modal' ||
            presentation === 'formSheet' ||
            presentation === 'fullScreenModal' ||
            presentation === 'containedModal';
          const isActive = i === state.index && isModalType;
          if (!isActive) return null;

          return (
            <RouteDrawer
              key={route.key}
              routeKey={route.key}
              options={descriptors[route.key].options as ModalStackNavigationOptions}
              renderScreen={descriptors[route.key].render}
              onDismiss={() => navigation.goBack()}
              themeColors={colors}
            />
          );
        })}
    </div>
  );
}

const createModalStack = createNavigatorFactory(ModalStackNavigator);
const RouterModal = withLayoutContext(createModalStack().Navigator);

export { RouterModal };

// Internal helper component

function RouteDrawer({
  routeKey,
  options,
  renderScreen,
  onDismiss,
  themeColors,
}: {
  routeKey: string;
  options: ModalStackNavigationOptions;
  renderScreen: () => React.ReactNode;
  onDismiss: () => void;
  themeColors: { card: string; background: string };
}) {
  const [open, setOpen] = React.useState(true);
  // Resolve snap points logic.
  const allowed = options.sheetAllowedDetents;

  const isArrayDetents = Array.isArray(allowed);
  const useCustomSnapPoints = isArrayDetents && !(allowed.length === 1 && allowed[0] === 1);

  const snapPoints: (number | string)[] | undefined = useCustomSnapPoints
    ? (allowed as (number | string)[])
    : undefined;

  const [snap, setSnap] = React.useState<number | string | null>(
    useCustomSnapPoints && isArrayDetents ? allowed[0] : 1
  );

  // Map react-native-screens ios sheet undimmed logic to Vaul's fadeFromIndex
  const fadeFromIndex =
    options.presentation === 'formSheet'
      ? options.sheetLargestUndimmedDetentIndex === 'last'
        ? (snapPoints?.length ?? 0)
        : typeof options.sheetLargestUndimmedDetentIndex === 'number'
          ? options.sheetLargestUndimmedDetentIndex + 1
          : 0
      : 0;

  // Merge provided contentStyle with defaults
  const baseContentStyle: React.CSSProperties =
    options.contentStyle &&
    typeof options.contentStyle === 'object' &&
    !Array.isArray(options.contentStyle)
      ? (options.contentStyle as React.CSSProperties)
      : {};

  const mergedContentStyle: React.CSSProperties = {
    backgroundColor: themeColors.background,
    ...baseContentStyle,
    ...(options.sheetCornerRadius != null ? { borderRadius: options.sheetCornerRadius } : {}),
  };

  const handleOpenChange = (open: boolean) => {
    if (!open) onDismiss();
  };

  return (
    <Drawer.Root
      key={routeKey}
      open={open}
      snapPoints={snapPoints as unknown as (number | string)[]}
      activeSnapPoint={snap}
      setActiveSnapPoint={setSnap}
      shouldScaleBackground={options.presentation !== 'formSheet'}
      fadeFromIndex={fadeFromIndex}
      dismissible
      onAnimationEnd={handleOpenChange}
      onOpenChange={setOpen}>
      <Drawer.Portal>
        <Drawer.Overlay
          style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.4)' }}
        />
        <Drawer.Content className={modalStyles.drawerContent} style={{ pointerEvents: 'none' }}>
          <div
            className={modalStyles.modal}
            data-presentation={options.presentation}
            style={mergedContentStyle}>
            {options.sheetGrabberVisible && (
              <div className={modalStyles.grabberRow}>
                <div className={modalStyles.grabber} />
              </div>
            )}
            <div className={modalStyles.modalBody}>{renderScreen()}</div>
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
}
