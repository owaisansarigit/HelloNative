import { Link } from 'expo-router';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import tw from 'twrnc';

export default function SignupScreen() {
  return (
    <View style={tw`flex-1 justify-center px-8 bg-white`}>
      <Text style={tw`text-3xl font-bold text-center mb-6`}>Sign Up</Text>

      <TextInput placeholder="Name" style={tw`border p-3 rounded mb-4`} />
      <TextInput placeholder="Email" style={tw`border p-3 rounded mb-4`} />
      <TextInput placeholder="Password" secureTextEntry style={tw`border p-3 rounded mb-6`} />

      <TouchableOpacity style={tw`bg-green-500 py-3 rounded`}>
        <Text style={tw`text-white text-center font-semibold`}>Create Account</Text>
      </TouchableOpacity>

      <Link href="/(auth)/login" style={tw`mt-4 text-green-500 text-center`}>
        Already have an account? Log in
      </Link>
    </View>
  );
}
