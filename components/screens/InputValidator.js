import { Component } from 'react';
import { Text, TextInput, View, Image, Button, Alert, SafeAreaView, StyleSheet, Pressable } from 'react-native';
import { ActivityIndicator, TouchableOpacity } from 'react-native-web';
import colors from '../../assets/colors/colors';
import HomeScreen from './HomeScreen';
import GeneralStyles from '../../styles/GeneralStyles';




class InputField extends Component {


    constructor(props) {
        super(props);

        this.state = {
 
            email: '',
            password: '',
            errorText: '',
            isValidEmail: false,
            isValidPassword: null,
            hidePassword: true,
            isValidInput: false,
        }

    }

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
    
    
        else if (!isNonWhiteSpace.test(text)) {
          this.setState({ isValidPassword: true })
          this.setState({ errorText: 'Your password must be not have a whitespace' })
        }
    
    
        else {
          this.setState({ isValidPassword: false })
        }
    
        return this.state.isValidPassword;
      };
      









};
export default InputField;







