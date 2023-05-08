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

    height: 50,
    margin: 12,
    borderWidth: 0.1,
    borderRadius: 17,
    width: 305,
    fontWeight: '100',
    fontSize: 14,
  },


  searchBox: {
    width: '90%',
    height: 60,
    paddingHorizontal: 10,
    backgroundColor: colors.tabBarTheme,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: colors.greenBars,
    margin: 22,
    marginRight: 5,
    marginTop: 10,

  },


  searchText:
  {
    padding: 5,
    color: 'black',
    marginTop: 5,
    margin: 30,
    fontSize: 15,
    fontWeight: 'bold',
    textAlign: 'center',

  },


  chatInfoText:
  {
 
    padding: 5,
    color: 'black',
    marginBottom: 65,
    fontSize: 15,
    fontWeight: 'bold',
    textAlign: 'center',
    marginLeft: 40,
    

  },

  textFailed: {
    alignSelf: 'center',
    color: 'red',
    fontSize: 12,
  },


  headerText:
  {
    padding: 5,
    color: 'black',
    marginTop: 0,
    margin: 40,
    marginBottom: 0,
    fontSize: 20,
    color: colors.darkText,
    fontWeight: 'bold',
    textAlign: 'center',
  },


  headerWrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 50,
    paddingBottom: 30,
  },

  headerContent:
  {

    flexDirection: "row",
    alignItems: "center",

  },

  contactsWrapper: {

    marginTop: 12,
    padding: 8,
    backgroundColor: '#cbf7d3',
    width: '100%',
    height: 55,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderRadius: 35,
  },







  iconSpacing: {
    marginRight: 10,
    alignItems: 'center',
    flexDirection: 'row',

  },

  profilePicture: {
    alignItems: 'center',
    width: 60,
    height: 60,
    borderRadius: 30,
  },


  profileContainer: {
    flexGrow: 1,
    backgroundColor: colors.mainAppScreens,
    paddingHorizontal: 30,
    width: '100%',
    height: '100%',
    marginBottom: '35%'
  },

  mainAppContainer: {


    flex: 1,
    backgroundColor: colors.mainAppScreens,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'column',


  }









})