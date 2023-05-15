import { Component } from 'react';
import { Text, TextInput, View, Image, Button, Alert, SafeAreaView, StyleSheet, Pressable } from 'react-native';
import { ActivityIndicator, TouchableOpacity } from 'react-native-web';
import colors from '../../assets/colors/colors';
import HomeScreen from './HomeScreen';
import GeneralStyles from '../../styles/GeneralStyles';
import userLogin from '../../components/screens/RegisterScreen';
import * as EmailValidator from 'email-validator';
import AsyncStorage from '@react-native-async-storage/async-storage';
import InputValidator from '../../helpers/InputValidator';
import PropTypes from 'prop-types';
import React from 'react';


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

        createAccountWrapper: {
            paddingTop: 60,
            paddingLeft: 53,
            paddingRight: 38,


        },

        loginImage: {
            width: 350,
            height: 150,
            alignSelf: 'flex-end',

        },


        textFailed: {
            alignSelf: 'center',
            color: 'red',
            fontSize: 12,


        },

    });

   


    handleLogin = () => {

       
        if(!InputValidator.isValidEmail(this.state.email)){
            this.setState({ invalidEmail: true })
                this.setState({ errorText: 'Invalid Email, try again' })
                return;

        }


         else {
            this.setState({ invalidEmail: false })
        }


        
        if (!InputValidator.isValidPassword(this.state.password)) {
            this.setState({ invalidPassword: true })
            this.setState({
                errorText: "Password must contain: one number, at least one upper" + ' \n' +
                    "lower,special, number, and at least 8 characters long)"
            })
            return;
        }

        else {
            this.setState({ invalidPassword: false })
        }



        this.loginUser()

    }


    async loginUser() {

        const navigation = this.props.navigation;


        let to_send = {
            email: this.state.email,
            password: this.state.password,


        };

        return fetch("http://localhost:3333/api/1.0.0/login", {

            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },

            body: JSON.stringify(to_send)

        })

            .then((response) => {

                if(response.status == 200){

                    return response.json()

                }

                else if (response.status == 400) {
                    this.setState({ invalidPassword: true });
                    this.setState({ errorText: 'Invalid email/password supplied, Try Again' })
                }

                else if (response.status == 500) {
                    this.setState({ errorText: 'Try Again' })
                }

                else {

                    this.setState({ isValidPassword: true });
                    
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
                        <View style={this.styles.createAccountWrapper}>
                            <Image
                                source={require('../../assets/images/loginImg.png')}
                                style={this.styles.loginImage}
                            />
                        </View>

                        <View style={GeneralStyles.registerFormWrapper}>


                            <View>
                                <TextInput style={GeneralStyles.inputFieldBox} onChangeText={email => this.setState({ email })} placeholder="Email" />
                                {this.state.invalidEmail ? (
                                    <Text style={this.styles.textFailed}>{this.state.errorText}</Text>
                                ) : (
                                    <Text style={this.styles.textFailed}> </Text>
                                )}
                            </View>

                            <View>

                                <TextInput secureTextEntry={true} style={GeneralStyles.inputFieldBox}
                                    onChangeText={password => this.setState({ password })}
                                    placeholder="Password" />
                            </View>

                            <View>
                                {this.state.invalidPassword ? (
                                    <Text style={this.styles.textFailed}> {this.state.errorText}</Text>
                                ) : (
                                    <Text style={this.styles.textFailed}> </Text>
                                )}
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



                    </SafeAreaView>

                </View>
            );

        }






    }
};

export default LoginScreen;
