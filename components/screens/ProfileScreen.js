import { Component, useState } from 'react';
import { Text, TextInput, View, Image, Button, Alert, SafeAreaView, StyleSheet, Pressable } from 'react-native';
import { ActivityIndicator, TouchableOpacity } from 'react-native-web';
import colors from '../../assets/colors/colors';
import GeneralStyles from '../../styles/GeneralStyles';
import userLogin from '../../components/screens/RegisterScreen';
import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import InputValidator from '../../helpers/InputValidator';
import Modal from "react-native-modal";
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import PropTypes from 'prop-types';
import * as ImagePicker from 'expo-image-picker';
class ProfileScreen extends Component {

    constructor(props) {
        super(props);

        this.state = {

            firstName: '',
            lastName: '',
            email: '',
            password: '',


            origFirstName: '',
            origLastName: '',
            origEmail: '',
            origPassword: '',

            invalidEmail: false,
            invalidPassword: false,
            invalidName: false,



            isSecureEntry: true,
            image: 'null',
            showModal: false,

            errorText: '',

        }

    }



    static get propTypes() {
        return {
            navigation: PropTypes.object.isRequired,
        };
    }


    styles = StyleSheet.create({
        container: {
            backgroundColor: '#DEF2E7',
            flex: 1,
            alignItems: 'center',
            justifyContent: 'space-between',
            flexDirection: 'column',
        },


        input: {
            width: 305,
            height: 50,
            marginBottom: 20,
            paddingHorizontal: 10,
            borderWidth: 1,
            borderColor: colors.greenBars,
            borderRadius: 5,
            backgroundColor: colors.tabBarTheme,

        },

        updateUserText: {

            fontSize: 14,
            fontWeight: '600',

        },

        updateUserSmallText: {

            fontSize: 12,
            fontWeight: '600',

        },


        userPFP: {
            borderColor: colors.greenBars,
            marginLeft: 10,
            width: 90,
            height: 90,
            borderRadius: 50,
            borderWidth: 3,
        },

        visibilityButton: {
            position: 'absolute',
            right: 8,
            height: 27,
            width: 27,
            marginTop: 21,
        },

        eyeIconImage: {
            width: '100%',
            height: '100%',
            alignSelf: 'center',
        }

    });


    makesModalVisible = () => {

        this.setState(({ showModal }) => ({ showModal: !showModal }));
    }

    managePasswordVisibility = () => {
        this.setState({ isSecureEntry: !this.state.isSecureEntry })
    }


    async updateUserInfo() {
        const sessionToken = await AsyncStorage.getItem("sessionToken");
        const userID = await AsyncStorage.getItem("userID");


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

        return fetch(`http://localhost:3333/api/1.0.0/user/${userID}`, {

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

                else if (response.status === 403) {
                    this.setState({ errorText: 'Make sure you are signed in' })
                    this.setState({ showModal: true })
                }

                else if (response.status === 404) {
                    this.setState({ errorText: 'Try Again Later' })
                    this.setState({ showModal: true })
                }

                else if (response.status === 404) {
                    this.setState({ errorText: 'Try Again Later, Something' })
                    this.setState({ showModal: true })
                }

            })

            .catch((error) => {
                console.log(error)

            })


    }



    async loadUserInfo() {
        const sessionToken = await AsyncStorage.getItem("sessionToken");
        const userID = await AsyncStorage.getItem("userID");

        return fetch(`http://localhost:3333/api/1.0.0/user/${userID}`, {

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
                this.setState({ origFirstName: data.first_name })
                this.setState({ origLastName: data.last_name })
                this.setState({ origPassword: data.password })
                this.setState({ origEmail: data.email })
                this.setState({ currentUserID: data.user_id })


            })

            .catch((error) => {
                console.log(error)

            })


    }


    logoutUser = async () => {

        const navigation = this.props.navigation;
        const sessionToken = await AsyncStorage.getItem("sessionToken");





        return fetch("http://localhost:3333/api/1.0.0/logout", {

            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                'X-Authorization': sessionToken,
            },

        })

            .then(async (response) => {

                if (response.status === 200) {
                    await AsyncStorage.removeItem("sessionToken")
                    await AsyncStorage.removeItem("userID")
                    this.setState({ showModal: true })
                    navigation.navigate('Login')


                }

                else if (response.status === 401) {
                    await AsyncStorage.removeItem("sessionToken")
                    await AsyncStorage.removeItem("userID")

                    navigation.navigate('Login')
                }



                else {
                    this.setState({ showModal: true })
                    this.setState({ errorText: 'Something went wrong' })

                }

            })


