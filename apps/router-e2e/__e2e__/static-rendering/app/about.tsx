import { Modal, useNavigation, usePathname, useSegments } from 'expo-router';
import { useState } from 'react';
import { Button, Text, View } from 'react-native';

export default function Page() {
  const [isModal1Open, setIsModal1Open] = useState(false);
  const [isModal2Open, setIsModal2Open] = useState(false);
  const [isModal3Open, setIsModal3Open] = useState(false);

  const closeModal = (index: number) => {
    console.log(`Close modal ${index} pressed`);
    switch (index) {
      case 1:
        setIsModal1Open(false);
        break;
      case 2:
        setIsModal2Open(false);
        break;
      case 3:
        setIsModal3Open(false);
        break;
    }
  };

  const pathname = usePathname();
  return (
    <View>
      <Text testID="index-text" style={{ fontFamily: 'sweet' }}>
        About ({pathname})
      </Text>
      <Button
        title="Open modal"
        onPress={() => {
          setIsModal1Open(true);
        }}
      />
      <Modal
        visible={isModal1Open}
        onClose={() => {
          console.log('Modal 1 closed');
          setIsModal1Open(false);
        }}>
        <ModalContent
          index={1}
          onCloseButtonPressed={closeModal}
          onOpenAnotherModal={() => {
            setIsModal2Open(true);
          }}
        />
      </Modal>
      <Modal
        visible={isModal2Open}
        onClose={() => {
          console.log('Modal 2 closed');
          setIsModal2Open(false);
        }}>
        <ModalContent
          index={2}
          onCloseButtonPressed={closeModal}
          onOpenAnotherModal={() => {
            setIsModal3Open(true);
          }}
        />
      </Modal>
      <Modal
        visible={isModal3Open}
        onClose={() => {
          console.log('Modal 3 closed');
          setIsModal3Open(false);
        }}>
        <ModalContent index={3} onCloseButtonPressed={closeModal} onOpenAnotherModal={() => {}} />
      </Modal>
    </View>
  );
}

function ModalContent({
  onCloseButtonPressed,
  onOpenAnotherModal,
  index,
}: {
  onCloseButtonPressed: (index: number) => void;
  onOpenAnotherModal: () => void;
  index: number;
}) {
  const pathname = usePathname();
  const segments = useSegments();

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <Text>Hi from modal {index}</Text>
      <Text>{pathname}</Text>
      <Text>{segments}</Text>
      <Button title="Open another modal" onPress={onOpenAnotherModal} />
      <Button title="Close me" onPress={() => onCloseButtonPressed(index)} />
      <Button title="Close 1" onPress={() => onCloseButtonPressed(1)} />
      <Button title="Close 2" onPress={() => onCloseButtonPressed(2)} />
      <Button title="Close 3" onPress={() => onCloseButtonPressed(3)} />
    </View>
  );
}
