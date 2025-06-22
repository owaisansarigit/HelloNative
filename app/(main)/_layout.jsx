import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';

const tabs = [
  { name: 'home', icon: 'home' },
  { name: 'services', icon: 'construct' },
  { name: 'about', icon: 'information-circle' },
];

export default function MainLayout() {
  return (
    <Tabs
      screenOptions={({ route }) => {
        const tab = tabs.find(t => t.name === route.name);
        return {
          headerShown: false,
          tabBarActiveTintColor: '#4f46e5',
          tabBarInactiveTintColor: '#aaa',
          tabBarLabelStyle: { fontSize: 12 },
          tabBarStyle: { paddingBottom: 5, height: 60 },
          tabBarIcon: ({ color, size }) => (
            <Ionicons name={tab?.icon || 'help'} size={size} color={color} />
          ),
        };
      }}
    />
  );
}
