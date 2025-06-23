// contact.js
import { ScrollView, View, Image } from 'react-native';
import { Text } from 'react-native-paper';
import tw from 'twrnc';

export default function Contact() {
  return (
    <ScrollView style={tw`flex-1 bg-white p-5`}>
      <Text variant="titleLarge" style={tw`text-[#1e40af] mb-4`}>
        Contact Us
      </Text>

      <View style={tw`mb-4`}>
        <Text style={tw`text-sm text-gray-600`}>Phone</Text>
        <Text style={tw`text-lg text-black font-medium`}>+91 98765 43210</Text>
      </View>

      <View style={tw`mb-4`}>
        <Text style={tw`text-sm text-gray-600`}>Email</Text>
        <Text style={tw`text-lg text-black font-medium`}>hello@mycompany.com</Text>
      </View>

      <View style={tw`mb-6`}>
        <Text style={tw`text-sm text-gray-600`}>Address</Text>
        <Text style={tw`text-base text-black font-medium`}>
          123 Business Park, Mumbai, India
        </Text>
      </View>

      <Text style={tw`text-sm text-gray-600 mb-2`}>Location</Text>
      <Image
        source={{
          uri: 'https://images.unsplash.com/photo-1528909514045-2fa4ac7a08ba?auto=format&fit=crop&w=800&q=80',
        }}
        style={tw`w-full h-40 rounded-lg`}
        resizeMode="cover"
      />
    </ScrollView>
  );
}
