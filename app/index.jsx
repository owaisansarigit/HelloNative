// import { Redirect } from 'expo-router';
// import { useEffect, useState } from 'react';
// import { ActivityIndicator, View } from 'react-native';
// import { Provider as PaperProvider, Text } from 'react-native-paper';
// import tw from 'twrnc';
// import { getToken } from './utils/authStorage'; // make sure path is correct

// export default function Index() {
//   const [token, setToken] = useState(undefined); // undefined = loading

//   useEffect(() => {
//     (async () => {
//       const storedToken = await getToken();
//       console.log('Stored token:', storedToken);
//       setToken(storedToken); // will be null or string
//     })();
//   }, []);

//   if (token === undefined) {
//     return (
//       <PaperProvider>
//         <View style={tw`flex-1 justify-center items-center bg-white`}>
//           <ActivityIndicator animating size="large" color="#4f46e5" />
//           <Text style={tw`mt-4 text-lg text-gray-600`}>
//             Checking authentication...
//           </Text>
//         </View>
//       </PaperProvider>
//     );
//   }

//   return (
//     <PaperProvider>
//       {token ? <Redirect href="/(main)/home" /> : <Redirect href="/(auth)/login" />}
//     </PaperProvider>
//   );
// }
import { useEffect, useState } from 'react';
import { ActivityIndicator, View, TextInput } from 'react-native';
import { Provider as PaperProvider, Text, Button } from 'react-native-paper';
import { getToken, saveToken, removeToken } from './utils/authStorage'; // adjust path
import tw from 'twrnc';

export default function Index() {
  const [token, setToken] = useState(undefined); // undefined = loading
  const [input, setInput] = useState('');

  useEffect(() => {
    (async () => {
      const storedToken = await getToken();
      console.log('Stored token:', storedToken);
      setToken(storedToken); // null or string
    })();
  }, []);

  const handleSave = async () => {
    await saveToken(input);
    setToken(input);
    setInput('');
  };

  const handleLogout = async () => {
    await removeToken();
    setToken(null);
  };

  if (token === undefined) {
    return (
      <PaperProvider>
        <View style={tw`flex-1 justify-center items-center bg-white`}>
          <ActivityIndicator animating size="large" color="#4f46e5" />
          <Text style={tw`mt-4 text-lg text-gray-600`}>
            Checking authentication...
          </Text>
        </View>
      </PaperProvider>
    );
  }

  return (
    <PaperProvider>
      <View style={tw`flex-1 justify-center items-center bg-white px-6`}>
        {token ? (
          <>
            <Text style={tw`text-xl mb-4`}>Token: {token}</Text>
            <Button mode="contained" onPress={handleLogout}>
              Logout
            </Button>
          </>
        ) : (
          <>
            <TextInput
              placeholder="Enter token"
              value={input}
              onChangeText={setInput}
              style={tw`border w-full px-4 py-2 mb-4 rounded`}
            />
            <Button mode="contained" onPress={handleSave}>
              Save Token
            </Button>
          </>
        )}
      </View>
    </PaperProvider>
  );
}
