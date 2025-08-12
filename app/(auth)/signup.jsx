import { Link } from 'expo-router';
import { useState } from 'react';
import { Alert, Platform, Text, TextInput, TouchableOpacity, View } from 'react-native';
import tw from 'twrnc';

export default function SignupScreen() {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const apiUrl = process.env.EXPO_PUBLIC_API_URL;
  const handleChange = (key, value) => {
    setForm({ ...form, [key]: value });
  };

  const showAlert = (title) => {
    if (Platform.OS === 'web') {
      window.alert(`${title}`);
    } else {
      Alert.alert(title);
    }
  };

  const handleSignup = async () => {
    const { name, email, password } = form;
    if (!name.trim()) return showAlert('Please enter your name.');
    if (!email.trim() || !/\S+@\S+\.\S+/.test(email))
      return showAlert('Enter a valid email.');
    if (!password.trim() || password.length < 6)
      return showAlert('Password must be at least 6 characters.');
    try {
      const response = await fetch(`${apiUrl}/userroutes/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
      });
      console.log('Response:', response);
      // showAlert('Account created successfully!');

    } catch (error) {
      console.error('Error during signup:', error);
    }
  };

  return (
    <View style={tw`flex-1 justify-center px-8 bg-white`}>
      <Text style={tw`text-3xl font-bold text-center mb-6`}>Sign Up</Text>

      <TextInput
        placeholder="Name"
        value={form.name}
        onChangeText={(v) => handleChange('name', v)}
        style={tw`border p-3 rounded mb-4`}
      />
      <TextInput
        placeholder="Email"
        value={form.email}
        onChangeText={(v) => handleChange('email', v)}
        keyboardType="email-address"
        style={tw`border p-3 rounded mb-4`}
      />
      <TextInput
        placeholder="Password"
        value={form.password}
        onChangeText={(v) => handleChange('password', v)}
        secureTextEntry
        style={tw`border p-3 rounded mb-6`}
      />

      <TouchableOpacity
        style={tw`bg-green-500 py-3 rounded`}
        onPress={handleSignup}
      >
        <Text style={tw`text-white text-center font-semibold`}>
          Create Account
        </Text>
      </TouchableOpacity>

      <Link href="/(auth)/login" style={tw`mt-4 text-green-500 text-center`}>
        Already have an account? Log in
      </Link>
    </View>
  );
}
