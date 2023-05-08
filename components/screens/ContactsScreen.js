import { Component } from 'react';
import { Text, TextInput, View, SafeAreaView, ScrollView, StyleSheet, ActivityIndicator, FlatList } from 'react-native';
import { TouchableOpacity } from 'react-native-web';
import colors from '../../assets/colors/colors';
import GeneralStyles from '../../styles/GeneralStyles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons'
import Modal from "react-native-modal";
import React from 'react';

class ContactsScreen extends Component {

    constructor(props) {
        super(props);

        this.state = {
            count: 0,
            searchedContacts: [],
            contacts: [],
            refreshing: true,
            searchedValue: '',
            errorText: '',
            firstName: '',
            lastName: '',
            searching: false,
            disabled: false,
            modalVisible: true,
            isLoading: true,
            currentUser: null,

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

        messageUserText: {
            textAlign: 'center',
            marginTop: 20,
            color: colors.darkText,
            fontSize: 12,
            fontWeight: '400',

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
            shadowOpacity: 0.55,
            shadowRadius: 4,
            elevation: 5,
        },
        button: {
            borderRadius: 20,
            padding: 10,
            elevation: 2,
        },
        buttonOpen: {
            backgroundColor: '#F194FF',
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
            marginBottom: 15,
            textAlign: 'center',
        },


        error: {
            alignItems: 'center',
            justifyContent: 'center',
            padding: 16,
            backgroundColor: '#ffe6e6',
            borderWidth: 1,
            borderColor: '#ff4d4d',
            borderRadius: 4,

            shadowOffset: {
                width: 0,
                height: 2,
            },
            shadowOpacity: 0.55,
            shadowRadius: 4,
            elevation: 5,
        },







    });



    async searchForContacts(query, limit = 10, offset = 0) {
        const sessionToken = await AsyncStorage.getItem("sessionToken");
        const currentUserID = await AsyncStorage.getItem("userID");

        return fetch(`http://localhost:3333/api/1.0.0/search?q=${query}&search_in=all&limit=${limit}&offset=${offset}`, {
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

                else if (response.status === 400) {
                    this.setState({ invalidPassword: true });
                    this.setState({ errorText: "You can't add youself as a contact" })
                }

                else if (response.status === 401) {
                    this.setState({ errorText: 'Try Again' })
                }

                else if (response.status === 404) {
                    this.setState({ errorText: "Contact does not seem to exist" })
                }

                this.setState({ searchedContacts: [] })




            })

            .then(async (rJson) => {
                console.log(rJson)
                const data = rJson
                this.setState({ searchedContacts: data })
                this.setState({ currentUser: currentUserID })

            })

            .catch((error) => {

                console.log(error)

            })

    }

    async loadContacts() {
        const sessionToken = await AsyncStorage.getItem("sessionToken");


        return fetch("http://localhost:3333/api/1.0.0/contacts", {

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
                    this.setState({ errorText: 'Try Again' })
                }

                else if (response.status === 500) {
                    this.setState({ errorText: 'Try Again, make sure you are signed in' })
                }

            })

            .then(async (rJson) => {
                console.log(rJson)
                const data = rJson
                this.setState({ contacts: data })


            })

