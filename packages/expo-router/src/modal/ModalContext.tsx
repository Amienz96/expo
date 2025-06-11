import { type ParamListBase } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import {
  createContext,
  use,
  useCallback,
  useEffect,
  useRef,
  useState,
  type PropsWithChildren,
} from 'react';

interface ModalConfig {
  component: React.ReactNode;
  navigationProp: NativeStackNavigationProp<ParamListBase>;
  uniqueId: string;
}

export interface ModalContextType {
  modalConfigs: ModalConfig[];
  openModal: (config: ModalConfig) => void;
  closeModal: (id: string) => void;
  addEventListener: (type: 'close', callback: (id: string) => void) => () => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const ModalContextProvider = ({ children }: PropsWithChildren) => {
  const [modalConfigs, setModalConfigs] = useState<ModalConfig[]>([]);
  const eventListeners = useRef<Set<(id: string) => void>>(new Set());
  const prevModalConfigs = useRef<ModalConfig[]>([]);

  useEffect(() => {
    if (prevModalConfigs.current !== modalConfigs) {
      prevModalConfigs.current.forEach((config) => {
        if (!modalConfigs.find((c) => c.uniqueId === config.uniqueId)) {
          eventListeners.current.forEach((callback) => callback(config.uniqueId));
        }
      });
      prevModalConfigs.current = modalConfigs;
    }
  }, [modalConfigs]);

  const openModal = useCallback(function openModal(config: ModalConfig) {
    setModalConfigs((prev) => {
      const newModalConfigs = [...prev, config];
      config.navigationProp.push('__internal__modal', { id: config.uniqueId });
      return newModalConfigs;
    });
  }, []);

  const closeModal = useCallback((id: string) => {
    setModalConfigs((prev) => {
      const modalIndex = prev.findIndex((config) => config.uniqueId === id);
      if (modalIndex >= 0) {
        if (modalIndex > 0) {
          prev[modalIndex].navigationProp.popTo('__internal__modal', {
            id: prev[modalIndex - 1].uniqueId,
          });
        } else {
          prev[modalIndex].navigationProp.popToTop();
        }
        return prev.filter((_, index) => index < modalIndex);
      }
      return prev;
    });
  }, []);

  const addEventListener = useCallback((type: 'close', callback: (id: string) => void) => {
    if (type !== 'close') return () => {};

    if (!callback) {
      console.warn('Passing undefined as a callback to addEventListener is forbidden');
      return () => {};
    }

    eventListeners.current.add(callback);

    return () => {
      eventListeners.current.delete(callback);
    };
  }, []);

  return (
    <ModalContext.Provider
      value={{
        modalConfigs,
        openModal,
        closeModal,
        addEventListener,
      }}>
      {children}
    </ModalContext.Provider>
  );
};

export const useModalContext = () => {
  const context = use(ModalContext);
  if (!context) {
    throw new Error('useModalContext must be used within a ModalContextProvider');
  }
  return context;
};
