import { Component } from 'react';
import { Text, TextInput, View, Image, Button, Alert, SafeAreaView, StyleSheet, Pressable } from 'react-native';
import { ActivityIndicator, TouchableOpacity } from 'react-native-web';
import colors from '../assets/colors/colors';
import HomeScreen from '../components/screens/HomeScreen';
import GeneralStyles from '../styles/GeneralStyles';




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


    
      









};
export default InputField;







