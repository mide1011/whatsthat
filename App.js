import { Component } from 'react';
import { View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons, Feather, Ionicons } from '@expo/vector-icons';
import HomeScreen from './components/screens/HomeScreen';
import RegisterScreen from './components/screens/RegisterScreen';
import LoginScreen from './components/screens/LoginScreen';
import ProfileScreen from './components/screens/ProfileScreen';
import ChatsScreen from './components/screens/ChatsScreen';
import ContactsScreen from './components/screens/ContactsScreen';
import SettingsScreen from './components/screens/SettingsScreen';
import colors from './assets/colors/colors';
import React from 'react';
const Stack = createNativeStackNavigator();
const Tabs = createBottomTabNavigator();


const TabsStackScreen = () => (

  <Tabs.Navigator initialRouteName='Contacts' screenOptions={{
    headerShown: false, tabBarShowLabel: false,

    tabBarStyle: {
      position: "absolute",
      bottom: 25,
      left: 20,
      right: 20,
      backgroundColor: colors.tabBarTheme,
      borderRadius: 15,
      height: 90,

    }


  }}>


    <Tabs.Screen name='Chats' component={ChatsScreen}
      options={{

        tabBarIcon: ({ focused }) => {

          return (
            <View style={{ alignItems: 'center', justifyContent: 'center', top: 10 }}>
              <MaterialCommunityIcons name='chat' size={30} color={focused ? '#36942b' : '#808080'} />
            </View>

          );

        }

      }}
    />

    <Tabs.Screen name='Contacts' component={ContactsScreen}
      options={{
        tabBarIcon: ({ focused }) => {

          return (
            <View style={{ alignItems: 'center', justifyContent: 'center', top: 10 }}>
              <Ionicons name='people' size={30} color={focused ? '#36942b' : '#808080'} />
            </View>

          );

        }

      }}
    />

    <Tabs.Screen name='Profile' component={ProfileScreen}
      options={{
        tabBarIcon: ({ focused }) => {

          return (
            <View style={{ alignItems: 'center', justifyContent: 'center', top: 10 }}>
              <MaterialCommunityIcons name='account' size={30} color={focused ? '#36942b' : '#808080'} />
            </View>

          );

        }

      }}
    />



    <Tabs.Screen name='Settings' component={SettingsScreen}
      options={{
        tabBarIcon: ({ focused }) => {

          return (
            <View style={{ alignItems: 'center', justifyContent: 'center', top: 10 }}>
              <Feather name='settings' size={30} color={focused ? '#36942b' : '#808080'} />
            </View>

          );

        }

      }}
    />

  </Tabs.Navigator>


)



class App extends Component {

  constructor(props) {
    super(props);

  }



  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName='Login' >
          <Stack.Screen
            name="Home" component={HomeScreen} options={{ headerShown: false }} />
          <Stack.Screen
            name="Register" component={RegisterScreen} options={{ headerShown: false }} />
          <Stack.Screen
            name="Login" component={LoginScreen} options={{ headerShown: false }} />

          <Stack.Screen
            name="ProfileScreen" component={TabsStackScreen} options={{ headerShown: false }} />
        </Stack.Navigator>


      </NavigationContainer>
    );







  }

};

export default App;
