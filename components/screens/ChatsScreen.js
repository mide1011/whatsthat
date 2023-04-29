import { Component } from 'react';
import { Text, TextInput, View, Image, Button, Alert, SafeAreaView, StyleSheet, Pressable } from 'react-native';
import { ActivityIndicator, TouchableOpacity } from 'react-native-web';
import colors from '../../assets/colors/colors';
import HomeScreen from './HomeScreen';
import GeneralStyles from '../../styles/GeneralStyles';
import userLogin from '../../components/screens/RegisterScreen';
import * as Font from 'expo-font';
import AsyncStorage from '@react-native-async-storage/async-storage';




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

        searchBox: {
            height: 40,
            marginTop: 12,
            borderWidth: 0.1,
            borderRadius: 10,
            width: 305,
            backgroundColor: '#FFFFFF',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'flex-start',

        },

        headerContactsWrapper: {
            height: 41,
            marginTop: 12,
            marginLeft: 16,
            marginRight: 34,
            alignItems: 'flex-start',
            justifyContent: 'center',
            paddingTop: 100,


        },

        headerContacts: {
            fontFamily: 'SFProDisplay-Bold',
            fontSize: 34,
            color: colors.darkText,
            lineHeight: 41,

        },

    });

    componentDidMount() {
        this.unsubsribe = this.props.navigation.addListener('focus', () => {
            this.checkLoggedIn();
        });
    }

    componentWillUnmount() {
        this.unsubsribe();
    }

    checkLoggedIn = async () => {

        const value = await AsyncStorage.getItem("sessionToken");
        if (value == null) {
            this.props.navigation.navigate('Login');
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

                        <View style={this.styles.headerContactsWrapper}>
                            <Text style={this.styles.headerContacts}>
                                Chats
                            </Text>
                            <View>
                                <TextInput style={this.styles.searchBox} placeholder="Search"
                                />
                            </View>
                        </View>



                    </SafeAreaView>

                </View>
            );

        }






    }
};

export default ChatsScreen;
