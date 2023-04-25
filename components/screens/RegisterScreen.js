import { Component } from 'react';
import { Text, TextInput, View, Image, Button, Alert, SafeAreaView, StyleSheet, Pressable } from 'react-native';
import { ActivityIndicator, TouchableOpacity } from 'react-native-web';
import colors from '../../assets/colors/colors';
import HomeScreen from './HomeScreen';
import GeneralStyles from '../../styles/GeneralStyles';
import InputField from '../../helpers/InputValidator';
import * as EmailValidator from 'email-validator';



class RegisterScreen extends Component {

  constructor(props) {
    super(props);

    this.state = {

      forename: '',
      surname: '',
      email: '',
      password: '',
      errorText: "",
      invalidEmail: false,
      invalidPassword: false,
      invalidFirstName: false,
      invalidLastName: false,


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

    createAccountImage: {
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


  handleForname = (text) => {
    this.setState({ forename: text })

  }

  handleSurname = (text) => {
    this.setState({ surname: text })
  }




  handleRegistration = () => {

    const PASSWORD_REGEX = new RegExp("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$")
    const NAME_REGEX = /^[a-z ,.'-]+$/i;


    if (!NAME_REGEX.test(this.state.forename)) {
      this.setState({ invalidFirstName: true })
      this.setState({ errorText: 'Please enter a First name' })
      return;
    }


    else {
      this.setState({ invalidFirstName: false })
    }

    if (!NAME_REGEX.test(this.state.surname)) {
      this.setState({ invalidLastName: true })
      this.setState({ errorText: 'Please enter a Last name' })
      return;
    }

    else {
      this.setState({ invalidLastName: false })
    }



    if (!EmailValidator.validate(this.state.email)) {
      this.setState({ invalidEmail: true })
      this.setState({ errorText: 'Invalid Email, try again' })
      return;
    }

    else {
      this.setState({ invalidEmail: false })
    }


    if (!PASSWORD_REGEX.test(this.state.password)) {
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


    this.addNewUser()

  }



  addNewUser = () => {
    const navigation = this.props.navigation;

    let to_send = {

      first_name: this.state.forename,
      last_name: this.state.surname,
      email: this.state.email,
      password: this.state.password,


    };

    return fetch("http://localhost:3333/api/1.0.0/user", {

      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },

      body: JSON.stringify(to_send)

    })

      .then((response) => {

        console.log(response.status);
        if (response.status === 400) {
          this.setState({ invalidEmail: true });
          this.setState({ errorText: 'Email has already been taken' })
        }

        else if (response.status === 500) {
          this.setState({ errorText: 'Try Again' })
        }

        else {
          this.setState({ isValidEmail: true });
          setTimeout(() => { this.props.navigation.navigate('Login') })
        }

      })

      .catch((error) => {

        console.log(error)
      })


  }





  render() {
    const navigation = this.props.navigation;

    return (
      <View style={this.styles.container}>
        <SafeAreaView>
          <View style={this.styles.createAccountWrapper}>
            <Image
              source={require('../../assets/images/createAccount.png')}
              style={this.styles.createAccountImage}
            />
          </View>

          <View style={GeneralStyles.registerFormWrapper}>

            <View>
              <TextInput style={GeneralStyles.inputFieldBox} onChangeText={forename => this.setState({ forename })} placeholder="First Name" />
              {this.state.invalidFirstName ? (
                <Text style={this.styles.textFailed}>{this.state.errorText}</Text>
              ) : (
                <Text style={this.styles.textFailed}> </Text>
              )}
            </View>

            <View>
              <TextInput style={GeneralStyles.inputFieldBox} onChangeText={surname => this.setState({ surname })} placeholder="Last Name" />
              {this.state.invalidLastName ? (
                <Text style={this.styles.textFailed}>{this.state.errorText}</Text>
              ) : (
                <Text style={this.styles.textFailed}> </Text>
              )}
            </View>

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
                Already have an account?
              </Text>
              <Pressable onPress={() => navigation.navigate('Login')}>
                <Text style={{ fontWeight: '600', color: colors.greenBars }}> Log in</Text>
              </Pressable>


            </View>

            <Pressable style={GeneralStyles.signUpButton} onPress={() => { this.handleRegistration(); }} >
              <Text style={GeneralStyles.signUpButtonText}>
                Create Account
              </Text>
            </Pressable>
          </View>




        </SafeAreaView>

      </View>
    );








  }
};

export default RegisterScreen;
