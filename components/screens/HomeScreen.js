import { Component } from 'react';
import { Text, TextInput, View, Image, Button, Alert, SafeAreaView, StyleSheet, Pressable } from 'react-native';
import { TouchableOpacity } from 'react-native-web';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/Feather';
import colors from '../../assets/colors/colors';
// import LoginScreen from './RegisterScreen';
import GeneralStyles from '../../styles/GeneralStyles';




class HomeScreen extends Component {

  constructor(props) {
    super(props);

  }



  styles = StyleSheet.create({
    container: {
      backgroundColor: '#DEF2E7',
      flex: 1,
      alignItems: 'center',
      justifyContent: 'space-between',
      flexDirection: 'column',
    },

    logoWrapper: {
      paddingTop: 173,
    },

    asbstractWrapper: {
      paddingTop: 61,
    },

    logoImage: {
      width: 317,
      height: 67,
      alignSelf: 'flex-end',

    },

    abstractImage: {
      width: 311,
      height: 244,
    },



  });

  render() {

    const navigation = this.props.navigation;
    return (
      <View style={this.styles.container}>
        <SafeAreaView>
          <View style={this.styles.logoWrapper}>
            <Image
              source={require('../../assets/images/whatsthatLogo.png')}
              style={this.styles.logoImage}
            />
          </View>
          <View style={this.styles.asbstractWrapper}>
            <Image
              source={require('../../assets/images/abstract.png')}
              style={this.styles.abstractImage}
            />

          </View>

          <View style={GeneralStyles.signUpWrapper}>
            <View style={GeneralStyles.homeScreenTextWrapper}>
              <Text style={GeneralStyles.homeScreenText}>
                Already have an account?
              </Text>
              <TouchableOpacity onPress={() =>  navigation.push('Login')}>
                <Text style={{ fontWeight: '600', color: colors.greenBars }}> Log in</Text>
              </TouchableOpacity>


            </View>

            <Pressable style={GeneralStyles.signUpButton} onPress={() => navigation.push('Register')}>
              <Text style={GeneralStyles.signUpButtonText}>
                Sign up with email
              </Text>
            </Pressable>
          </View>


        </SafeAreaView>

      </View>
    );

  }
};

export default HomeScreen;
