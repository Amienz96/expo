import { Modal, useNavigation, usePathname, useSegments } from 'expo-router';
import { useState } from 'react';
import { Button, Text, View } from 'react-native';

export default function Page() {
  const [openModals, setOpenModals] = useState([false, false, false]);
  const pathname = usePathname();
  return (
    <View>
      <Text testID="index-text" style={{ fontFamily: 'sweet' }}>
        Index ({pathname})
      </Text>
      <Button
        title="Open modal"
        onPress={() => {
          setOpenModals((prev) => {
            const newOpenModals = [...prev];
            newOpenModals[0] = true;
            return newOpenModals;
          });
        }}
      />
      {openModals.map((isOpen, index) => (
        <Modal
          key={index}
          visible={isOpen}
          onClose={() => {
            setOpenModals((prev) => {
              const newOpenModals = [...prev];
              newOpenModals[index] = false;
              return newOpenModals;
            });
          }}>
          <ModalContent
            index={index}
            onCloseButtonPressed={() => {
              setOpenModals((prev) => {
                const newOpenModals = [...prev];
                newOpenModals[index] = false;
                return newOpenModals;
              });
            }}
            onOpenAnotherModal={() => {
              setOpenModals((prev) => {
                const newOpenModals = [...prev];
                newOpenModals[index + 1] = true;
                return newOpenModals;
              });
            }}
          />
        </Modal>
      ))}
    </View>
  );
}

function ModalContent({
  onCloseButtonPressed,
  onOpenAnotherModal,
  index,
}: {
  onCloseButtonPressed: () => void;
  onOpenAnotherModal: () => void;
  index: number;
}) {
  const navigation = useNavigation();
  const pathname = usePathname();
  const segments = useSegments();

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#f00',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <Text>Hi from modal {index}</Text>
      <Text>{pathname}</Text>
      <Text>{segments}</Text>
      <Button title="Open another modal" onPress={onOpenAnotherModal} />
      <Button title="goBack" onPress={() => navigation.goBack()} />
      <Button title="close" onPress={onCloseButtonPressed} />
    </View>
  );
}
