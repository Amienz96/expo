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
        }}
      />
      <Stack.Screen
        name="modal-multi"
        options={{
          presentation: 'formSheet',
          sheetAllowedDetents: [0.25, 0.5, 0.75, 0.98],
          sheetGrabberVisible: true,
        }}
      />
      <Stack.Screen
        name="modal-full"
        options={{
          presentation: 'modal',
          sheetCornerRadius: 0,
          sheetAllowedDetents: 'fitToContents',
        }}
      />
      <Stack.Screen
        name="modal-small"
        options={{
          presentation: 'formSheet',
          sheetCornerRadius: 12,
          modalMinHeight: 0,
          sheetAllowedDetents: 'fitToContents',
        }}
      />

      <Stack.Screen
        name="sheet-fit"
        options={{
          presentation: 'formSheet',
          sheetAllowedDetents: 'fitToContents',
          sheetGrabberVisible: true,
          sheetCornerRadius: 10,
        }}
      />
      <Stack.Screen
        name="sheet-radius"
        options={{
          presentation: 'formSheet',
          sheetAllowedDetents: [0.5, 1],
          sheetCornerRadius: 32,
          sheetGrabberVisible: true,
        }}
      />
    </Stack>
  );
}
