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
import { GiftedChat } from 'react-native-gifted-chat';

class ChatsScreen extends Component {

    constructor(props) {
        super(props);

        this.state = {
            chatDetail: [],
            messages: [],
            chatName: '',
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
        }
    });




    async loadSingleChat() {
        const sessionToken = await AsyncStorage.getItem("sessionToken");
        // eslint-disable-next-line react/prop-types
        const { navigation } = this.props;
        // eslint-disable-next-line react/prop-types
        const { id } = this.props.route.params;

        return fetch(`http://localhost:3333/api/1.0.0/chat/${id}`, {

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
                this.setState({ chatDetail: data })


            })

            .catch((error) => {
                console.log(error)

            })


    }


    async updateChatInfo() {
        const sessionToken = await AsyncStorage.getItem("sessionToken");
        // eslint-disable-next-line react/prop-types
        const { id } = this.props.route.params;

        let to_send = {};

        if (this.state.firstName != this.state.origFirstName && InputValidator.validName(this.state.firstName)) {
            to_send['first_name'] = this.state.firstName;
        }

        if (this.state.lastName != this.state.origLastName && InputValidator.validName(this.state.lastName)) {
            to_send['last_name'] = this.state.lastName;
        }
        if (this.state.email != this.state.origEmail && InputValidator.isValidEmail(this.state.email)) {
            to_send['email'] = this.state.email;
        }
        if (this.state.password != this.state.origPassword && InputValidator.isValidPassword(this.state.password)) {
            to_send['password'] = this.state.password;
        }

        return fetch(`http://localhost:3333/api/1.0.0/chat/${id}`, {

            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'X-Authorization': sessionToken,
            },

            body: JSON.stringify(to_send)

        })
            .then((response) => {
                if (response.status === 200) {
                    this.loadUserInfo()
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

        });
    }

    componentWillUnmount() {
        this.unsubscribe();
    }



    render() {

        // const { modalVisible } = this.state;
        // eslint-disable-next-line react/prop-types
        const navigation = this.props.navigation;





        return (

            <View style={GeneralStyles.mainAppContainer}>
                <SafeAreaView>


                    <View style={GeneralStyles.headerWrapper}>

                        <View style={this.styles.backButton}>

                            <TouchableOpacity
                                // eslint-disable-next-line react/prop-types
                                onPress={() => { navigation.navigate('Messages') }} >
                                <Ionicons name="chevron-back" size={33} />
                            </TouchableOpacity>

                        </View>

                    </View>

                    <View>

                        <Text>
                            {this.state.chats.name}
                        </Text>

                    </View>



                </SafeAreaView>


            </View>
        );









    }
};

export default ChatsScreen;
