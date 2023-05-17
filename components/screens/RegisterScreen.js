import { Component } from 'react';
import { Text, TextInput, View, Image, Button, Alert, SafeAreaView, StyleSheet, Pressable } from 'react-native';
import { ActivityIndicator, TouchableOpacity } from 'react-native-web';
import colors from '../../assets/colors/colors';
import GeneralStyles from '../../styles/GeneralStyles';
import InputField from '../../helpers/InputValidator';
import * as EmailValidator from 'email-validator';
import PropTypes from 'prop-types';
import React from 'react';
import InputValidator from '../../helpers/InputValidator';
import Modal from "react-native-modal";

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
      showModal: false,
      isLoading: true,


    }

  }


  styles = StyleSheet.create({
    container: {
      backgroundColor: colors.mainAppScreens,
      flex: 1,
      alignItems: 'center',
      justifyContent: 'space-between',
      flexDirection: 'column',
    },


    createAccountImage: {
      width: 350,
      height: 150,
      alignSelf: 'flex-end',

    },

  });


  handleForname = (text) => {
    this.setState({ forename: text })

  }

  handleSurname = (text) => {
    this.setState({ surname: text })
  }




  handleRegistration = () => {

    if (!InputField.validName(this.state.forename)) {

      this.setState({ errorText: 'Please enter a First name' })
      this.setState({ showModal: true })
      return;
    }


    if (!InputField.validName(this.state.surname)) {
      this.setState({ errorText: 'Please enter a Last name' })
      this.setState({ showModal: true })

      return;
    }

    if (!InputField.isValidEmail(this.state.email)) {
      this.setState({ errorText: 'Invalid Email, try again' })
      this.setState({ showModal: true })

      return;
    }

    if (!InputField.isValidPassword(this.state.password)) {
      this.setState({
        errorText:
          "Password must contain: one number, at least one upper,lower,special, number, and at least 8 characters long)"
      })
      this.setState({ showModal: true })
      return;
    }


    else {

      this.addNewUser()

    }



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
        if (response.status === 201) {
          this.setState({ errorText: 'Successfully Created An Account' })
          this.setState({ showModal: true })
          setTimeout(() => { navigation.navigate('Login'),1000})
          
        }

        if (response.status === 400) {
          this.setState({ errorText: 'Email has already been taken, Try Again' })
          this.setState({ showModal: true })

        }

        else if (response.status === 500) {
          this.setState({ errorText: 'Something went Wrong, Try Again' })
          this.setState({ showModal: true })
        }



      })

      .catch((error) => {

        console.log(error)
      })


  }




  static get propTypes() {
    return {
      navigation: PropTypes.object.isRequired,
    };
  }

  makesModalVisible = () => {
    this.setState({ showModal: true })

    setTimeout(() => {
      this.setState({ showModal: false })
    }, 100);
  }


  componentDidMount() {
    this.unsubscribe = this.props.navigation.addListener('focus', () => {
      this.setState({ isLoading: false })
    });

  }

  componentWillUnmount() {
    this.unsubscribe();

  }





  render() {
    const navigation = this.props.navigation;


    if (this.state.isLoading) {
      return (<View>
        <ActivityIndicator size="large" />
      </View>)

    }

    else {
      return (
        <View style={this.styles.container}>
          <SafeAreaView>
            <View style={GeneralStyles.accountWrapper}>
              <Image
                source={require('../../assets/images/createAccount.png')}
                style={this.styles.createAccountImage}
              />
            </View>

            <View style={GeneralStyles.registerFormWrapper}>

              <View>
                <TextInput style={GeneralStyles.input} onChangeText={forename => this.setState({ forename })} placeholder="First Name" />

              </View>

              <View>
                <TextInput style={GeneralStyles.input} onChangeText={surname => this.setState({ surname })} placeholder="Last Name" />

              </View>

              <View>
                <TextInput style={GeneralStyles.input} onChangeText={email => this.setState({ email })} placeholder="Email" />

              </View>

              <View>

                <TextInput secureTextEntry={true} style={GeneralStyles.input}
                  onChangeText={password => this.setState({ password })}
                  placeholder="Password" />
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




          </SafeAreaView>

        </View>
      );
    }





  }
};

export default RegisterScreen;
