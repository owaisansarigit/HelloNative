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
// import { useState } from 'react';
// import { Text, View, useWindowDimensions } from 'react-native';
// import { SceneMap, TabBar, TabView } from 'react-native-tab-view';
// import tw from 'twrnc';

// const ChatsRoute = () => (
//   <View style={tw`flex-1 justify-center items-center bg-white`}>
//     <Text style={tw`text-xl`}>Chats Screen</Text>
//   </View>
// );

// const StatusRoute = () => (
//   <View style={tw`flex-1 justify-center items-center bg-white`}>
//     <Text style={tw`text-xl`}>Status Screen</Text>
//   </View>
// );

// const CallsRoute = () => (
//   <View style={tw`flex-1 justify-center items-center bg-white`}>
//     <Text style={tw`text-xl`}>Calls Screen</Text>
//   </View>
// );

// const renderScene = SceneMap({
//   chats: ChatsRoute,
//   status: StatusRoute,
//   calls: CallsRoute,
// });

// export default function WhatsAppTabs() {
//   const layout = useWindowDimensions();
//   const [index, setIndex] = useState(0);
//   const [routes] = useState([
//     { key: 'chats', title: 'CHATS' },
//     { key: 'status', title: 'STATUS' },
//     { key: 'calls', title: 'CALLS' },
//   ]);

//   return (
//     <TabView
//       navigationState={{ index, routes }}
//       renderScene={renderScene}
//       onIndexChange={setIndex}
//       initialLayout={{ width: layout.width }}
//       renderTabBar={props => (
//         <TabBar
//           {...props}
//           indicatorStyle={{ backgroundColor: '#25D366', height: 3 }}
//           style={{ backgroundColor: '#fff' }}
//           renderLabel={({ route, focused, color }) => (
//             <Text
//               style={{
//                 color: focused ? '#25D366' : '#666',
//                 fontWeight: 'bold',
//                 fontSize: 14,
//               }}
//             >
//               {route.title}
//             </Text>
//           )}
//         />
//       )}
//     />
//   );
// }

