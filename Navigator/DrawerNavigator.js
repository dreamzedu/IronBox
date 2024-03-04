// Example of Splash, Login and Sign Up in React Native
// https://aboutreact.com/react-native-login-and-signup/

// Import React
import React from 'react';

// Import Navigators from React Navigation

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

// Import Screens
import BottomTabNavigator from './BottomTabNavigator';
import SettingsScreen from '../Screens/DrawerScreens/SettingScreen';
import CustomSidebarMenu from '../Screens/Components/CustomSidebarMenu';
import NavigationDrawerHeader from '../Screens/Components/NavigationDrawerHeader';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

const HomeScreenStack = ({navigation}) => {
  return (
      <Stack.Navigator initialRouteName="TabNavigator" screenOptions={{ headerShown: false }}>
      <Stack.Screen
              name="TabNavigator"
              component={BottomTabNavigator}
        options={{
          title: 'Home', //Set Header Title
          headerLeft: () => (
           <NavigationDrawerHeader navigationProps={navigation} />
          ),
            headerStyle: {
                backgroundColor: '#f4511e',//'#307ecc', //Set Header color
            },
            headerTintColor: '#fff', //Set Header text color
            headerTitleStyle: {
                fontWeight: 'bold', //Set Header text style
            },
        }}
          />


    </Stack.Navigator>
  );
};

const SettingScreenStack = ({navigation}) => {
  return (
    <Stack.Navigator
          initialRouteName="SettingsScreen" screenOptions={{ headerShown: true, 
       headerLeft: () => (
          <NavigationDrawerHeader navigationProps={navigation} />
        ),
        headerStyle: {
            backgroundColor: '#f4511e',//'#307ecc', //Set Header color
        },
        headerTintColor: '#fff', //Set Header text color
        headerTitleStyle: {
          fontWeight: 'bold', //Set Header text style
        },
      }}>
      <Stack.Screen
        name="SettingsScreen"
        component={SettingsScreen}
        options={{
          title: 'Settings', //Set Header Title
        }}
      />
    </Stack.Navigator>
  );
};

const DrawerNavigator = (props) => {
  return (
    <Drawer.Navigator
     
          screenOptions={{
              headerShown: true,
              //headerStyle: {
              //    backgroundColor: '#f4511e', //Set Header color
              //},
              //headerTintColor: '#fff', //Set Header text color
          }}
          drawerContent={CustomSidebarMenu}
      >
      <Drawer.Screen
        name="Home"
        options={{drawerLabel: 'Home Screen'}}
              component={HomeScreenStack}
      />
      <Drawer.Screen
              name="Setting"
        options={{drawerLabel: 'Setting Screen'}}
              component={SettingScreenStack}
      />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
