"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RouterModal = void 0;
const native_1 = require("@react-navigation/native");
const native_stack_1 = require("@react-navigation/native-stack");
const react_1 = __importDefault(require("react"));
const react_native_1 = require("react-native");
const vaul_1 = require("vaul");
const withLayoutContext_1 = require("./withLayoutContext");
const modal_module_css_1 = __importDefault(require("../../assets/modal.module.css"));
function ModalStackNavigator({ initialRouteName, children, screenOptions }) {
    const { state, navigation, descriptors, NavigationContent, describe } = (0, native_1.useNavigationBuilder)(native_1.StackRouter, {
        children,
        screenOptions,
        initialRouteName,
    });
    return (<NavigationContent>
      <ModalStackView state={state} navigation={navigation} descriptors={descriptors} describe={describe}/>
    </NavigationContent>);
}
function ModalStackView({ state, navigation, descriptors, describe, }) {
    const isWeb = react_native_1.Platform.OS === 'web';
    const { colors } = (0, native_1.useTheme)();
    const nonModalRoutes = state.routes.filter((route) => {
        const { presentation } = descriptors[route.key].options || {};
        const isModalType = presentation === 'modal' ||
            presentation === 'formSheet' ||
            presentation === 'fullScreenModal' ||
            presentation === 'containedModal';
        return !(isWeb && isModalType);
    });
    let nonModalIndex = nonModalRoutes.findIndex((r) => r.key === state.routes[state.index]?.key);
    if (nonModalIndex < 0)
        nonModalIndex = nonModalRoutes.length - 1;
    const newStackState = { ...state, routes: nonModalRoutes, index: nonModalIndex };
    return (<div style={{ flex: 1, display: 'flex' }}>
      <native_stack_1.NativeStackView state={newStackState} navigation={navigation} descriptors={descriptors} describe={describe}/>
      {isWeb &&
            state.routes.map((route, i) => {
                const { presentation } = descriptors[route.key].options || {};
                const isModalType = presentation === 'modal' ||
                    presentation === 'formSheet' ||
                    presentation === 'fullScreenModal' ||
                    presentation === 'containedModal';
                const isActive = i === state.index && isModalType;
                if (!isActive)
                    return null;
                return (<RouteDrawer key={route.key} routeKey={route.key} options={descriptors[route.key].options} renderScreen={descriptors[route.key].render} onDismiss={() => navigation.goBack()} themeColors={colors}/>);
            })}
    </div>);
}
const createModalStack = (0, native_1.createNavigatorFactory)(ModalStackNavigator);
const RouterModal = (0, withLayoutContext_1.withLayoutContext)(createModalStack().Navigator);
exports.RouterModal = RouterModal;
// Internal helper component
function RouteDrawer({ routeKey, options, renderScreen, onDismiss, themeColors, }) {
    const [open, setOpen] = react_1.default.useState(true);
    // Resolve snap points logic.
    const allowed = options.sheetAllowedDetents;
    const isArrayDetents = Array.isArray(allowed);
    const useCustomSnapPoints = isArrayDetents && !(allowed.length === 1 && allowed[0] === 1);
    const snapPoints = useCustomSnapPoints
        ? allowed
        : undefined;
    const [snap, setSnap] = react_1.default.useState(useCustomSnapPoints && isArrayDetents ? allowed[0] : 1);
    // Map react-native-screens ios sheet undimmed logic to Vaul's fadeFromIndex
    const fadeFromIndex = options.presentation === 'formSheet'
        ? options.sheetLargestUndimmedDetentIndex === 'last'
            ? (snapPoints?.length ?? 0)
            : typeof options.sheetLargestUndimmedDetentIndex === 'number'
                ? options.sheetLargestUndimmedDetentIndex + 1
                : 0
        : 0;
    // Merge provided contentStyle with defaults
    const baseContentStyle = options.contentStyle &&
        typeof options.contentStyle === 'object' &&
        !Array.isArray(options.contentStyle)
        ? options.contentStyle
        : {};
    const mergedContentStyle = {
        backgroundColor: themeColors.background,
        ...baseContentStyle,
        ...(options.sheetCornerRadius != null ? { borderRadius: options.sheetCornerRadius } : {}),
    };
    const handleOpenChange = (open) => {
        if (!open)
            onDismiss();
    };
    return (<vaul_1.Drawer.Root key={routeKey} open={open} snapPoints={snapPoints} activeSnapPoint={snap} setActiveSnapPoint={setSnap} shouldScaleBackground={options.presentation !== 'formSheet'} fadeFromIndex={fadeFromIndex} dismissible={options.gestureEnabled ?? true} onAnimationEnd={handleOpenChange} onOpenChange={setOpen}>
      <vaul_1.Drawer.Portal>
        <vaul_1.Drawer.Overlay style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.4)' }}/>
        <vaul_1.Drawer.Content className={modal_module_css_1.default.drawerContent} style={{ pointerEvents: 'none' }}>
          <div className={modal_module_css_1.default.modal} data-presentation={options.presentation} style={mergedContentStyle}>
            {options.sheetGrabberVisible && (<div className={modal_module_css_1.default.grabberRow}>
                <div className={modal_module_css_1.default.grabber}/>
              </div>)}
            <div className={modal_module_css_1.default.modalBody}>{renderScreen()}</div>
          </div>
        </vaul_1.Drawer.Content>
      </vaul_1.Drawer.Portal>
    </vaul_1.Drawer.Root>);
}
//# sourceMappingURL=ModalStack.js.map