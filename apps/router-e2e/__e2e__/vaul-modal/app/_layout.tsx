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
          sheetAllowedDetents: [0.25, 0.5, 0.75, 0.98],
          sheetGrabberVisible: true,
          sheetCornerRadius: 24,
          contentStyle: {
            width: '90%',
            margin: 0,
          },
        }}
      />
      <Stack.Screen
        name="modal-full"
        options={{
          presentation: 'modal',
          sheetCornerRadius: 0,
          sheetAllowedDetents: 'fitToContents',
          contentStyle: {
            minHeight: 0,
          },
        }}
      />
      <Stack.Screen
        name="modal-small"
        options={{
          presentation: 'modal',
          sheetCornerRadius: 12,
        }}
      />

      <Stack.Screen
        name="sheet-fit"
        options={{
          presentation: 'formSheet',
          sheetAllowedDetents: 'fitToContents',
          sheetGrabberVisible: true,
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
      <Stack.Screen
        name="modal-width-example"
        options={{
          presentation: 'modal',
          modalWidth: 500,
          sheetCornerRadius: 16,
        }}
      />
      <Stack.Screen
        name="modal-width-percentage"
        options={{
          presentation: 'modal',
          modalWidth: '60%',
          sheetCornerRadius: 16,
        }}
      />
    </Stack>
  );
}
