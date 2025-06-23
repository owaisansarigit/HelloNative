import { Stack } from 'expo-router';
import { AuthProvider } from './utils/authContext';
import { SnackbarProvider } from './utils/snackbarContext';


export default function RootLayout() {
  return (
    <SnackbarProvider>
      <AuthProvider>
        <Stack
          screenOptions={{ headerShown: false }}
        />
      </AuthProvider>
    </SnackbarProvider>

  );
}
