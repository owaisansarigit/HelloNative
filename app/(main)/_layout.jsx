import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { Text, useWindowDimensions, View } from 'react-native';
import { SceneMap, TabView } from 'react-native-tab-view';
import tw from 'twrnc';
import About from './about';
import Home from './home';
import Services from './services';

const renderScene = SceneMap({
  home: Home,
  services: Services,
  about: About,
});

export default function App() {
  const layout = useWindowDimensions();
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'home', title: 'Home', icon: 'home-outline' },
    { key: 'services', title: 'Services', icon: 'construct-outline' },
    { key: 'about', title: 'About', icon: 'information-circle-outline' },
  ]);

  const renderTabBar = () => (
    <View style={tw`flex-row justify-around bg-white border-t border-gray-300 py-2 h-16 absolute bottom-0 w-full`}>
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
            {focused && <View style={tw`w-7 h-0.5 bg-[#25D366] rounded-full mt-1`} />}
          </View>
        );
      })}
    </View>
  );

  return (
    <View style={tw`flex-1`}>
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: layout.width }}
        renderTabBar={() => null}
      />
      {renderTabBar()}
    </View>
  );
}
