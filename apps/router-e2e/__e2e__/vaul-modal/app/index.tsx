import { router } from 'expo-router';
import { Pressable, Text, View } from 'react-native';

export default function Page() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Pressable
        testID="open-modal"
        onPress={() => router.push('/modal')}
        style={{ backgroundColor: '#007AFF', padding: 16, borderRadius: 8, marginBottom: 12 }}>
        <Text style={{ color: 'white', fontSize: 16 }}>Open Modal (Half)</Text>
      </Pressable>

      <Pressable
        testID="open-modal-multi"
        onPress={() => router.push('/modal-multi')}
        style={{ backgroundColor: '#FF9500', padding: 16, borderRadius: 8, marginBottom: 12 }}>
        <Text style={{ color: 'white', fontSize: 16 }}>Open Modal (Multi-Detent)</Text>
      </Pressable>

      <Pressable
        testID="open-modal-full"
        onPress={() => router.push('/modal-full')}
        style={{ backgroundColor: '#34C759', padding: 16, borderRadius: 8 }}>
        <Text style={{ color: 'white', fontSize: 16 }}>Open Modal (Full Screen)</Text>
      </Pressable>
    </View>
  );
}
