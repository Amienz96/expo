import { Text, View } from 'react-native';

export default function Page() {
  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 16 }}>
        Fit To Contents Sheet
      </Text>
      <Text>This sheet height fits its contents using the custom fitToContents detent.</Text>
    </View>
  );
}
