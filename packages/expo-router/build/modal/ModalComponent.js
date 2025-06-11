"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModalComponent = ModalComponent;
const native_1 = require("@react-navigation/native");
const react_1 = require("react");
const react_native_1 = require("react-native");
const ModalContext_1 = require("./ModalContext");
const useNavigation_1 = require("../useNavigation");
function ModalComponent({ route, }) {
    const { modalConfigs, closeModal } = (0, ModalContext_1.useModalContext)();
    const navigation = (0, useNavigation_1.useNavigation)();
    const id = route.params.id;
    const modalConfig = (0, react_1.useMemo)(() => modalConfigs.find((config) => config.uniqueId === id), [modalConfigs, id]);
    const component = modalConfig?.component;
    const navigationProp = modalConfig?.navigationProp;
    (0, react_1.useEffect)(() => {
        return navigation.addListener('beforeRemove', () => {
            closeModal(id);
        });
    }, [navigation]);
    if (navigationProp) {
        return (<native_1.NavigationContext value={navigationProp}>
        <react_native_1.View style={{ flex: 1 }}>{component}</react_native_1.View>
      </native_1.NavigationContext>);
    }
    return <react_native_1.View style={{ flex: 1 }}>{component}</react_native_1.View>;
}
//# sourceMappingURL=ModalComponent.js.map