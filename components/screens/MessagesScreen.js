import { Component } from 'react';
import { Text, TextInput, View, SafeAreaView, ScrollView, StyleSheet, ActivityIndicator, FlatList } from 'react-native';
import { TouchableOpacity } from 'react-native-web';
import colors from '../../assets/colors/colors';
import GeneralStyles from '../../styles/GeneralStyles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FontAwesome, Ionicons } from '@expo/vector-icons'
import Modal from "react-native-modal";
import React from 'react';
import InputValidator from '../../helpers/InputValidator';
import Moment from 'moment';


class MessagesScreen extends Component {

    constructor(props) {
        super(props);

        this.state = {
            count: 0,
            searchedContacts: [],
            allChats: [],
            chatDetail: [],
            chatName: '',


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


        chatPfpWrapper: {
            paddingTop: 15,
            paddingBottom: 15,
        },


        userChatPfp: {
            width: 20,
            height: 20,
            borderRadius: 25,
        },









    });


    async loadChats() {
        const sessionToken = await AsyncStorage.getItem("sessionToken");


        return fetch("http://localhost:3333/api/1.0.0/chat", {

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

            .then(async (rJson) => {
                console.log(rJson)
                const data = rJson
                this.setState({ allChats: data })


            })

            .catch((error) => {
                console.log(error)

            })


    }

    createChat = async (name) => {

        const sessionToken = await AsyncStorage.getItem("sessionToken");

        return fetch(`http://localhost:3333/api/1.0.0/chat`, {

            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Authorization': sessionToken,
            },

            body: JSON.stringify({ name })

        })
            .then((response) => {
                if (response.status == 201) {
                    this.loadChats();
                }
                else if (response.status == 400) {
                    this.setState({ errorText: "Something went wrong, Try Again" })
                }

                else if (response.status == 401) {
                    this.setState({ errorText: 'Unauthorised, you can not make this request' })
                }

                else if (response.status == 500) {
                    this.setState({ errorText: "Somehing went wrong on our end, Try Again later" })
                }

            })

            .catch((error) => {
                console.log(error)
            })


    }



    chatsItemComponent = ({ item }) => {
        // eslint-disable-next-line react/prop-types
        const navigation = this.props.navigation;
        Moment.locale('en');
        return (
            // eslint-disable-next-line react/prop-types
            <TouchableOpacity onPress={() => { navigation.navigate('Chats', {id: item.chat_id}) }}>
                <View style={GeneralStyles.contactsWrapper} key={item.user_id}>

                    <View style={this.styles.chatPfpWrapper}>
                        <View style={this.styles.userChatPfp}>

                        </View>

                    </View>

                    <Text style={GeneralStyles.chatInfoText}>
                        {item.name}
                    </Text>

                    <View style={this.styles.chatExtraInfoWrapper}>
                        <Text style={this.styles.lastChatText} numberOfLines={1}>{item.last_message.message ?? '......'}</Text>
                        <Text style={this.styles.lastMessageDateText}>{item.last_message.timestamp ? (Moment(item.last_message.timestamp).format('d MMM')
                        ) : ('......')}
                        </Text>
                    </View>



                </View>
            </TouchableOpacity>

        )
    }



    createChatComponent = () => {
        this.createChat(this.state.chatName)
        this.setState({ chatName: '' })
    }



    componentDidMount() {
        // eslint-disable-next-line react/prop-types
        this.unsubscribe = this.props.navigation.addListener('focus', () => {
            this.loadChats();

        });
    }

    componentWillUnmount() {
        this.unsubscribe();
    }



    render() {

        // const { modalVisible } = this.state;
        // eslint-disable-next-line react/prop-types
        const navigation = this.props.navigation;
        const newChatName = '';



        return (

            <View style={GeneralStyles.mainAppContainer}>
                <SafeAreaView>

                    <View style={GeneralStyles.headerWrapper}>

                        <View style={GeneralStyles.headerContent}>

                            <TextInput style={GeneralStyles.searchBox} placeholder="Enter a chat name here"
                                onChangeText={chatName => this.setState({ chatName })}
                            />

                            <TouchableOpacity onPress={() => { this.createChatComponent(); }}
                            >
                                <FontAwesome name="pencil-square-o" size={33} />
                            </TouchableOpacity>

                        </View>

                    </View>


                    <ScrollView contentContainerStyle={GeneralStyles.profileContainer} >


                        <FlatList

                            data={this.state.allChats}
                            renderItem={this.chatsItemComponent}
                            ListHeaderComponent={<Text style={GeneralStyles.headerText}> Your Chats </Text>}
                            ListEmptyComponent={<Text style={GeneralStyles.headerText}>  Press Icon to start new Converstions  </Text>}
                        />







                    </ScrollView>

                </SafeAreaView>


            </View>
        );









    }
};

export default MessagesScreen;
