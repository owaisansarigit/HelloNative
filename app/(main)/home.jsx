import { Text, View } from "react-native";
import tw from "twrnc";

export default function HomeScreen() {
  return (
    <View style={tw`flex-1 justify-center items-center bg-white`}>
      <Text style={tw`text-3xl font-bold text-blue-700`}>🏠 Home Screen</Text>
      <Text style={tw`text-lg text-gray-600 mt-2`}>
        Welcome to the Home Screen! This is where you can find the latest
        updates and features.
      </Text>
      <Text style={tw`text-sm text-gray-500 mt-4`}>
        Explore the app and enjoy your experience!
      </Text>
    </View>
  );
}