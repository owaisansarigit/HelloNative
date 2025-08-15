import AsyncStorage from "@react-native-async-storage/async-storage";
import { Link } from "expo-router";
import { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import tw from "twrnc";
import { useAuth } from "../utils/authContext";
import { useSnackbar } from "../utils/snackbarContext";

export default function LoginScreen() {
  const [form, setForm] = useState({ email: "", password: "" });
  const { showSnackbar } = useSnackbar();
  const { login } = useAuth();
  const [loading, setLoading] = useState(false); // loading state
  const apiUrl = process.env.EXPO_PUBLIC_API_URL;

  const handleChange = (name, value) => {
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const showAlert = (title) => {
    if (Platform.OS === "web") {
      window.alert(`${title}`);
    } else {
      Alert.alert(title);
    }
  };

  const handleLogin = async () => {
    const { email, password } = form;
    if (!email.trim() || !/\S+@\S+\.\S+/.test(email))
      return showAlert("Enter a valid email.");
    if (!password.trim() || password.length < 6)
      return showAlert("Password must be at least 6 characters.");

    setLoading(true); // start loading

    try {
      const response = await fetch(`${apiUrl}/userroutes/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setLoading(false);
        return showAlert(data.message || "Login failed. Please try again.");
      }

      const token = data?.data?.token;
      const user = data?.data?.user;

      if (token && user) {
        await AsyncStorage.setItem("token", token);
        await AsyncStorage.setItem("user", JSON.stringify(user));
        login(token, user);
        console.log("Login successful:");
        showSnackbar("Login successful!");
      } else {
        showAlert("Invalid server response.");
      }
      await console.log(AsyncStorage.getItem("token"));
    } catch (error) {
      console.error("Error during login:", error);
      showAlert("An error occurred. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={tw`flex-1 justify-center px-8 bg-white`}>
      <Text style={tw`text-3xl font-bold text-center mb-6`}>Login</Text>

      <TextInput
        name="email"
        value={form.email}
        onChangeText={(v) => handleChange("email", v)}
        placeholder="Email"
        style={tw`border p-3 rounded mb-4`}
        keyboardType="email-address"
      />
      <TextInput
        name="password"
        value={form.password}
        onChangeText={(v) => handleChange("password", v)}
        placeholder="Password"
        secureTextEntry
        style={tw`border p-3 rounded mb-6`}
      />

      <TouchableOpacity
        style={[tw`bg-blue-500 py-3 rounded`, loading && tw`opacity-50`]}
        onPressOut={handleLogin}
        disabled={loading}
      >
        <Text style={tw`text-white text-center font-semibold`}>
          {loading ? "Logging in..." : "Login"}
        </Text>
      </TouchableOpacity>

      <Link href="/(auth)/signup" style={tw`mt-4 text-blue-500 text-center`}>
        Don't have an account? Sign up
      </Link>

      {/* Transparent background loading overlay */}
      {loading && (
        <View
          style={tw`absolute top-0 left-0 w-full h-full bg-black bg-opacity-30 justify-center items-center`}
        >
          <ActivityIndicator size="large" color="#801111ff" />
        </View>
      )}
    </View>
  );
}
