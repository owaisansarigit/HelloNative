import { Redirect } from 'expo-router';
import { ActivityIndicator, View } from 'react-native';
import { Provider as PaperProvider, Text } from 'react-native-paper';
import tw from 'twrnc';
import { useAuth } from './utils/authContext';

export default function Index() {
  const { token } = useAuth();
  console.log('Index component rendered, token:', token);
  if (token === undefined) {
    return (
      <PaperProvider>
        <View style={tw`flex-1 justify-center items-center bg-white`}>
          <ActivityIndicator animating size="large" color="#4f46e5" />
          <Text style={tw`mt-4 text-lg text-gray-600`}>
            Checking authentication...
          </Text>
        </View>
      </PaperProvider>
    );
  }

  return (
    <PaperProvider>
      {/* {token ? <Redirect href="/(main)/home" /> : <Redirect href="/(auth)/login" />} */}
      <Redirect href="/(main)/home" />
      <Redirect href="/(auth)/login" />
    </PaperProvider>
  );
}
