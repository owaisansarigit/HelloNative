import { Text, View } from 'react-native';
import tw from 'twrnc';

export default function Contact() {
    return (
        <View style={tw`flex-1 justify-center items-center bg-white`}>
            <Text style={tw`text-xl text-black`}>🛠️ contact us</Text>
        </View>
    );
}
