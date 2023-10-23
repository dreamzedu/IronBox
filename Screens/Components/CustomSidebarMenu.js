// Example of Splash, Login and Sign Up in React Native
// https://aboutreact.com/react-native-login-and-signup/

// Import React and Component
import React, { useContext } from 'react';
import { View, Text, Alert, StyleSheet} from 'react-native';
import AuthGlobal from "../../Context/store/AuthGlobal"
import { logoutUser } from "../../Context/actions/Auth.actions"

import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';


const CustomSidebarMenu = (props) => {
    const context = useContext(AuthGlobal)

  return (
    <View style={stylesSidebar.sideMenuContainer}>
      <View style={stylesSidebar.profileHeader}>
        <View style={stylesSidebar.profileHeaderPicCircle}>
          <Text style={{fontSize: 25, color: '#307ecc'}}>
            {'About React'.charAt(0)}
          </Text>
        </View>
        <Text style={stylesSidebar.profileHeaderText}>AboutReact</Text>
      </View>
      <View style={stylesSidebar.profileHeaderLine} />

      <DrawerContentScrollView {...props}>
              <DrawerItemList {...props} />
              {context.stateUser.isAuthenticated ?
                  <DrawerItem
                      label={({ color }) => <Text style={{ color: '#d8d8d8' }}>Logout</Text>}
                      onPress={() => {
                          props.navigation.toggleDrawer();
                          Alert.alert(
                              'Logout',
                              'Are you sure? You want to logout?',
                              [
                                  {
                                      text: 'Cancel',
                                      onPress: () => {
                                          return null;
                                      },
                                  },
                                  {
                                      text: 'Confirm',
                                      onPress: () => {
                                          logoutUser(context.dispatch)
                                          props.navigation.replace('Products');
                                      },
                                  },
                              ],
                              { cancelable: false },
                          );
                      }}
                  />
                  :
                  <DrawerItem
                      label={({ color }) => <Text style={{ color: '#d8d8d8' }}>Login</Text>}
                      onPress={() => {
                          props.navigation.toggleDrawer();
                          props.navigation.navigate("LoginNavigator", { screen: "Login", params: { returnPage: 'Home', msg: "you must login for this" } });
                      }}
                  />
              }
              {context.stateUser.isAuthenticated && context.stateUser.user.isAdmin ?
                  <DrawerItem
                      label={({ color }) => <Text style={{ color: '#d8d8d8' }}>Orders</Text>}
                      onPress={() => {
                          props.navigation.toggleDrawer();
                          props.navigation.navigate("AdminNavigator", { screen: "Orders" });
                      }}
                  /> : null
                  
                }
      </DrawerContentScrollView>
    </View>
  );
};

export default CustomSidebarMenu;

const stylesSidebar = StyleSheet.create({
  sideMenuContainer: {
    width: '100%',
    height: '100%',
        backgroundColor: '#f4511e',//'#307ecc',
    paddingTop: 40,
    color: 'white',
  },
  profileHeader: {
    flexDirection: 'row',
      backgroundColor: '#f4511e',//'#307ecc',
    padding: 15,
    textAlign: 'center',
  },
  profileHeaderPicCircle: {
    width: 60,
    height: 60,
    borderRadius: 60 / 2,
    color: 'white',
    backgroundColor: '#ffffff',
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileHeaderText: {
    color: 'white',
    alignSelf: 'center',
    paddingHorizontal: 10,
    fontWeight: 'bold',
  },
  profileHeaderLine: {
    height: 1,
    marginHorizontal: 20,
    backgroundColor: '#e2e2e2',
    marginTop: 15,
  },
});
