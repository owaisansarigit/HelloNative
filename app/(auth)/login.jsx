import { Link } from 'expo-router';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import tw from 'twrnc';

export default function LoginScreen() {
  return (
    <View style={tw`flex-1 justify-center px-8 bg-white`}>
      <Text style={tw`text-3xl font-bold text-center mb-6`}>Login</Text>

      <TextInput placeholder="Email" style={tw`border p-3 rounded mb-4`} />
      <TextInput placeholder="Password" secureTextEntry style={tw`border p-3 rounded mb-6`} />

      <TouchableOpacity style={tw`bg-blue-500 py-3 rounded`}>
        <Text style={tw`text-white text-center font-semibold`}>Login</Text>
      </TouchableOpacity>

      <Link href="/(auth)/signup" style={tw`mt-4 text-blue-500 text-center`}>
        Don't have an account? Sign up
      </Link>
    </View>
  );
}