            .catch((error) => {
                console.log(error)

            })


    }


    addContact = async (item) => {

        const sessionToken = await AsyncStorage.getItem("sessionToken");
        const userID = item.user_id;

        return fetch(`http://localhost:3333/api/1.0.0/user/${userID}/contact`, {

            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Authorization': sessionToken,
            },

            body: JSON.stringify({ userID })

        })
            .then((response) => {
                if (response.status == 200) {
                    this.loadContacts();
                }
                else if (response.status == 400) {
                    this.setState({ errorText: "You can't add youself as a contact" })
                }

                else if (response.status == 401 || 500) {
                    this.setState({ errorText: 'Try Again' })
                }

                else if (response.status == 404) {
                    this.setState({ errorText: "Contact does not seem to exist" })
                }

            })

            .catch((error) => {
                console.log(error)
            })


    }


    removeContact = async (item) => {

        const sessionToken = await AsyncStorage.getItem("sessionToken");
        const userID = item.user_id;

        return fetch(`http://localhost:3333/api/1.0.0/user/${userID}/contact`, {

            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'X-Authorization': sessionToken,
            },

            body: JSON.stringify({ userID })

        })
            .then((response) => {
                if (response.status == 200) {
                    this.loadContacts();
                }
                else if (response.status == 400) {
                    this.setState({ errorText: "You can't DELETE yourself" })
                }

                else if (response.status == 401 || 500) {
                    this.setState({ errorText: 'Try Again' })
                }

                else if (response.status == 404) {
                    this.setState({ errorText: "Contact does not seem to exist" })
                }

            })

            .catch((error) => {
                console.log(error)
            })


    }


    blockContact = async (item) => {

        const sessionToken = await AsyncStorage.getItem("sessionToken");
        const userID = item.user_id;

        return fetch(`http://localhost:3333/api/1.0.0/user/${userID}/block`, {

            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Authorization': sessionToken,
            },

            body: JSON.stringify({ userID })

        })
            .then((response) => {
                if (response.status == 200) {
                    this.loadContacts();
                }
                else if (response.status == 400) {
                    this.setState({ errorText: "You can't DELETE yourself" })
                }

                else if (response.status == 401 || 500) {
                    this.setState({ errorText: 'Try Again' })
                }

                else if (response.status == 404) {
                    this.setState({ errorText: "Contact does not seem to exist" })
                }

            })

            .catch((error) => {
                console.log(error)
            })


    }


    searchItemComponent = ({ item }) => {



        if (item.user_id != this.state.currentUser) {

            return (
                <View style={GeneralStyles.contactsWrapper} key={item.user_id}>
                    <Text style={GeneralStyles.searchText}>
                        {item.given_name + " " + item.family_name}
                    </Text>

                    {
                        this.state.contacts.some(user => user.user_id === item.user_id) &&
                        (
                            <Ionicons name="ios-happy-sharp" size={30} color="FC0000" />
                        )

                    }

                    {
                        (
                            !this.state.contacts.some(user => user.user_id === item.user_id) &&
                            <TouchableOpacity onPress={() => { this.addContact(item); }} >
                                <Ionicons name="md-person-add" size={30} color="#36942B" />
                            </TouchableOpacity>

                        )
                    }

                </View>

            )
        }

    }

    contactItemComponent = ({ item }) => {
        return (
            <View style={GeneralStyles.contactsWrapper} key={item.user_id}>
                <Text style={GeneralStyles.searchText}>
                    {item.first_name + " " + item.last_name}
                </Text>

                <View style={GeneralStyles.iconSpacing}>

                    <View style={{ margin: 20 }}>
                        <TouchableOpacity onPress={() => { this.removeContact(item) }}>
                            <Ionicons name="person-remove" size={30} color="FC0000" />
                        </TouchableOpacity>

                    </View>

                    <View>
                        <TouchableOpacity onPress={() => this.blockContact(item)}>
                            <MaterialCommunityIcons name="block-helper" size={30} color="FC0000" />
                        </TouchableOpacity>

                    </View>
                </View>
            </View>

        )
    }


    manageModalVisibility = () => {
        this.setState({ modalVisible: !this.state.modalVisible })


    }

    componentDidMount() {
        // eslint-disable-next-line react/prop-types
        this.unsubscribe = this.props.navigation.addListener('focus', () => {
            this.loadContacts();
            this.setState({ isLoading: false })
        });
    }

    componentWillUnmount() {
        this.unsubscribe();
    }



    render() {

        // const { modalVisible } = this.state;
        // eslint-disable-next-line react/prop-types
        const navigation = this.props.navigation;

        if (this.state.isLoading) {
            return (<View>
                <ActivityIndicator size="large" />
            </View>)

        }

        else {
            return (

                <View style={GeneralStyles.mainAppContainer}>
                    <SafeAreaView>

                        <View style={GeneralStyles.headerWrapper}>

                            <View style={GeneralStyles.headerContent}>

                                <TextInput style={GeneralStyles.searchBox} placeholder="Search" onChangeText={(text) => this.setState({ searchedValue: text })}
                                    onChange={() => { this.searchForContacts(this.state.searchedValue) }}
                                />

                                <TouchableOpacity
                                    // eslint-disable-next-line react/prop-types
                                    onPress={() => { navigation.navigate('Blocked') }} >
                                    <Ionicons name="exit-outline" size={33} />
                                </TouchableOpacity>

                            </View>

                        </View>


                        <ScrollView contentContainerStyle={GeneralStyles.profileContainer} >


                            {
                                this.state.searchedValue && this.state.searchedContacts.length > 0 ?

                                    (<FlatList

                                        data={this.state.searchedContacts}
                                        renderItem={this.searchItemComponent}
                                        ListHeaderComponent={<Text style={GeneralStyles.headerText}> WhatsThat Users </Text>}

                                    />) : (

                                        <FlatList

                                            data={this.state.contacts}
                                            renderItem={this.contactItemComponent}
                                            ListHeaderComponent={<Text style={GeneralStyles.headerText}> Your Contacts </Text>}
                                            ListEmptyComponent={<Text style={GeneralStyles.headerText}> Search to add Contacts </Text>}
                                        />
                                    )

                            }

                            {
                                this.state.errorText.length > 0 &&



                                <View>
                                    <Modal
                                        animationType="slide"
                                        backdropColor="black"
                                        backdropOpacity={0.9}

                                        isVisible={this.state.modalVisible}
                                    >
                                        <View style={this.styles.centeredView}>
                                            <View style={this.styles.error}>
                                                <Text style={this.styles.modalText}>{this.state.errorText}</Text>
                                                <TouchableOpacity
                                                    style={[this.styles.button, this.styles.buttonClose]}
                                                    onPress={this.manageModalVisibility}>
                                                    <Text style={this.styles.textStyle}>Close</Text>
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                    </Modal>

                                </View>


                            }


                        </ScrollView>

                    </SafeAreaView>


                </View>
            );
        }








    }
};

export default ContactsScreen;
