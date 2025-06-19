import { router } from 'expo-router';
import { Pressable, Text, View } from 'react-native';

export default function Page() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Pressable
        testID="open-modal"
        onPress={() => router.push('/modal')}
        style={{ backgroundColor: '#007AFF', padding: 16, borderRadius: 8, marginBottom: 12 }}>
        <Text style={{ color: 'white', fontSize: 16 }}>Open sheet (Half, Full)</Text>
      </Pressable>

      <Pressable
        testID="open-modal-multi"
        onPress={() => router.push('/modal-multi')}
        style={{ backgroundColor: '#FF9500', padding: 16, borderRadius: 8, marginBottom: 12 }}>
        <Text style={{ color: 'white', fontSize: 16 }}>Open sheet (Multi-Detent)</Text>
      </Pressable>

      <Pressable
        testID="open-modal-full"
        onPress={() => router.push('/modal-full')}
        style={{ backgroundColor: '#34C759', padding: 16, borderRadius: 8, marginBottom: 12 }}>
        <Text style={{ color: 'white', fontSize: 16 }}>Open Modal (Full Screen)</Text>
      </Pressable>

      <Pressable
        testID="open-modal-small"
        onPress={() => router.push('/modal-small')}
        style={{ backgroundColor: '#5856D6', padding: 16, borderRadius: 8, marginBottom: 12 }}>
        <Text style={{ color: 'white', fontSize: 16 }}>Open Modal (Small Centered)</Text>
      </Pressable>

      <Pressable
        testID="open-modal-margin"
        onPress={() => router.push('/modal-margin')}
        style={{ backgroundColor: '#FF2D55', padding: 16, borderRadius: 8, marginBottom: 12 }}>
        <Text style={{ color: 'white', fontSize: 16 }}>Open Modal (With Margin)</Text>
      </Pressable>

      <Pressable
        testID="open-sheet-fit"
        onPress={() => router.push('/sheet-fit')}
        style={{ backgroundColor: '#FFCC00', padding: 16, borderRadius: 8, marginBottom: 12 }}>
        <Text style={{ color: 'white', fontSize: 16 }}>Open Sheet (Fit To Contents)</Text>
      </Pressable>

      <Pressable
        testID="open-sheet-radius"
        onPress={() => router.push('/sheet-radius')}
        style={{ backgroundColor: '#5AC8FA', padding: 16, borderRadius: 8 }}>
        <Text style={{ color: 'white', fontSize: 16 }}>Open Sheet (Large Radius)</Text>
      </Pressable>
    </View>
  );
}
