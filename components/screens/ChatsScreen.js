import React, { Component } from 'react';
import { Text, TextInput, View, ImageBackground, SafeAreaView, ScrollView, StyleSheet, ActivityIndicator, FlatList } from 'react-native';
import { TouchableOpacity } from 'react-native-web';
import colors from '../../assets/colors/colors';
import GeneralStyles from '../../styles/GeneralStyles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FontAwesome, Ionicons } from '@expo/vector-icons'
import Modal from "react-native-modal";
import InputValidator from '../../helpers/InputValidator';
import Moment from 'moment';
import ChatHelper from '../../helpers/ChatHelper';
import ChatBG from '../../assets/images/chatBG.png'
//import  Colors  from 'react-native/Libraries/NewAppScreen';

class ChatsScreen extends Component {

    constructor(props) {
        super(props);

        this.state = {
            chatMessages: [],
            messages: [],
            messagesForServer: [],
            message: '',
            chatName: '',
            chatOwnerID: '',
            chatID: '',
            isLoading: true,
            currentUserID: '',





        };

        this.onSend = this.onSend.bind(this);

    }


    styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: colors.mainAppScreens,
            alignItems: 'center',
            justifyContent: 'space-between',
            flexDirection: 'column',


        },

        backButton: {

            flexDirection: "row",
            alignItems: "center",
            right: 140,

        },


        chatsWrapper: {
            marginLeft: 25,
            fontWeight: 'bold',
        },

        chatExtraInfoWrapper: {
            width: '60%',
            flexDirection: 'row',
            justifyContent: 'space-around'
        },

        lastChatText: {
            marginLeft: 45,
            fontWeight: 'bold',
            marginTop: 4,

            color: '#555555'

        },

        lastMessageDateText: {
            marginLeft: 65,
            fontWeight: 'normal',
            marginTop: 4,
            color: '#000000'
        },

        headerBar: {

            height: 50,
            width: '100%',
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: colors.mainTheme,
        },

        headerIconsBar: {

            height: 50,
            width: '100%',
            backgroundColor: '#d4d4d4',
            opacity: '80%',
        },

        toggleIcons: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'flex-end',
            justifyContent: "space-between",
            alignItems: 'center',
            flexDirection: 'row',



        },


        chatBoxContainer: {
            padding: 10,

        },

        chatBox: {
            borderRadius: 5,
            padding: 10,

        },

        name: {
            color: '#3cb371',
            fontWeight: 'bold',
            marginBottom: 5,
        },

        message: {
            //marginVertical: 5,
        },

        time: {
            alignSelf: 'flex-end',
            color: 'grey',
            opacity: '60%',
        },

        backgroundStyle: {
            width: '100%',
            height: '100%',

        }


    });




    async loadSingleChat() {
        const sessionToken = await AsyncStorage.getItem("sessionToken");
        // eslint-disable-next-line react/prop-types
        const { navigation } = this.props;
        // eslint-disable-next-line react/prop-types
        const { chatID } = this.props.route.params;
        const userID = await AsyncStorage.getItem("userID");

        return fetch(`http://localhost:3333/api/1.0.0/chat/${chatID}`, {

            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'X-Authorization': sessionToken,
            },

        })
            .then((response) => {
                if (response.status === 200) {
                    return response.json()
                }

                else if (response.status === 401) {
                    this.setState({ errorText: 'Log In and Try Again' })
                }

                else if (response.status === 500) {
                    this.setState({ errorText: 'Try Again, Make sure you are Signed in' })
                }

            })

            .then(async (messages) => {
                console.log(messages)



                const data = messages
                this.setState({ chatMessages: data })
                this.setState({ currentUserID: userID })
                this.setState({ chatName: data.name })
                this.setState({ chatOwnerID: data.creator.user_id })
                this.setState({ chatID: chatID })
                // this.setState((prevState) => ({
                //     data: {
                //         ...prevState.data,
                //         [chatID]: [],
                //     },
                // }));

            })




            .catch((error) => {
                console.log(error)

            })


    }


    // updateChatInfo = async (item) => {
    //     const sessionToken = await AsyncStorage.getItem("sessionToken");
    //     // eslint-disable-next-line react/prop-types
    //     const { id } = this.props.route.params;

    //     let to_send = {};

    //     if (this.state.firstName != this.state.origFirstName && InputValidator.validName(this.state.firstName)) {
    //         to_send['first_name'] = this.state.firstName;
    //     }

    //     if (this.state.lastName != this.state.origLastName && InputValidator.validName(this.state.lastName)) {
    //         to_send['last_name'] = this.state.lastName;
    //     }
    //     if (this.state.email != this.state.origEmail && InputValidator.isValidEmail(this.state.email)) {
    //         to_send['email'] = this.state.email;
    //     }
    //     if (this.state.password != this.state.origPassword && InputValidator.isValidPassword(this.state.password)) {
    //         to_send['password'] = this.state.password;
    //     }

    //     return fetch(`http://localhost:3333/api/1.0.0/chat/${id}`, {

    //         method: 'PATCH',
    //         headers: {
    //             'Content-Type': 'application/json',
    //             'X-Authorization': sessionToken,
    //         },

    //         body: JSON.stringify(to_send)

    //     })
    //         .then((response) => {
    //             if (response.status === 200) {
    //                 this.loadUserInfo()
    //                 this.setState({ errorText: 'Successfully Updated Your Details' })
    //             }

    //             else if (response.status === 400) {
    //                 this.setState({ errorText: 'Try Again' })
    //             }

    //             else if (response.status === 401) {
    //                 this.setState({ errorText: 'Try Again, make sure you are signed in' })
    //             }

    //         })

    //         .catch((error) => {
    //             console.log(error)

    //         })


    // }

    // sendMessage = async (chatID) => {

    //     const sessionToken = await AsyncStorage.getItem("sessionToken");
    //     // eslint-disable-next-line react/prop-types
    //     const { navigation } = this.props;
    //     const message = this.state.message;

    //     return fetch(`http://localhost:3333/api/1.0.0/chat/${chatID}/message`, {

    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json',
    //             'X-Authorization': sessionToken,
    //         },

    //         body: JSON.stringify({ message })

    //     })
    //         .then((response) => {
    //             if (response.status == 200) {
    //                 this.loadSingleChat();
    //             }
    //             else if (response.status == 400) {
    //                 this.setState({ errorText: "Something went wrong, Try Again" })
    //             }

    //             else if (response.status == 401) {
    //                 this.setState({ errorText: "You can't make this request" })
    //             }

    //             else if (response.status == 403) {
    //                 this.setState({ errorText: "You can't send this message, Try Again" })
    //             }

    //             else if (response.status == 404) {
    //                 this.setState({ errorText: "Not Found" })
    //             }

    //             else if (response.status == 500) {
    //                 this.setState({ errorText: "Try Again" })
    //             }

    //         })

    //         .catch((error) => {
    //             console.log(error)
    //         })


    // }








    componentDidMount() {
        // eslint-disable-next-line react/prop-types
        this.unsubscribe = this.props.navigation.addListener('focus', () => {
            this.loadSingleChat();

        });


        this.setState({
            messages: [
                {
                    _id: 1,
                    text: 'Hello developer',
                    createdAt: new Date(),
                    user: {
                        _id: 2,
                        name: 'React Native',
                        avatar: 'https://placeimg.com/140/140/any',
                    },
                },
            ],
        });
    }

    componentWillUnmount() {
        this.unsubscribe();
    }


    onSend(messages = []) {




        // this.setState(previousState => ({
        //     messages: GiftedChat.append(previousState.messages, messages),
        // }));



    }

    chatRoomItemComponent = ({ item }) => {
        // eslint-disable-next-line react/prop-types
        const navigation = this.props.navigation;
        Moment.locale('en');
        const userID = String(item.author.user_id);
        const currentUser = this.state.currentUserID;

        return (
            <View style={this.styles.chatBoxContainer}>

                <View style={[this.styles.chatBox,
                {
                    backgroundColor: ChatHelper.isMyMessage(userID, currentUser) ? colors.chatsBackgroundColor : '#d4d4d4',
                    marginLeft: ChatHelper.isMyMessage(userID, currentUser) ? 45 : 0,
                    marginRight: ChatHelper.isMyMessage(userID, currentUser) ? 0 : 45,

                }
                ]}>

                    {!ChatHelper.isMyMessage(userID, currentUser) && <Text style={this.styles.name}>
                        {item.author.first_name}
                    </Text>}

                    <Text style={this.styles.message}>
                        {item.message}
                    </Text>

                    <Text style={this.styles.time}>
                        {(Moment(item.timestamp).fromNow())}
                    </Text>

                </View>

            </View>




        );

    }






    render() {

        // const { modalVisible } = this.state;
        // eslint-disable-next-line react/prop-types
        const navigation = this.props.navigation;



        return (



            <>


                <View style={this.styles.headerBar} >

                    <TouchableOpacity
                        // eslint-disable-next-line react/prop-types
                        onPress={() => { navigation.navigate('Messages') }} >
                        <Ionicons name="chevron-back" size={33} />

                    </TouchableOpacity>

                    <View>
                        <Text style={GeneralStyles.chatHeaderText}>
                            {this.state.chatName}
                        </Text>
                    </View>



                </View>


                <View style={this.styles.headerIconsBar}>
                    <View style={this.styles.toggleIcons}>

                        <View style={{ margin: 20 }}>
                            <TouchableOpacity>
                                <FontAwesome name="pencil-square-o" size={25} color="FC0000" />
                            </TouchableOpacity>

                        </View>

                        <View style={{ margin: 20 }}>
                            <TouchableOpacity>
                                <Ionicons name="md-person-add" size={25} color="#36942B" />
                            </TouchableOpacity>

                        </View>



                    </View>

                </View>





                <FlatList

                    data={this.state.chatMessages.messages}
                    renderItem={this.chatRoomItemComponent}
                    inverted

                />















            </>





        );









    }
};

export default ChatsScreen;
