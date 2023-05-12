import React, { Component } from 'react';
import { Text, TextInput, View, ImageBackground, SafeAreaView, ScrollView, StyleSheet, ActivityIndicator, FlatList } from 'react-native';
import { TouchableOpacity } from 'react-native-web';
import colors from '../../assets/colors/colors';
import GeneralStyles from '../../styles/GeneralStyles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FontAwesome, Ionicons, EvilIcons,MaterialCommunityIcons } from '@expo/vector-icons'
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
            updateChatName: false,
            isUserAdded: false,
            viewMembers: false,
            editMessage: false,
            newChatName: '',
            newUserToAddID: '',
            messageToEditID: '',
            origMessage: '',
            newMessage: '',
            messageAuthorID: '',







        };

        // this.onSend = this.onSend.bind(this);

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
            justifyContent: 'space-between',
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
            marginRight: 10,


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

        },


        sendBoxContainer: {
            flexDirection: 'row',
            margin: 10,
            alignItems: 'flex-end',

        },

        sendBoxMainContainer: {

            flex: 1,
            flexDirection: 'row',
            backgroundColor: 'white',
            padding: 10,
            marginRight: 10,
            borderRadius: 50,
            alignItems: 'flex-end',
        },

        buttonContainer: {
            justifyContent: 'center',
            alignItems: 'center',

        },

        sendButton: {
            marginBottom: 5,
            marginRight: 5,
            opacity: '90%',

        },


        inputBox: {
            flex: 1,
            marginHorizontal: 10,

        },


        centeredView: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 22,
        },

        modalView: {
            margin: 20,
            backgroundColor: 'white',
            borderRadius: 20,
            padding: 35,
            alignItems: 'center',
            shadowColor: '#000',
            shadowOffset: {
                width: 0,
                height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 4,
            elevation: 5,
        },



        button: {
            borderRadius: 20,
            padding: 10,
            elevation: 2,
        },
        buttonOpen: {
            backgroundColor: "#34B7F1",
        },
        buttonClose: {
            backgroundColor: '#2196F3',
        },
        textStyle: {
            color: 'white',
            fontWeight: 'bold',
            textAlign: 'center',
        },
        modalText: {

            marginTop: 10,
            fontSize: 16,
            color: '#34633E',
            opacity: '90%',
            fontWeight: 'bold',
            marginBottom: 15,
            textAlign: 'center',
        },

        modalHead: {
            width: "100%",
            flexDirection: "row",
            justifyContent: "space-around",
            alignItems: "center",
        },

        modalInput: {
            borderBottomColor: '#14c83c',
            borderBottomWidth: 2,
            padding: 8,
            margin: 30,
            marginTop: 10,
            fontSize: 13,
            color: '#34633E',
            fontWeight: 'bold',
            marginBottom: 20,
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

            })




            .catch((error) => {
                console.log(error)

            })


    }


    updateChatInfo = async (chatID) => {
        const sessionToken = await AsyncStorage.getItem("sessionToken");
        const name = this.state.newChatName;

        return fetch(`http://localhost:3333/api/1.0.0/chat/${chatID}`, {

            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'X-Authorization': sessionToken,
            },

            body: JSON.stringify({ name }),

        })
            .then((response) => {
                if (response.status === 200) {
                    this.loadSingleChat()
                    this.setState({ newChatName: '' });
                    this.setState({ errorText: 'Successfully Updated Your Details' })
                }

                else if (response.status === 400) {
                    this.setState({ errorText: 'Try Again' })
                }

                else if (response.status === 401) {
                    this.setState({ errorText: 'Try Again, make sure you are signed in' })
                }

            })

            .catch((error) => {
                console.log(error)

            })


    }

    sendMessage = async (chatID) => {

        const sessionToken = await AsyncStorage.getItem("sessionToken");
        // eslint-disable-next-line react/prop-types
        const { navigation } = this.props;
        const message = this.state.message;

        return fetch(`http://localhost:3333/api/1.0.0/chat/${chatID}/message`, {

            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Authorization': sessionToken,
            },

            body: JSON.stringify({ message })

        })
            .then((response) => {
                if (response.status == 200) {
                    this.loadSingleChat();
                    this.setState({ message: '' });
                }
                else if (response.status == 400) {
                    this.setState({ errorText: "Something went wrong, Try Again" })
                }

                else if (response.status == 401) {
                    this.setState({ errorText: "You can't make this request" })
                }

                else if (response.status == 403) {
                    this.setState({ errorText: "You can't send this message, Try Again" })
                }

                else if (response.status == 404) {
                    this.setState({ errorText: "Not Found" })
                }

                else if (response.status == 500) {
                    this.setState({ errorText: "Try Again" })
                }

            })

            .catch((error) => {
                console.log(error)
            })


    }



    addUserToChat = async (chatID) => {

        const sessionToken = await AsyncStorage.getItem("sessionToken");
        // eslint-disable-next-line react/prop-types
        const { navigation } = this.props;
        const userToAddID = this.state.newUserToAddID;

        return fetch(`http://localhost:3333/api/1.0.0/chat/${chatID}/user/${userToAddID}`, {

            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Authorization': sessionToken,
            },

        })
            .then((response) => {
                if (response.status == 200) {
                    this.loadSingleChat();
                    this.setState({ newUserToAddID: '' });
                }
                else if (response.status == 400) {
                    this.setState({ errorText: "Something went wrong, Try Again" })
                }

                else if (response.status == 401) {
                    this.setState({ errorText: "You can't make this request" })
                }

                else if (response.status == 403) {
                    this.setState({ errorText: "You can't send this message, Try Again" })
                }

                else if (response.status == 404) {
                    this.setState({ errorText: "Not Found" })
                }

                else if (response.status == 500) {
                    this.setState({ errorText: "Try Again" })
                }

            })

            .catch((error) => {
                console.log(error)
            })


    }


    removeFromUserChat = async (item, chatID) => {

        const sessionToken = await AsyncStorage.getItem("sessionToken");
        const userToRemove = item.user_id;

        return fetch(`http://localhost:3333/api/1.0.0/chat/${chatID}/user/${userToRemove}`, {

            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'X-Authorization': sessionToken,
            },

        })
            .then((response) => {
                if (response.status == 200) {
                    this.loadSingleChat();
                }
                else if (response.status == 400) {
                    this.setState({ errorText: "Something went wrong, Try Again" })
                }

                else if (response.status == 401) {
                    this.setState({ errorText: "You can't make this request" })
                }

                else if (response.status == 403) {
                    this.setState({ errorText: "You can't send this message, Try Again" })
                }

                else if (response.status == 404) {
                    this.setState({ errorText: "Not Found" })
                }

                else if (response.status == 500) {
                    this.setState({ errorText: "Try Again" })
                }

            })

            .catch((error) => {
                console.log(error)
            })


    }

    deleteMessageFromChat = async (messageToDelete, chatID) => {

        const sessionToken = await AsyncStorage.getItem("sessionToken");

        return fetch(`http://localhost:3333/api/1.0.0/chat/${chatID}/message/${messageToDelete}`, {

            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'X-Authorization': sessionToken,
            },

        })
            .then((response) => {
                if (response.status == 200) {
                    this.loadSingleChat();
                }
                else if (response.status == 400) {
                    this.setState({ errorText: "Something went wrong, Try Again" })
                }

                else if (response.status == 401) {
                    this.setState({ errorText: "You can't make this request" })
                }

                else if (response.status == 403) {
                    this.setState({ errorText: "You can't send this message, Try Again" })
                }

                else if (response.status == 404) {
                    this.setState({ errorText: "Not Found" })
                }

                else if (response.status == 500) {
                    this.setState({ errorText: "Try Again" })
                }

            })

            .catch((error) => {
                console.log(error)
            })


    }



    editMessage = async (chatID,messageID) => {
        const sessionToken = await AsyncStorage.getItem("sessionToken");
        const message = this.state.newMessage;

        return fetch(`http://localhost:3333/api/1.0.0/chat/${chatID}/message/${messageID}`, {

            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'X-Authorization': sessionToken,
            },

            body: JSON.stringify({ message }),

        })
            .then((response) => {
                if (response.status === 200) {
                    this.loadSingleChat()
                    this.setState({ newMessage: '' });
                    this.setState({ errorText: 'Successfully Updated Your Details' })
                }

                else if (response.status === 400) {
                    this.setState({ errorText: 'Try Again' })
                }

                else if (response.status === 401) {
                    this.setState({ errorText: 'Try Again, make sure you are signed in' })
                }

            })

            .catch((error) => {
                console.log(error)

            })


    }








    componentDidMount() {
        // eslint-disable-next-line react/prop-types
        this.unsubscribe = this.props.navigation.addListener('focus', () => {
            this.loadSingleChat();
            this.setState({ isLoading: false })
        });



    }

    componentWillUnmount() {
        this.unsubscribe();
    }




    chatRoomItemComponent = ({ item }) => {
        // eslint-disable-next-line react/prop-types
        const navigation = this.props.navigation;
        Moment.locale('en');
        const userID = String(item.author.user_id);
        const currentUser = this.state.currentUserID;

        return (
            <View style={this.styles.chatBoxContainer}>

                <TouchableOpacity onPress={() => {
                    this.handleEditedMessage(item)
                }}>
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

                </TouchableOpacity>





            </View>







        );

    }


    membersItemComponent = ({ item }) => {
        const userID = String(item.user_id);
        const currentUser = this.state.currentUserID;


        return (
            <View style={GeneralStyles.contactsWrapper} key={item.user_id}>


                <Text style={GeneralStyles.infoText}>
                    {item.first_name + " " + item.last_name}
                </Text>

                <View style={GeneralStyles.iconSpacing}>

                    <View style={{ margin: 10 }}>

                        {!ChatHelper.isMyMessage(userID, currentUser) ? (<TouchableOpacity onPress={() => { this.removeFromUserChat(item, this.state.chatID) }}>
                            <Ionicons name="person-remove" size={30} color="FC0000" />
                        </TouchableOpacity>)

                            : (<TouchableOpacity>
                                <Ionicons name="person-outline" size={30} color="grey" />
                            </TouchableOpacity>)

                        }


                    </View>

                </View>


            </View>








        )

    }


    updateChatRoomName = () => {
        this.setState(({ updateChatName }) => ({ updateChatName: !updateChatName }));



    }


    addUserToChatRoom = () => {
        this.setState(({ isUserAdded }) => ({ isUserAdded: !isUserAdded }));



    }

    viewMembers = () => {
        this.setState(({ viewMembers }) => ({ viewMembers: !viewMembers }));

    }


    handleEditedChat = () => {

        this.setState(({ editMessage }) => ({ editMessage: !editMessage }));
    }

    handleEditedMessage = (item) => {
        this.setState({ editMessage: true })
        this.setState({ messageToEditID: item.message_id })
        this.setState({ origMessage: item.message })
        this.setState({ messageAuthorID: item.author.user_id })





    }

    handleDeleteMessage = () => {
        this.handleEditedChat();
       this.deleteMessageFromChat(this.state.messageToEditID,this.state.chatID)

    }




    render() {

        // eslint-disable-next-line react/prop-types
        const navigation = this.props.navigation;

        if (this.state.isLoading) {
            return (<View>
                <ActivityIndicator size="large" />
            </View>)

        }

        else {
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


                        <View style={this.styles.toggleIcons}>

                            <View style={GeneralStyles.iconSpacing}>
                                <TouchableOpacity onPress={() => {
                                    { this.setState({ updateChatName: true }) };
                                }}>
                                    <FontAwesome name="pencil-square-o" size={25} color="FC0000" />
                                </TouchableOpacity>

                            </View>

                            <View style={GeneralStyles.iconSpacing}>
                                <TouchableOpacity onPress={() => {
                                    { this.setState({ isUserAdded: true }) };
                                }}>
                                    <Ionicons name="md-person-add" size={25} color="#34B7F1" />
                                </TouchableOpacity>

                            </View>



                            <View style={GeneralStyles.iconSpacing}>
                                <TouchableOpacity onPress={() => {
                                    { this.setState({ viewMembers: true }) };
                                }}>
                                    <Ionicons name="ios-happy-sharp" size={25} color="orange" />
                                </TouchableOpacity>

                            </View>



                        </View>
                    </View>

                    <View style={this.styles.centeredView}>
                        <Modal transparent={true} animationType="fade" isVisible={this.state.updateChatName}
                            onRequestClose={this.updateChatRoomName}>


                            <View style={this.styles.centeredView}>
                                <View style={this.styles.modalView}>

                                    <View style={{ alignItems: 'center' }}>
                                        <View style={this.styles.modalHead}>
                                            <Text style={GeneralStyles.chatHeaderText}>Chat Name</Text>
                                            <TouchableOpacity
                                                onPress={() => this.updateChatRoomName()}>
                                                <Ionicons name="md-close-sharp" size={25} color="#CC0000" />
                                            </TouchableOpacity>
                                        </View>
                                    </View>

                                    <TextInput
                                        placeholder="Enter New Chat Name"
                                        placeholderTextColor={'grey'}
                                        value={this.state.newChatName}
                                        onChangeText={newChatName => this.setState({ newChatName })}
                                        style={this.styles.modalInput}
                                        multiline

                                    />

                                    <TouchableOpacity
                                        onPress={() => {
                                            { this.updateChatInfo(this.state.chatID) };

                                        }}>

                                        {this.state.newChatName ?

                                            (<View style={[this.styles.button, this.styles.buttonOpen]}>
                                                <Text style={this.styles.textStyle}> Update </Text>
                                            </View>) : (<> </>)}

                                    </TouchableOpacity>
                                </View>
                            </View>

                        </Modal>
                    </View>



                    <View style={this.styles.centeredView}>
                        <Modal transparent={true} animationType="fade" isVisible={this.state.isUserAdded}
                            onRequestClose={this.addUserToChatRoom}>


                            <View style={this.styles.centeredView}>
                                <View style={this.styles.modalView}>

                                    <View style={{ alignItems: 'center' }}>
                                        <View style={this.styles.modalHead}>
                                            <Text style={GeneralStyles.chatHeaderText}>Add To Chat</Text>
                                            <TouchableOpacity
                                                onPress={() => this.addUserToChatRoom()}>
                                                <Ionicons name="md-close-sharp" size={25} color="#CC0000" />
                                            </TouchableOpacity>
                                        </View>
                                    </View>

                                    <TextInput
                                        placeholder="Enter Their ID"
                                        placeholderTextColor={'grey'}
                                        value={this.state.newUserToAddID}
                                        onChangeText={newUserToAddID => this.setState({ newUserToAddID })}
                                        style={this.styles.modalInput}
                                        

                                    />

                                    <TouchableOpacity
                                        onPress={() => {
                                            { this.addUserToChat(this.state.chatID) };

                                        }}>

                                        {this.state.newUserToAddID ?

                                            (<View style={[this.styles.button, this.styles.buttonOpen]}>
                                                <Text style={this.styles.textStyle}> Update </Text>
                                            </View>) : (<> </>)}

                                    </TouchableOpacity>
                                </View>
                            </View>

                        </Modal>
                    </View>



                    <View style={this.styles.centeredView}>
                        <Modal transparent={true} animationType="fade" isVisible={this.state.viewMembers}
                            onRequestClose={this.viewMembers}>


                            <View style={this.styles.centeredView}>
                                <View style={this.styles.modalView}>

                                    <View style={{ alignItems: 'center' }}>
                                        <View style={this.styles.modalHead}>
                                            <Text style={GeneralStyles.chatHeaderText}>Members</Text>
                                            <TouchableOpacity
                                                onPress={() => this.viewMembers()}>
                                                <Ionicons name="md-close-sharp" size={25} color="#CC0000" />
                                            </TouchableOpacity>
                                        </View>
                                    </View>


                                    <FlatList
                                        data={this.state.chatMessages.members}
                                        renderItem={this.membersItemComponent}
                                        keyExtractor={(item) => item.user_id}

                                    />


                                </View>
                            </View>

                        </Modal>
                    </View>




                    <View style={this.styles.centeredView}>
                        <Modal transparent={true} animationType="fade" isVisible={this.state.editMessage}
                            onRequestClose={this.handleEditedChat}>


                            <View style={this.styles.centeredView}>
                                <View style={this.styles.modalView}>

                                    <View style={{ alignItems: 'center' }}>
                                        <View style={this.styles.modalHead}>
                                            <Text style={GeneralStyles.chatHeaderText}>Edit Message</Text>
                                            <TouchableOpacity
                                                onPress={() => this.handleEditedChat()}>
                                                <Ionicons name="md-close-sharp" size={25} color="#CC0000" />
                                            </TouchableOpacity>

                                            <TouchableOpacity
                                                onPress={() => this.handleDeleteMessage()}>
                                                <EvilIcons name="trash" size={25} color="grey" />
                                            </TouchableOpacity>
                                        </View>
                                    </View>


                                    <TextInput
                                        placeholder="Enter Message"
                                        placeholderTextColor={'grey'}
                                        defaultValue={this.state.origMessage}
                                        onChangeText={newMessage => this.setState({ newMessage })}
                                        style={this.styles.modalInput}
                                        multiline



                                    />


                                    <TouchableOpacity
                                        onPress={() => {
                                            { this.editMessage(this.state.chatID,this.state.messageToEditID) };

                                        }}>

                                        {this.state.newMessage ?

                                            (<View style={[this.styles.button, this.styles.buttonOpen]}>
                                                <Text style={this.styles.textStyle}> Update </Text>
                                            </View>) : (<> </>)}

                                    </TouchableOpacity>


                                </View>
                            </View>

                        </Modal>
                    </View>







                    <FlatList

                        data={this.state.chatMessages.messages}
                        renderItem={this.chatRoomItemComponent}
                        keyExtractor={(item) => item.message_id}
                        inverted

                    />

                    <View style={this.styles.sendBoxContainer}>
                        <View style={this.styles.sendBoxMainContainer}>
                            <TextInput placeholder={'Type a message'}
                                style={this.styles.inputBox}
                                value={this.state.message}
                                onChangeText={message => this.setState({ message })}
                                multiline

                            />

                        </View>

                        <TouchableOpacity onPress={() => {
                            { this.sendMessage(this.state.chatID) };

                        }}>
                            <View style={this.styles.buttonContainer}>
                                {this.state.message ? (
                                    <MaterialCommunityIcons name='send-circle' size={40} style={this.styles.sendButton} color={'#34B7F1'} />

                                ) :
                                    (<> </>)}

                            </View>
                        </TouchableOpacity>




                    </View>





                </>





            );



        }




    }
};

export default ChatsScreen;
