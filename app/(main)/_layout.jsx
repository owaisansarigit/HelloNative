import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Text, useWindowDimensions, View } from 'react-native';
import { SceneMap, TabView } from 'react-native-tab-view';
import tw from 'twrnc';
import { useAuth } from '../utils/authContext';
import About from './about';
import Contact from './contact';
import Flight from './flight';
import Home from './home';
import Services from './services';


const TabBar = ({ routes, index, setIndex }) => (
  <View style={tw`flex-row justify-around bg-white border-t border-gray-300 py-2 px-3 h-16`}>
    {routes.map((route, i) => {
      const focused = index === i;
      return (
        <View key={route.key} style={tw`items-center justify-center`}>
          <Ionicons
            name={route.icon}
            size={24}
            color={focused ? '#25D366' : '#888'}
            onPress={() => setIndex(i)}
          />
          <Text
            onPress={() => setIndex(i)}
            style={tw`${focused ? 'text-[#25D366]' : 'text-gray-500'} text-xs font-semibold mt-1`}
          >
            {route.title}
          </Text>
          <View style={[tw`w-15 h-0.5 bg-[#25D366] rounded-full mt-1`, { opacity: focused ? 1 : 0 }]} />
        </View>
      );
    })}
  </View>
);

const renderScene = SceneMap({
  home: Home,
  services: Services,
  about: About,
  contact: Contact,
  flight: Flight,
});

export default function App() {
  const layout = useWindowDimensions();
  const { token, logout } = useAuth();
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'home', title: 'Home', icon: 'home-outline' },
    { key: 'flight', title: 'Flight', icon: 'airplane-outline' },
    { key: 'services', title: 'Services', icon: 'construct-outline' },
    { key: 'about', title: 'About', icon: 'information-circle-outline' },
    { key: 'contact', title: 'Contact Us', icon: 'call-outline' },
  ]);

  useEffect(() => {
    // if (!token) router.replace('/(auth)/login');
  }, [token]);

  if (token === undefined) {
    return (
      <View style={tw`flex-1 justify-center items-center bg-white`}>
        <ActivityIndicator size="large" color="#25D366" />
        <Text style={tw`mt-4 text-gray-600`}>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={tw`flex-1 bg-white pt-15`}>
      {/* Header */}
      <View style={tw`px-4 py-3 border-b border-gray-200 flex-row justify-between items-center`}>
        <Text style={tw`text-lg font-bold text-[#25D366]`}>MyCompany</Text>
        <Text
          onPress={token ? logout : () => router.replace('/(auth)/login')}
          style={tw`text-${token ? 'red' : 'blue'}-500 font-semibold`}
        >
          {token ? 'Logout' : 'Login'}
        </Text>
      </View>

      {/* Tab View */}
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: layout.width }}
        renderTabBar={() => null}
      />

      {/* Bottom Tab Bar */}
      <TabBar routes={routes} index={index} setIndex={setIndex} />
    </View>
  );
}
