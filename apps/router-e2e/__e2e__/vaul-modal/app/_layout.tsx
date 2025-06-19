import { Stack } from 'expo-router';

export const unstable_settings = {
  initialRouteName: 'index',
};

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen name="index" />
      <Stack.Screen
        name="modal"
        options={{
          presentation: 'formSheet',
          sheetAllowedDetents: [0.5, 1],
          sheetGrabberVisible: true,
          sheetCornerRadius: 16,
        }}
      />
      <Stack.Screen
        name="modal-multi"
        options={{
          presentation: 'formSheet',
          sheetAllowedDetents: [0.25, 0.5, 0.75, 1],
          sheetGrabberVisible: true,
          sheetCornerRadius: 24,
        }}
      />
      <Stack.Screen
        name="modal-full"
        options={{
          presentation: 'modal',
          sheetCornerRadius: 0,
          contentStyle: {
            padding: 40,
          },
        }}
      />
    </Stack>
  );
}
