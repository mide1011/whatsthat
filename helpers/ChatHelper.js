//import { Bubble, Composer, Send, InputToolbar } from 'react-native-gifted-chat';
import React, { Component } from 'react';
import { View } from 'react-native-web';
import { MaterialCommunityIcons, Fontisto } from '@expo/vector-icons'
import colors from '../assets/colors/colors';
// const renderBubble = (props) => {
//     return (<Bubble
//         {...props}

//         wrapperStyle={{
//             right:
//                 { backgroundColor: '#075e54' },
//             left:
//                 { backgroundColor: '#555555' }

//         }}

//         textStyle={{
//             right: {
//                 color: '#fff'
//             },
//             left: {
//                 color: '#fff'
//             }
//         }}


//     />);


// }

const sendButton = () => {

    return (

        <View>
            <MaterialCommunityIcons name='send-circle' size={33} style={{ marginBottom: 5, marginRight: 5 }} color={'#075e54'} />

        </View>

    );
}

// const scrollToBottomComponent = () => {
//     return (
//         <Fontisto name={'angle-dobule-down'} size={22} color='#333' />

//     );

// }

// const renderInputToolbar = (props) => {
//     return (
//         <InputToolbar
//             {...props}
//             containerStyle={{ backgroundColor: colors.tabBarTheme }}
//         />
//     );
// }

const isMyMessage = (id, myId) => {
    return (id === myId);


}




const ChatHelper = {
    // renderBubble,
    // renderSend,
    // scrollToBottomComponent,
    // renderInputToolbar,
    isMyMessage,
}

export default ChatHelper;