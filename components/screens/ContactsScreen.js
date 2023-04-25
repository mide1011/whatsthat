import { Component } from 'react';
import { Text, TextInput, View, Image, Button, Alert, SafeAreaView, StyleSheet, Pressable } from 'react-native';
import { ActivityIndicator, TouchableOpacity } from 'react-native-web';
import colors from '../../assets/colors/colors';
import HomeScreen from './HomeScreen';
import GeneralStyles from '../../styles/GeneralStyles';
import userLogin from '../../components/screens/RegisterScreen';



class ContactsScreen extends Component {

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
            backgroundColor: colors.mainAppScreens,
            flex: 1,

        },



        headerView: {

            height: 44,
            marginTop: 44,
            marginLeft: 16,
            marginRight: 16,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',

        },


        addContactsButton: {

            backgroundColor: '#2f323b',
            borderRadius: 10,
            // height: 40,
            // width: 100,
    
        
            // marginHorizontal: 20,
            // marginVertical: 10,
        
            paddingVertical: 12,
            paddingHorizontal: 32,


        },


        contactsText: {
            fontStyle: 'normal',
            fontSize: 16,
            lineHeight: 21,
            fontWeight: '500',
            letterSpacing: 0.25,
            color: 'white',
            textAlign: 'center',
            
        },



        searchBox: {
            height: 40,
            borderRadius: 10,
            width: 250,
            backgroundColor: '#FFFFFF',

        },

        plusImage: {

            alignSelf: 'baseline'

        },

    });





    render() {

        const navigation = this.props.navigation;


        return (
            <View style={this.styles.container}>
                <SafeAreaView>

                    <View style={this.styles.headerView}>

                        <View>
                            <TextInput style={this.styles.searchBox} placeholder="Email"
                            />
                        </View>
                        <Pressable style={this.styles.addContactsButton} onPress={() => { }} >
                            <Text style={this.styles.contactsText}>
                                ADD
                            </Text>
                        </Pressable>


                    </View>

                    {/* 
                    <Text>
                        View Contacts
                        Add Contacts
                        Remove Contacts
                        view blocked users
                        block a user
                        unblock a user

                    </Text> */}







                </SafeAreaView>

            </View>
        );





    }
};

export default ContactsScreen;
