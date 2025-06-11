"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useModalContext = exports.ModalContextProvider = void 0;
const react_1 = require("react");
const ModalContext = (0, react_1.createContext)(undefined);
const ModalContextProvider = ({ children }) => {
    const [modalConfigs, setModalConfigs] = (0, react_1.useState)([]);
    const eventListeners = (0, react_1.useRef)(new Set());
    const prevModalConfigs = (0, react_1.useRef)([]);
    (0, react_1.useEffect)(() => {
        if (prevModalConfigs.current !== modalConfigs) {
            prevModalConfigs.current.forEach((config) => {
                if (!modalConfigs.find((c) => c.uniqueId === config.uniqueId)) {
                    eventListeners.current.forEach((callback) => callback(config.uniqueId));
                }
            });
            prevModalConfigs.current = modalConfigs;
        }
    }, [modalConfigs]);
    const openModal = (0, react_1.useCallback)(function openModal(config) {
        setModalConfigs((prev) => {
            const newModalConfigs = [...prev, config];
            config.navigationProp.push('__internal__modal', { id: config.uniqueId });
            return newModalConfigs;
        });
    }, []);
    const closeModal = (0, react_1.useCallback)((id) => {
        setModalConfigs((prev) => {
            const modalIndex = prev.findIndex((config) => config.uniqueId === id);
            if (modalIndex >= 0) {
                if (modalIndex > 0) {
                    prev[modalIndex].navigationProp.popTo('__internal__modal', {
                        id: prev[modalIndex - 1].uniqueId,
                    });
                }
                else {
                    prev[modalIndex].navigationProp.popToTop();
                }
                return prev.filter((_, index) => index < modalIndex);
            }
            return prev;
        });
    }, []);
    const addEventListener = (0, react_1.useCallback)((type, callback) => {
        if (type !== 'close')
            return () => { };
        if (!callback) {
            console.warn('Passing undefined as a callback to addEventListener is forbidden');
            return () => { };
        }
        eventListeners.current.add(callback);
        return () => {
            eventListeners.current.delete(callback);
        };
    }, []);
    return (<ModalContext.Provider value={{
            modalConfigs,
            openModal,
            closeModal,
            addEventListener,
        }}>
      {children}
    </ModalContext.Provider>);
};
exports.ModalContextProvider = ModalContextProvider;
const useModalContext = () => {
    const context = (0, react_1.use)(ModalContext);
    if (!context) {
        throw new Error('useModalContext must be used within a ModalContextProvider');
    }
    return context;
};
exports.useModalContext = useModalContext;
//# sourceMappingURL=ModalContext.js.map