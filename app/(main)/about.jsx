// about.js
import { ScrollView, Image } from 'react-native';
import { Text } from 'react-native-paper';
import tw from 'twrnc';

export default function About() {
  return (
    <ScrollView style={tw`flex-1 bg-white px-4 pt-6`}>
      <Image
        source={{ uri: 'https://images.unsplash.com/photo-1629904853893-c2c8981a1dc5?auto=format&fit=crop&w=800&q=80' }}
        style={tw`w-full h-44 rounded-xl mb-5`}
        resizeMode="cover"
      />
      <Text variant="titleLarge" style={tw`text-[#1e40af] mb-4`}>
        About MyCompany
      </Text>
      <Text style={tw`text-gray-700 text-base leading-6 mb-3`}>
        We are a creative digital agency helping startups and businesses turn ideas into reality.
        With expert developers, designers, and marketers, we deliver end-to-end solutions.
      </Text>
      <Text style={tw`text-gray-700 text-base leading-6 mb-10`}>
        From MVPs to enterprise platforms, we provide the strategy, execution, and support you need.
        Join 100+ brands who trust us to elevate their digital presence.
      </Text>
    </ScrollView>
  );
}
