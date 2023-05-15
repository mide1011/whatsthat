import { Component } from 'react';
import { Text, TextInput, View, SafeAreaView, ScrollView, StyleSheet, Pressable, FlatList } from 'react-native';
import { TouchableOpacity } from 'react-native-web';
import colors from '../../assets/colors/colors';
import GeneralStyles from '../../styles/GeneralStyles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons'
import Modal from "react-native-modal";
import React from 'react';

class BlockedScreen extends Component {

    constructor(props) {
        super(props);

        this.state = {

            blocked: [],
            errorText: '',
            showModal: false,


        };



    }

    makesModalVisible = () => {
        this.setState({ showModal: true })

        setTimeout(() => {
            this.setState({ showModal: false })
        }, 100);
    }





    async loadBlocked() {
        const sessionToken = await AsyncStorage.getItem("sessionToken");


        return fetch("http://localhost:3333/api/1.0.0/blocked", {

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
                    this.setState({ showModal: true })
                }

                else if (response.status === 500) {
                    this.setState({ errorText: 'Try Again, make sure you are signed in' })
                    this.setState({ showModal: true })
                }

            })

            .then(async (rJson) => {
                console.log(rJson)
                const data = rJson
                this.setState({ blocked: data })


            })

            .catch((error) => {
                console.log(error)

            })


    }

    unblockContact = async (item) => {

        const sessionToken = await AsyncStorage.getItem("sessionToken");
        const userID = item.user_id;

        return fetch(`http://localhost:3333/api/1.0.0/user/${userID}/block`, {

            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'X-Authorization': sessionToken,
            },

            body: JSON.stringify({ userID })

        })
            .then((response) => {
                if (response.status == 200) {
                    this.loadBlocked();
                    this.setState({ errorText: "Sucessfully Unblocked" })
                    this.setState({ showModal: true })
                }
                else if (response.status == 400) {
                    this.setState({ errorText: "You can't Block yourself" })
                    this.setState({ showModal: true })

                }

                else if (response.status == 401) {
                    this.setState({ errorText: "Try Again" })
                    this.setState({ showModal: true })

                }

                else if (response.status == 404) {
                    this.setState({ errorText: "Try Again" })
                    this.setState({ showModal: true })

                }

            })

            .catch((error) => {
                console.log(error)
            })


    }


    blockedItemComponent = ({ item }) => {
        return (
            <View style={GeneralStyles.contactsWrapper} key={item.user_id}>
                <Text style={GeneralStyles.searchText}>
                    {item.first_name + " " + item.last_name}
                </Text>

                <View style={GeneralStyles.iconSpacing}>

                    <View style={{ margin: 20 }}>
                        <TouchableOpacity onPress={() => { this.unblockContact(item) }}>
                            <Ionicons name="person-remove" size={30} color="FC0000" />
                        </TouchableOpacity>

                    </View>
                </View>
            </View>

        )
    }


    componentDidMount() {
        // eslint-disable-next-line react/prop-types
        this.unsubscribe = this.props.navigation.addListener('focus', () => {
            this.loadBlocked();
        });
    }

    componentWillUnmount() {
        this.unsubscribe();
    }



    render() {
        // eslint-disable-next-line react/prop-types
        const navigation = this.props.navigation;
        return (

            <View style={GeneralStyles.mainAppContainer}>


                <SafeAreaView>

                    <View style={GeneralStyles.headerWrapper}>

                        <View style={GeneralStyles.headerContent}>

                            <Text style={GeneralStyles.headerText}> Blocked Users </Text>
                            <TouchableOpacity
                                // eslint-disable-next-line react/prop-types
                                onPress={() => { navigation.navigate('Contacts') }}>
                                <Ionicons name="exit-outline" size={30} />
                            </TouchableOpacity>


                        </View>


                        <ScrollView contentContainerStyle={GeneralStyles.profileContainer} >

                            <FlatList

                                data={this.state.blocked}
                                renderItem={this.blockedItemComponent}
                                ListEmptyComponent={<Text style={GeneralStyles.headerText}> 0 Blocked </Text>}
                            />



                        </ScrollView>

                    </View>
                </SafeAreaView>


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

            </View>






        );





    }
};

export default BlockedScreen;
