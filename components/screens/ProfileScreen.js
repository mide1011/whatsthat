import { Component, useState } from 'react';
import { Text, TextInput, View, Image, Button, Alert, SafeAreaView, StyleSheet, Pressable } from 'react-native';
import { ActivityIndicator, TouchableOpacity } from 'react-native-web';
import colors from '../../assets/colors/colors';
import HomeScreen from './HomeScreen';
import GeneralStyles from '../../styles/GeneralStyles';
import userLogin from '../../components/screens/RegisterScreen';
import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import InputValidator from '../../helpers/InputValidator';
import Modal from "react-native-modal";
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';

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

        }

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

            })

            .catch((error) => {
                console.log(error)

            })


    }


    componentDidMount() {
        // eslint-disable-next-line react/prop-types
        this.unsubscribe = this.props.navigation.addListener('focus', () => {
            this.loadUserInfo();
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

                        <Image
                            source={require('../../assets/images/blankPFP.png')}
                            style={this.styles.userPFP}
                        />
                        <View style={GeneralStyles.headerContent}>
                            <Text style={GeneralStyles.headerText}> {this.state.origFirstName} {" "}{this.state.origLastName} </Text>
                        </View>

                        <View>
                            <Text style={this.styles.updateUserText}> Update Your Details </Text>
                        </View>
                    </View>

                    <View style={GeneralStyles.registerFormWrapper}>

                        <View>
                            <TextInput style={this.styles.input} onChangeText={firstName => this.setState({ firstName })} placeholder="First Name" />

                        </View>

                        <View>
                            <TextInput style={this.styles.input} onChangeText={lastName => this.setState({ lastName })} placeholder="Last Name" />
                        </View>


                        <View>
                            <TextInput style={this.styles.input} onChangeText={email => this.setState({ email })} placeholder="Email" value={this.state.origEmail} />

                        </View>
                        <View>
                            <TextInput style={this.styles.input} onChangeText={password => this.setState({ password })}
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

                        <Pressable style={GeneralStyles.signUpButton} onPress={() => { this.updateUserInfo(); }} >
                            <Text style={GeneralStyles.signUpButtonText}>
                                Update
                            </Text>
                        </Pressable>






                    </View>




                </SafeAreaView>

            </View>
        );





    }
};

export default ProfileScreen;
