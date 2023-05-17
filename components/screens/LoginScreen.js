import { Component } from 'react';
import { Text, TextInput, View, Image, Button, Alert, SafeAreaView, StyleSheet, Pressable } from 'react-native';
import { ActivityIndicator, TouchableOpacity } from 'react-native-web';
import colors from '../../assets/colors/colors';
import GeneralStyles from '../../styles/GeneralStyles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import InputValidator from '../../helpers/InputValidator';
import PropTypes from 'prop-types';
import React from 'react';
import Modal from "react-native-modal";

class LoginScreen extends Component {



    constructor(props) {
        super(props);

        this.state = {

            email: '',
            password: '',
            errorText: '',
            isValidEmail: false,
            isValidPassword: null,
            hidePassword: true,
            invalidEmail: false,
            invalidPassword: false,
            showModal: false,
            isLoading: true,
        }

    }

    static get propTypes() {
        return {
            navigation: PropTypes.object.isRequired,
        };
    }




    styles = StyleSheet.create({
        container: {
            backgroundColor: colors.mainAppScreens,
            flex: 1,
            alignItems: 'center',
            justifyContent: 'space-between',
            flexDirection: 'column',
        },


        loginImage: {
            width: 350,
            height: 150,
            alignSelf: 'flex-end',

        },

    });



    handleLogin = () => {


        if (!InputValidator.isValidEmail(this.state.email)) {

            this.setState({ errorText: 'Invalid Email, try again' })
            this.setState({ showModal: true })
            return;

        }


        if (!InputValidator.isValidPassword(this.state.password)) {
            this.setState({
                errorText: "Password must contain:" + " one number, at least one upper " +
                    "lower,special, number, and at least 8 characters long)"
            })

            this.setState({ showModal: true })
            return;
        }


        else {
            this.setState({ email: '' })
            this.setState({ password: '' })

            this.loginUser()

        }


    }


    async loginUser() {

        const navigation = this.props.navigation;


        let to_send = {
            email: this.state.email,
            password: this.state.password,


        };

        return fetch("http://localhost:3333/api/1.0.0/login", {

            method: 'PoST',
            headers: {
                'Content-Type': 'application/json'
            },

            body: JSON.stringify(to_send)

        })

            .then((response) => {

                if (response.status == 200) {
                    this.setState({ errorText: 'Sucessfully Logged In' })
                    this.setState({ showModal: true })
                    return response.json()
                }

                else if (response.status == 400) {
                    this.setState({ errorText: 'Email/password may not exist, Try Again' })
                    this.setState({ showModal: true })
                }

                else if (response.status == 500) {
                    this.setState({ errorText: 'Try Again' })
                    this.setState({ showModal: true })
                }


            })

            .then(async (user) => {
                console.log(user)

                try {
                    await AsyncStorage.setItem("userID", user.id)
                    await AsyncStorage.setItem("sessionToken", user.token)
                    navigation.navigate('ProfileScreen')

                } catch (error) {
                    console.log(error)
                }


            })


    }

    componentDidMount() {
        this.unsubscribe = this.props.navigation.addListener('focus', () => {
            this.setState({ isLoading: false })
            this.checkLoggedIn();

        });
    }

    componentWillUnmount() {
        this.unsubscribe();
    }

    checkLoggedIn = async () => {
        const navigation = this.props.navigation;
        const value = await AsyncStorage.getItem("sessionToken");
        if (value != null) {
            setTimeout(() => { navigation.navigate('ProfileScreen') })
        }
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
            return (

                <View>
                    <ActivityIndicator />
                </View>

            );

        }

        else {
            return (
                <View style={this.styles.container}>
                    <SafeAreaView>
                        <View style={GeneralStyles.accountWrapper}>
                            <Image
                                source={require('../../assets/images/loginImg.png')}
                                style={this.styles.loginImage}
                            />
                        </View>

                        <View style={GeneralStyles.registerFormWrapper}>


                            <View>
                                <TextInput style={GeneralStyles.input} value={this.state.email} onChangeText={email => this.setState({ email })} placeholder="Email" />
                            </View>

                            <View>

                                <TextInput secureTextEntry={true} style={GeneralStyles.input}
                                    value={this.state.password} onChangeText={password => this.setState({ password })}
                                    placeholder="Password" />
                            </View>


                        </View>

                        <View style={GeneralStyles.signUpWrapper}>
                            <View style={GeneralStyles.homeScreenTextWrapper}>
                                <Text style={GeneralStyles.homeScreenText}>
                                    Want to create an account?
                                </Text>
                                <Pressable onPress={() => navigation.navigate('Register')}>
                                    <Text style={{ fontWeight: '600', color: colors.greenBars }}> Click to Register</Text>
                                </Pressable>


                            </View>

                            <Pressable style={GeneralStyles.signUpButton} onPress={() => { this.handleLogin(); }} >
                                <Text style={GeneralStyles.signUpButtonText}>
                                    Login
                                </Text>
                            </Pressable>
                        </View>

                        <View style={GeneralStyles.modalCenteredView}>
                            <Modal transparent={true} animationType="fade" isVisible={this.state.showModal}>

                                <View style={GeneralStyles.modalCenteredView}>
                                    <View style={GeneralStyles.modalView}>

                                        <View style={{ alignItems: 'center' }}>
                                            <View style={GeneralStyles.modalHead}>
                                                <Text style={GeneralStyles.modalText} onPress={this.makesModalVisible}>{this.state.errorText} </Text>

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





                    </SafeAreaView>

                </View>
            );

        }






    }
};

export default LoginScreen;
