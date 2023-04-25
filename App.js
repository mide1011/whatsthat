import { Component } from 'react';
import { Text, TextInput, View, Button, Alert, SafeAreaView, StyleSheet, Settings } from 'react-native';
import { TouchableOpacity } from 'react-native-web';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons, Feather, Ionicons } from '@expo/vector-icons'
import HomeScreen from './components/screens/HomeScreen';
import RegisterScreen from './components/screens/RegisterScreen';
import LoginScreen from './components/screens/LoginScreen';
import ProfileScreen from './components/screens/ProfileScreen';
import ChatsScreen from './components/screens/ChatsScreen';
import ContactsScreen from './components/screens/ContactsScreen';
import SettingsScreen from './components/screens/ChatsScreen';





const Stack = createNativeStackNavigator();
const Tabs = createBottomTabNavigator();
const ChatsStack = createNativeStackNavigator
const ProfileStack = createNativeStackNavigator





const TabsStackScreen = () => (


  <Tabs.Navigator initialRouteName='Contacts' screenOptions={{ headerShown: false }}>
    <Tabs.Screen name="Chats"
      component={ChatsScreen}
      options={{
        title: 'Chats', tabBarIcon: ({ size, color }) => (<MaterialCommunityIcons name='chat'
          size={size} color={color} />)

      }}
    />


    <Tabs.Screen name="Profile"
      component={ProfileScreen}
      options={{
        title: 'Profile', tabBarIcon: ({ size, color }) => (<MaterialCommunityIcons name='account'
          size={size} color={color} />)

      }}
    />

    <Tabs.Screen name="Contacts"
      component={ContactsScreen}
      options={{
        title: 'Contacts', tabBarIcon: ({ size, color }) => (<Ionicons name='people'
          size={size} color={color} />)

      }}
    />


    <Tabs.Screen name="Settings"
      component={SettingsScreen}
      options={{
        title: 'Settings', tabBarIcon: ({ size, color }) => (<Feather name='settings'
          size={size} color={color} />)

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
