import { Component } from 'react';
import { Text, TextInput, View, Image, Button, Alert, SafeAreaView, StyleSheet, Pressable } from 'react-native';
import { ActivityIndicator, TouchableOpacity } from 'react-native-web';
import colors from '../../assets/colors/colors';
import HomeScreen from './HomeScreen';
import GeneralStyles from '../../styles/GeneralStyles';
import userLogin from '../../components/screens/RegisterScreen';



class ChatsScreen extends Component {

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

        chatsImage: {
            width: 350,
            height: 58,
            alignSelf: 'flex-end',

        },


        textFailed: {
            alignSelf: 'center',
            color: 'red',
            fontSize: 12,


        },

    });





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

                        







                    </SafeAreaView>

                </View>
            );

        }






    }
};

export default ChatsScreen;
