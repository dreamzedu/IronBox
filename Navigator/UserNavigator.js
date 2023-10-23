import React from "react"
//import { createStackNavigator } from '@react-navigation/stack'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MyOrders from "../Screens/User/MyOrders";
import UserProfile from "../Screens/User/UserProfile";
import UpdateUserProfile from '../Screens/User/UpdateUserProfile';
import AddressEditor from '../Screens/User/AddressEditor';
import MyOrderDetail from '../Screens/User/MyOrderDetail'

const Stack = createNativeStackNavigator();

function MyStack() {
    return (
        <Stack.Navigator initialRouteName="User Profile">
            <Stack.Screen
                name="User Profile"
                component={UserProfile}
                options={{
                    headerShown: false
                }}
            />
            <Stack.Screen
                name="Edit Profile"
                component={UpdateUserProfile}
                options={{
                    headerShown: false
                }}
            />
            <Stack.Screen
                name="AddressEditor"
                component={AddressEditor}
                options={{
                    headerShown: false
                }}
            />
            <Stack.Screen
                name="MyOrders"
                component={MyOrders}
                options={{
                    headerShown: false
                }}
            />

            <Stack.Screen
                name="MyOrderDetail"
                component={MyOrderDetail}
                options={{
                    headerShown: false
                }}
            />
            
        </Stack.Navigator>
    )
}

export default function UserNavigator() {
    return <MyStack />
}