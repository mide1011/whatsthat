import React, { Component } from 'react';
import { Text, TextInput, View, ImageBackground, SafeAreaView, ScrollView, StyleSheet, ActivityIndicator, FlatList } from 'react-native';
import { TouchableOpacity } from 'react-native-web';
import colors from '../../assets/colors/colors';
import GeneralStyles from '../../styles/GeneralStyles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FontAwesome, Ionicons, EvilIcons, MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons'
import Modal from "react-native-modal";
import InputValidator from '../../helpers/InputValidator';
import Moment from 'moment';
import ChatHelper from '../../helpers/ChatHelper';
import ChatBG from '../../assets/images/chatBG.png'
import PropTypes from 'prop-types';


class ChatsScreen extends Component {

    constructor(props) {
        super(props);

        this.state = {
            chatMessages: [],
            messages: [],
            messagesForServer: [],
            draftMessages: [],
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
            isDraft: false,
            showModal: false,




            newChatName: '',
            newUserToAddID: '',
            messageToEditID: '',
            origMessage: '',
            newMessage: '',
            messageAuthorID: '',
        };


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
            marginVertical: 5,
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




    });

    async loadSingleChat() {
        const sessionToken = await AsyncStorage.getItem("sessionToken");
        // eslint-disable-next-line react/prop-types
        const { navigation } = this.props;
        // eslint-disable-next-line react/prop-types
        const { chatID } = this.props.route.params;
        const userID = await AsyncStorage.getItem("userID");
        const limit = 20;
        const offset = 0;

        return fetch(`http://localhost:3333/api/1.0.0/chat/${chatID}?limit=${limit}&offset=${offset}`, {

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
                    this.setState({ showModal: true })
                }

                else if (response.status === 500) {
                    this.setState({ errorText: 'Try Again, Make sure you are Signed in' })
                    this.setState({ showModal: true })
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
                    this.setState({ showModal: true })
                }

                else if (response.status === 400) {
                    this.setState({ errorText: 'Try Again' })
                    this.setState({ showModal: true })
                }

                else if (response.status === 401) {
                    this.setState({ errorText: 'Try Again, make sure you are signed in' })
                    this.setState({ showModal: true })
                }

                else if (response.status === 404) {
                    this.setState({ errorText: "You can't make this request" })
                    this.setState({ showModal: true })
                }

                else if (response.status === 500) {
                    this.setState({ errorText: "Try again later" })
                    this.setState({ showModal: true })
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
                    this.setState({ showModal: true })
                    this.setState({ errorText: "Something went wrong, Try Again" })
                }

                else if (response.status == 401) {
                    this.setState({ showModal: true })
                    this.setState({ errorText: "You can't make this request" })
                }

                else if (response.status == 403) {
                    this.setState({ showModal: true })

                    this.setState({ errorText: "You can't send this message, Try Again" })
                }

                else if (response.status == 404) {
                    this.setState({ showModal: true })

                    this.setState({ errorText: "Not Found, Try Again Later" })
                }

                else if (response.status == 500) {
                    this.setState({ showModal: true })
                    this.setState({ errorText: "Try Again" })
                }

            })

            .catch((error) => {
                console.log(error)
            })


    }


    addUserToChat = async (chatID) => {

        const sessionToken = await AsyncStorage.getItem("sessionToken");
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
                    this.setState({ showModal: true })
                    this.setState({ errorText: "Successsfully Added User" })
                    this.setState({ newUserToAddID: '' });
                }
                else if (response.status == 400) {
                    this.setState({ showModal: true })
                    this.setState({ errorText: "Something went wrong, Try Again" })
                }

                else if (response.status == 401) {
                    this.setState({ showModal: true })
                    this.setState({ errorText: "You can't make this request" })
                }

                else if (response.status == 403) {
                    this.setState({ showModal: true })
                    this.setState({ errorText: "You can't send this message, Try Again" })
                }

                else if (response.status == 404) {
                    this.setState({ showModal: true })
                    this.setState({ errorText: "Not Found, Try Again Later" })
                }

                else if (response.status == 500) {
                    this.setState({ showModal: true })
                    this.setState({ errorText: "Try Again Later" })
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
                if (response.status === 200) {
                    this.loadSingleChat();
                }

                else if (response.status === 401) {
                    this.setState({ showModal: true })
                    this.setState({ errorText: "You can't make this request" })
                }

                else if (response.status === 403) {
                    this.setState({ showModal: true })
                    this.setState({ errorText: "You can't send this message, Try Again" })
                }

                else if (response.status == 404) {
                    this.setState({ showModal: true })
                    this.setState({ errorText: "Not Found, Try Again" })
                }

                else if (response.status == 500) {
                    this.setState({ showModal: true })
                    this.setState({ errorText: "Try Again, Later" })
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
                if (response.status === 200) {
                    this.loadSingleChat();
                }

                else if (response.status === 401) {
                    this.setState({ errorText: "You can't make this request" })
                    this.setState({ showModal: true })

                }

                else if (response.status === 403) {
                    this.setState({ errorText: "You can't send this message, Try Again" })
                    this.setState({ showModal: true })
                }

                else if (response.status === 404) {
                    this.setState({ errorText: "Not Found" })
                    this.setState({ showModal: true })

                }

                else if (response.status === 500) {
                    this.setState({ errorText: "Try Again" })
                    this.setState({ showModal: true })

                }

            })

            .catch((error) => {
                console.log(error)
            })


    }



    editMessage = async (chatID, messageID) => {
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
                    this.setState({ showModal: true })
                }

                else if (response.status === 400) {
                    this.setState({ errorText: "Try Again, You can't make this request" })
                    this.setState({ showModal: true })

                }

                else if (response.status === 401) {
                    this.setState({ errorText: 'Try Again, make sure you are signed in' })
                    this.setState({ showModal: true })
                }

                else if (response.status === 403) {
                    this.setState({ errorText: 'Try Again, make sure you are signed in' })
                    this.setState({ showModal: true })
                }

                else if (response.status === 404) {
                    this.setState({ errorText: 'Something went wrong try again' })
                    this.setState({ showModal: true })
                }

                else if (response.status === 500) {
                    this.setState({ errorText: 'Try Again Later' })
                    this.setState({ showModal: true })
                }

            })

            .catch((error) => {
                console.log(error)

            })


    }


    loadDrafts = async () => {
        try {

            const drafts = await AsyncStorage.getItem("userDrafts");
            const userDrafts = JSON.parse(drafts)

            if (drafts) {
                this.setState({ draftMessages: userDrafts.map((item) => item.message) })
                console.log(drafts)
            }



        }

        catch (error) {
            console.log(error)

        }
    };

    saveDrafts = async () => {
        const { draftMessages } = this.state;
        const { message } = this.state;
        const newDraft = { id: Date.now(), message }
        const updatedDrafts = [...draftMessages, newDraft];
        try {

            await AsyncStorage.setItem("userDrafts", JSON.stringify(updatedDrafts));
            this.setState({ drafts: updatedDrafts, message: '' });
        }

        catch (error) {
            console.log(error)

        }



    }

    deleteDraft = async (id) => {
        const { draftMessages } = this.state
        const { updatedDrafts } = draftMessages.filter((draftMessages) => draftMessages.id !== id);

        try {
            await AsyncStorage.setItem("userDrafts", JSON.stringify(updatedDrafts));
            this.setState({ drafts: updatedDrafts });
        }

        catch (error) {
            console.log(error)

        }


    }





    static get propTypes() {
        return {
            navigation: PropTypes.object.isRequired,
        };
    }


    componentDidMount() {

        this.loadSingleChat();
        this.unsubscribe = this.props.navigation.addListener('focus', () => {
            this.setState({ isLoading: false })
            this.loadSingleChat();
            this.loadDrafts();

        });

        this.interval = setInterval(() => {
            this.loadSingleChat();
        }, 3000);


    }

    componentWillUnmount() {
        this.unsubscribe();

    }




    chatRoomItemComponent = ({ item }) => {

        const navigation = this.props.navigation;
        Moment.locale('en');
        const userID = String(item.author.user_id);
        const currentUser = this.state.currentUserID;

        return (
            <View style={this.styles.chatBoxContainer}>

                <TouchableOpacity onPress={() => {
                    ChatHelper.isMyMessage(userID, currentUser) ? this.handleEditedMessage(item) : <></>
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



    draftsItemComponent = ({ item }) => {

        return (
            <View style={GeneralStyles.contactsWrapper} key={item}>
                <Text style={GeneralStyles.infoText}>
                    {item}
                </Text>

                <View style={GeneralStyles.iconSpacing}>

                    <View style={{ margin: 10 }}>

                        <TouchableOpacity
                            onPress={() => { this.deleteDraft(item) }}>
                            <EvilIcons name="trash" size={25} color="grey" />
                        </TouchableOpacity>


                    </View>

                </View>


            </View>


        )

    }


    updateChatRoomName = () => {
        this.setState(({ updateChatName }) => ({ updateChatName: !updateChatName }));

    }


    modalState = () => {
        this.setState(({ modalState }) => ({ modalState: !modalState }));

    }


    addUserToChatRoom = () => {
        this.setState(({ isUserAdded }) => ({ isUserAdded: !isUserAdded }));



    }

    viewMembers = () => {
        this.setState(({ viewMembers }) => ({ viewMembers: !viewMembers }));

    }

    handleDrafts = () => {
        this.setState(({ isDraft }) => ({ isDraft: !isDraft }));

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
        this.deleteMessageFromChat(this.state.messageToEditID, this.state.chatID)

    }

    makesModalVisible = () => {
        this.setState({ showModal: true })

        setTimeout(() => {
            this.setState({ showModal: false })
        }, 100);
    }












    render() {


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
                                    { this.setState({ isDraft: true }) };
                                }}>
                                    <MaterialIcons name="drafts" size={25} color="pink" />
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


                    <View style={GeneralStyles.modalCenteredView}>
                        <Modal transparent={true} animationType="fade" isVisible={this.state.showModal}>

                            <View style={GeneralStyles.modalCenteredView}>
                                <View style={GeneralStyles.modalView}>

                                    <View style={{ alignItems: 'center' }}>
                                        <View style={GeneralStyles.modalHead}>
                                            <Text style={GeneralStyles.modalText}>{this.state.errorText} </Text>

                                        </View>

                                        <TouchableOpacity
                                            onPress={this.makesModalVisible}>

                                            <View style={[GeneralStyles.button, GeneralStyles.buttonOpen]}>
                                                <Text style={GeneralStyles.textStyle}> Ok </Text>
                                            </View>

                                        </TouchableOpacity>


                                    </View>




                                </View>
                            </View>

                        </Modal>
                    </View>



                    <View style={GeneralStyles.centeredView}>
                        <Modal transparent={true} animationType="fade" isVisible={this.state.updateChatName}
                            onRequestClose={this.updateChatRoomName}>


                            <View style={GeneralStyles.centeredView}>
                                <View style={GeneralStyles.modalView}>

                                    <View style={{ alignItems: 'center' }}>
                                        <View style={GeneralStyles.modalHead}>
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
                                        style={GeneralStyles.modalInput}
                                        multiline

                                    />

                                    <TouchableOpacity
                                        onPress={() => {
                                            { this.updateChatInfo(this.state.chatID) };

                                        }}>

                                        {this.state.newChatName ?

                                            (<View style={[GeneralStyles.button, GeneralStyles.buttonOpen]}>
                                                <Text style={GeneralStyles.textStyle}> Update </Text>
                                            </View>) : (<> </>)}

                                    </TouchableOpacity>
                                </View>
                            </View>

                        </Modal>
                    </View>



                    <View style={GeneralStyles.centeredView}>
                        <Modal transparent={true} animationType="fade" isVisible={this.state.isUserAdded}
                            onRequestClose={this.addUserToChatRoom}>


                            <View style={GeneralStyles.centeredView}>
                                <View style={GeneralStyles.modalView}>

                                    <View style={{ alignItems: 'center' }}>
                                        <View style={GeneralStyles.modalHead}>
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
                                        style={GeneralStyles.modalInput}


                                    />

                                    <TouchableOpacity
                                        onPress={() => {
                                            { this.addUserToChat(this.state.chatID) };

                                        }}>

                                        {this.state.newUserToAddID ?

                                            (<View style={[GeneralStyles.button, GeneralStyles.buttonOpen]}>
                                                <Text style={GeneralStyles.textStyle}> Update </Text>
                                            </View>) : (<> </>)}

                                    </TouchableOpacity>
                                </View>
                            </View>

                        </Modal>
                    </View>



                    <View style={GeneralStyles.centeredView}>


                        <Modal transparent={true} animationType="fade" isVisible={this.state.viewMembers}
                            onRequestClose={this.viewMembers}>


                            <View style={GeneralStyles.centeredView}>
                                <View style={GeneralStyles.modalView}>

                                    <View style={{ alignItems: 'center' }}>
                                        <View style={GeneralStyles.modalHead}>
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




                    <View style={GeneralStyles.centeredView}>


                        <Modal transparent={true} animationType="fade" isVisible={this.state.isDraft}
                            onRequestClose={this.handleDrafts}>


                            <View style={GeneralStyles.centeredView}>
                                <View style={GeneralStyles.modalView}>

                                    <View style={{ alignItems: 'center' }}>
                                        <View style={GeneralStyles.modalHead}>
                                            <Text style={GeneralStyles.chatHeaderText}>Drafts</Text>
                                            <TouchableOpacity
                                                onPress={() => this.handleDrafts()}>
                                                <Ionicons name="md-close-sharp" size={25} color="#CC0000" />
                                            </TouchableOpacity>
                                        </View>
                                    </View>


                                    <FlatList
                                        data={this.state.draftMessages}
                                        renderItem={this.draftsItemComponent}

                                    />


                                </View>
                            </View>

                        </Modal>
                    </View>




                    <View style={GeneralStyles.centeredView}>
                        <Modal transparent={true} animationType="fade" isVisible={this.state.editMessage}
                            onRequestClose={this.handleEditedChat}>


                            <View style={GeneralStyles.centeredView}>
                                <View style={GeneralStyles.modalView}>

                                    <View style={{ alignItems: 'center' }}>
                                        <View style={GeneralStyles.modalHead}>
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
                                        style={GeneralStyles.modalInput}
                                        multiline



                                    />


                                    <TouchableOpacity
                                        onPress={() => {
                                            { this.editMessage(this.state.chatID, this.state.messageToEditID) };

                                        }}>

                                        {this.state.newMessage ?

                                            (<View style={[GeneralStyles.button, GeneralStyles.buttonOpen]}>
                                                <Text style={GeneralStyles.textStyle}> Update </Text>
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
                                    <MaterialCommunityIcons name='send-circle' size={35} style={this.styles.sendButton} color={'#34B7F1'} />


                                ) :
                                    (<> </>)}

                            </View>
                        </TouchableOpacity>


                        <TouchableOpacity onPress={() => {
                            { this.saveDrafts() };

                        }}>
                            <View style={this.styles.buttonContainer}>
                                {this.state.message ? (
                                    <MaterialCommunityIcons name='send-circle' size={35} style={this.styles.sendButton} color={'pink'} />


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
