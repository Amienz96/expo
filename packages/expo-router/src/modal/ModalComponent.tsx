import { NavigationContext } from '@react-navigation/native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useEffect, useMemo } from 'react';
import { View } from 'react-native';

import { useModalContext } from './ModalContext';
import { useNavigation } from '../useNavigation';

export function ModalComponent({
  route,
}: NativeStackScreenProps<{ __internal__modal: { id: string } }>) {
  const { modalConfigs, closeModal } = useModalContext();
  const navigation = useNavigation();
  const id = (route.params as { id: string }).id;
  const modalConfig = useMemo(
    () => modalConfigs.find((config) => config.uniqueId === id),
    [modalConfigs, id]
  );
  const component = modalConfig?.component;
  const navigationProp = modalConfig?.navigationProp;

  useEffect(() => {
    return navigation.addListener('beforeRemove', () => {
      closeModal(id);
    });
  }, [navigation]);

  if (navigationProp) {
    return (
      <NavigationContext value={navigationProp}>
        <View style={{ flex: 1 }}>{component}</View>
      </NavigationContext>
    );
  }
  return <View style={{ flex: 1 }}>{component}</View>;
}
