import { type ParamListBase } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { type PropsWithChildren } from 'react';
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
export declare const ModalContextProvider: ({ children }: PropsWithChildren) => import("react").JSX.Element;
export declare const useModalContext: () => ModalContextType;
export {};
//# sourceMappingURL=ModalContext.d.ts.map