import { Text, View } from 'react-native';

export default function Page() {
  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Text
        testID="modal-title-full"
        style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 16 }}>
        Full Screen Modal
      </Text>
      <Text>This modal should occupy the full screen (no detents).</Text>{' '}
      <Text>This modal should occupy the full screen (no detents).</Text>{' '}
      <Text>This modal should occupy the full screen (no detents).</Text>{' '}
      <Text>This modal should occupy the full screen (no detents).</Text>{' '}
      <Text>This modal should occupy the full screen (no detents).</Text>{' '}
      <Text>This modal should occupy the full screen (no detents).</Text>{' '}
      <Text>This modal should occupy the full screen (no detents).</Text>{' '}
      <Text>This modal should occupy the full screen (no detents).</Text>{' '}
      <Text>This modal should occupy the full screen (no detents).</Text>{' '}
      <Text>This modal should occupy the full screen (no detents).</Text>
    </View>
  );
}
