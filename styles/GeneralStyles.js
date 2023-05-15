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


  logoutButton: {

    backgroundColor: '#D80026',
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


  sendInput: {

  },


  searchBox: {
    width: '90%',
    height: 60,
    paddingHorizontal: 10,
    backgroundColor: colors.mainTheme,
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



  infoText:
  {

    padding: 5,
    color: 'black',
    fontSize: 15,
    fontWeight: 'bold',
    textAlign: 'center',
    margin: 5,


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


  chatHeaderText:
  {

    color: 'black',
    fontSize: 18,
    color: colors.darkText,
    fontWeight: 'bold',
    flexDirection: "row",
    alignItems: "center",
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



  chatContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    padding: 10,


  },

  leftContainer: {
    flexDirection: 'row',
  },

  midContainer: {
    justifyContent: 'space-around',
  },

  avatar: {
    width: 60,
    height: 60,
    borderRadius: 50,
    marginRight: 10,
  },


  contactsWrapper: {

    marginTop: 12,
    padding: 10,
    backgroundColor: colors.mainTheme,
    width: '100%',
    height: 55,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderRadius: 35,
  },


  chatWrapper: {

    marginTop: 12,
    padding: 8,
    backgroundColor: colors.mainTheme,
    width: '100%',
    height: 55,
    flexDirection: 'row',
    justifyContent: 'flex-start',
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
    backgroundColor: colors.background,
    paddingHorizontal: 30,
    width: '100%',
    height: '100%',
    marginBottom: '35%'
  },

  mainAppContainer: {


    flex: 1,
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'column',


  }









})