            .catch((error) => {
                console.log(error)

            })



    }


    handlePfpUpload = async () => {
        const sessionToken = await AsyncStorage.getItem("sessionToken");
        const userID = await AsyncStorage.getItem("userID");


        await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
            base64: true,

        }).then((image) => {



            if (!image.canceled) {
                fetch(`data:image/png;base64, ${image.assets[0].base64}`).then(res => res.blob()).then(blob => {

                    return fetch(`http://localhost:3333/api/1.0.0/user/${userID}/photo`, {

                        method: 'POST',
                        headers: {
                            'Content-Type': 'image/png',
                            'X-Authorization': sessionToken,

                        },

                        body: blob,


                    })

                }).then((response) => {
                    if (response.status === 200) {
                        this.loadUserInfo()
                        this.getUserProfilePic()
                        this.setState({ image: `data:image/png;base64, ${image.assets[0].base64}` })
                    }

                    else if (response.status === 400) {
                        this.setState({ errorText: 'Try Again' })
                    }

                    else if (response.status === 401) {
                        this.setState({ errorText: 'Try Again, make sure you are signed in' })
                    }

                })


            }
        })




    }


    async getUserProfilePic() {
        const sessionToken = await AsyncStorage.getItem("sessionToken");
        const userID = await AsyncStorage.getItem("userID");

        return fetch(`http://localhost:3333/api/1.0.0/user/${userID}/photo`, {

            method: 'GET',
            headers: {
                'Content-Type': 'image/png',
                'X-Authorization': sessionToken,
            },

        })
            .then((image) => {
                if (image.status === 200) {
                    return image.blob()
                }

            })

            .then(async (rawImage) => {
                this.setState({ image: URL.createObjectURL(rawImage) })

            })

            .catch((error) => {
                console.log(error)

            })


    }



    componentDidMount() {

        this.unsubscribe = this.props.navigation.addListener('focus', () => {
            this.loadUserInfo();
            this.getUserProfilePic();
        });
    }

    componentWillUnmount() {
        this.unsubscribe();
    }


    render() {


        const navigation = this.props.navigation;



        return (
            <View style={GeneralStyles.mainAppContainer}>
                <SafeAreaView>


                    <View style={GeneralStyles.headerWrapper}>
                        <TouchableOpacity onPress={this.handlePfpUpload}>



                            <Image
                                source={{ uri: this.state.image }}
                                style={this.styles.userPFP}

                            />

                        </TouchableOpacity>

                        <View style={GeneralStyles.headerContent}>
                            <Text style={GeneralStyles.headerText}> {this.state.origFirstName} {""}{this.state.origLastName} </Text>
                        </View>

                        <View>
                            <Text style={this.styles.updateUserText}> Update Your Details </Text>
                        </View>

                        <View>
                            <Text style={this.styles.updateUserSmallText}> ID : {this.state.currentUserID} </Text>
                        </View>
                    </View>

                    <View style={GeneralStyles.registerFormWrapper}>

                        <View>
                            <TextInput style={GeneralStyles.input} onChangeText={firstName => this.setState({ firstName })} placeholder="First Name" />

                        </View>

                        <View>
                            <TextInput style={GeneralStyles.input} onChangeText={lastName => this.setState({ lastName })} placeholder="Last Name" />
                        </View>


                        <View>
                            <TextInput style={GeneralStyles.input} onChangeText={email => this.setState({ email })} placeholder="Email" value={this.state.origEmail} />

                        </View>
                        <View>
                            <TextInput style={GeneralStyles.input} onChangeText={password => this.setState({ password })}
                                secureTextEntry={!this.state.isSecureEntry} />

                            <TouchableOpacity
                                activeOpacity={0.8}
                                style={this.styles.visibilityButton}
                                onPress={this.managePasswordVisibility} >

                                <Image
                                    source={
                                        this.state.isSecureEntry
                                            ? require('../../assets/images/eye.png')
                                            : require('../../assets/images/hide.png')
                                    }
                                    style={this.styles.eyeIconImage}
                                />
                            </TouchableOpacity>
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


                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Pressable style={GeneralStyles.signUpButton} onPress={() => { this.updateUserInfo(); }} >
                                <Text style={GeneralStyles.signUpButtonText}>
                                    Update
                                </Text>
                            </Pressable>

                            <Pressable style={GeneralStyles.logoutButton} onPress={() => { this.logoutUser(); }} >
                                <Text style={GeneralStyles.signUpButtonText}>
                                    Logout
                                </Text>
                            </Pressable>
                        </View>
                    </View>








                </SafeAreaView>

            </View>
        );





    }
};

export default ProfileScreen;
