// home.js
import { View, Image } from 'react-native';
import { Text, Button } from 'react-native-paper';
import tw from 'twrnc';

export default function Home() {
  return (
    <View style={tw`flex-1 bg-white px-4 pt-8 items-center`}>
      <Image
        source={{ uri: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&q=80' }}
        style={tw`w-full h-48 rounded-xl mb-6`}
        resizeMode="cover"
      />
      <Text variant="headlineMedium" style={tw`text-[#1e40af] font-light mb-6`}>
        Welcome to MyCompany
      </Text>
      <Text style={tw`text-center text-gray-600 mb-6`}>
        We design and build digital experiences that delight users and drive results.
      </Text>
      <Button mode="contained" style={tw`bg-[#25D366] px-4`} onPress={() => {}}>
        View Our Services
      </Button>
    </View>
  );
}
