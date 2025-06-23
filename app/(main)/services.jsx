// services.js
import { ScrollView, ImageBackground } from 'react-native';
import { Card, Text } from 'react-native-paper';
import tw from 'twrnc';

const services = [
  {
    title: 'Web App Development',
    desc: 'Custom websites and platforms that scale with your business.',
    image: 'https://images.unsplash.com/photo-1629904853893-c2c8981a1dc5?auto=format&fit=crop&w=800&q=80',
  },
  {
    title: 'Mobile App Development',
    desc: 'Cross-platform mobile apps with seamless UX and performance.',
    image: 'https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&w=800&q=80',
  },
  {
    title: 'Digital Marketing',
    desc: 'SEO, social media, and paid ads to grow your reach and revenue.',
    image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&q=80',
  },
];

export default function Services() {
  return (
    <ScrollView style={tw`flex-1 bg-white p-4`}>
      <Text variant="titleLarge" style={tw`text-[#1e40af] mb-4`}>
        Our Services
      </Text>
      {services.map((s, idx) => (
        <Card key={idx} style={tw`mb-5 shadow-md`} mode="elevated">
          <ImageBackground
            source={{ uri: s.image }}
            style={tw`h-44 rounded-t-xl overflow-hidden`}
            imageStyle={{ borderTopLeftRadius: 12, borderTopRightRadius: 12 }}
          />
          <Card.Content>
            <Text variant="titleMedium" style={tw`mt-2 mb-1 text-black`}>
              {s.title}
            </Text>
            <Text style={tw`text-gray-700 text-sm`}>{s.desc}</Text>
          </Card.Content>
        </Card>
      ))}
    </ScrollView>
  );
}
