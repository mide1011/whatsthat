import { StyleSheet } from "react-native-web";
import colors from "../assets/colors/colors";


export default StyleSheet.create({

  homeScreenTextWrapper: {
    marginTop: 80,
    marginHorizontal: 49,
    flexDirection: 'row',

  },

  homeScreenText: {
    fontSize: 14,
    fontWeight: '200',
    color: colors.darkText,
    flexDirection: 'row',

  },


  signUpWrapper: {
    justifyContent: 'center',
    alignItems: 'center',

  },


  signUpButton: {

    backgroundColor: colors.greenBars,
    borderRadius: 103,
    height: 48,

    marginHorizontal: 20,
    marginVertical: 10,

    paddingVertical: 12,
    paddingHorizontal: 32,

  },

  signUpButtonText: {
    fontStyle: 'normal',
    fontSize: 16,
    lineHeight: 21,
    fontWeight: '500',
    letterSpacing: 0.25,
    color: 'white',
  },



  registerFormWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 77,


  },

  inputFieldText: {
    fontStyle: 'normal',
    fontWeight: '600',
    fontSize: 17,
    lineHeight: 26,
    color: colors.darkText,
    paddingRight: 200,


  },

  inputFieldBox: {

    height: 40,
    margin: 12,
    borderWidth: 0.1,
    borderRadius: 17,
    width: 305,
    fontWeight: '100',
    fontSize: 14,
  },






 

})