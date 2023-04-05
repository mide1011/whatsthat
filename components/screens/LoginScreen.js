import { Component } from 'react';
import { Text, TextInput, View, Image, Button, Alert, SafeAreaView, StyleSheet, Pressable } from 'react-native';
import { ActivityIndicator, TouchableOpacity } from 'react-native-web';
import colors from '../../assets/colors/colors';
import HomeScreen from './HomeScreen';
import GeneralStyles from '../../styles/GeneralStyles';
import userLogin from '../../components/screens/RegisterScreen';



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




    handleEmailInput = (text) => {

        if (!this.checkValidEmail(text)) {
            this.setState({ email: text });
        }

    }

    handlePasswordInput = (text) => {

        if (!this.checkValidPassword(text)) {
            this.setState({ password: text });

        }

    }

    handleLogin = () => {

        const checkEmail = this.checkValidEmail(this.state.email);
        const checkPassword = this.isValidPassword(this.state.password);

        if (checkEmail && checkPassword) {
         this.loginUser();
        }


    }

    checkValidEmail = (userEmail) => {
        const re = /^\S+@\S+\.\S+$/;
        const regex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;

        if (re.test(userEmail) || regex.test(userEmail)) {
            this.setState({ isValidEmail: false });
        }
        else {
            this.setState({ isValidEmail: true });
        }

        return this.state.isValidEmail;

    }


    checkValidPassword = (text) => {
        const isContainsUppercase = /^(?=.*[A-Z]).*$/;
        const isContainsLowercase = /^(?=.*[a-z]).*$/;
        const isContainsNumber = /^(?=.*[0-9]).*$/;
        const isValidLength = /^.{8,16}$/;
        const isNonWhiteSpace = /^\S*$/;


        if (!isContainsUppercase.test(text)) {
            this.setState({ isValidPassword: true })
            this.setState({ errorText: 'Your password must contain a capital letter' })

        }
        else if (!isContainsLowercase.test(text)) {
            this.setState({ isValidPassword: true })
            this.setState({ errorText: 'Your password must contain a lowercase letter' })
        }

        else if (!isContainsNumber.test(text)) {
            this.setState({ isValidPassword: true })
            this.setState({ errorText: 'Your password must contain a number' })
        }
        else if (!isValidLength.test(text)) {
            this.setState({ isValidPassword: true })
            this.setState({ errorText: 'Your password must be [8-16] characters long' })
        }

        else if (!isNonWhiteSpace.test(text)) {
            this.setState({ isValidPassword: true })
            this.setState({ errorText: 'Your password must be not have a whitespace' })
        }


        else {
            this.setState({ isValidPassword: false })
        }

        return this.state.isValidPassword;
    };




    loginUser = () => {

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

              if(response.status === 201){
                return response.json();
              }

              else if(response.status===400){

                
              }

            })

            .catch((error) => {

                console.log(error)
            })


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
                                <TextInput style={GeneralStyles.inputFieldBox} onChangeText={(text) => this.handleEmailInput(text)} placeholder="Email"
                                />
                                {this.state.isValidEmail ? (
                                    <Text style={this.styles.textFailed}>Please enter a valid email</Text>
                                ) : (
                                    <Text style={this.styles.textFailed}> </Text>
                                )}

                            </View>

                            <View>

                                <TextInput secureTextEntry={this.state.hidePassword} style={GeneralStyles.inputFieldBox}
                                    onChangeText={(text) => this.handlePasswordInput(text)}
                                    placeholder="Password" />

                                {this.state.isValidPassword ? (
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

                            <Pressable style={GeneralStyles.signUpButton} onPress={() => { navigation.navigate('ProfileScreen') }} >
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
