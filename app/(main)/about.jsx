import { Text, View } from 'react-native';
import tw from 'twrnc';

export default function AboutScreen() {
  return (
    <View style={tw`flex-1 justify-center items-center bg-white`}>
      <Text style={tw`text-3xl font-bold text-purple-600`}>ℹ️ About Us</Text>
    </View>
  );
}
