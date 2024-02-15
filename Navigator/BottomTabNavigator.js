import React, { useContext } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { View } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

// Stacks
import HomeNavigator from "./HomeNavigator";
import UserNavigator from "./UserNavigator";
import CartNavigator from "./CartNavigator";

import CartIcon from "../Shared/CartIcon";
import AuthGlobal from "../Context/store/AuthGlobal";

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {

  const context = useContext(AuthGlobal)

  return (
    <Tab.Navigator
          initialRouteName="Home"          
          screenOptions={{
              headerShown: false,
              tabBarHideOnKeyboard: true,
              tabBarActiveTintColor: "#e91e63",
              tabBarShowLabel: false,
              tabBarStyle: [
                  {
                      display: "flex"
                  },
                  null
              ]
          }}
    >
      <Tab.Screen
        name="Home"
        component={HomeNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <Icon name="home" color={color} size={30} />
          ),
        }}
      />
      <Tab.Screen
        name="CartNavigator"
        component={CartNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <View>
                    <Icon name="shopping-basket" color={color} size={26} />
              <CartIcon />
            </View>
          ),
        }}
      />
      
      {/*{context.stateUser.user.isAdmin == true ? (*/}
      {/*//  <Tab.Screen*/}
      {/*//  name="Admin"*/}
      {/*//  component={AdminNavigator}*/}
      {/*//  options={{*/}
      {/*//    tabBarIcon: ({ color }) => (*/}
      {/*//      <Icon name="cog" color={color} size={30} />*/}
      {/*//    ),*/}
      {/*//  }}*/}
      {/*///>*/}
      {/*): null }*/}
      
      <Tab.Screen
        name="User"
        component={UserNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <Icon name="user" color={color} size={30} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
