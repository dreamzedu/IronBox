
//import { createStackNavigator } from '@react-navigation/stack'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useContext } from 'react';
import MyOrders from "../Screens/User/MyOrders";
import UserProfile from "../Screens/User/UserProfile";
import UpdateUserProfile from '../Screens/User/UpdateUserProfile';
import AddressEditor from '../Screens/User/AddressEditor';
import MyOrderDetail from '../Screens/User/MyOrderDetail'
import AuthGlobal from "../Context/store/AuthGlobal"

const Stack = createNativeStackNavigator();

function MyStack() {
    const context = useContext(AuthGlobal)
    return (
        <Stack.Navigator initialRouteName="User Profile">
            <Stack.Screen
                name="User Profile"
                component={UserProfile}
            
                options={{
                    headerShown: true
                }}
            />
            {/*<Stack.Screen*/}
            {/*    name="Edit Profile"*/}
            {/*    component={UpdateUserProfile}*/}
            {/*    options={{*/}
            {/*        headerShown: true*/}
            {/*    }}*/}
            {/*/>*/}
            {/*<Stack.Screen*/}
            {/*    name="AddressEditor"*/}
            {/*    component={AddressEditor}*/}
            {/*    options={{*/}
            {/*        headerShown: true*/}
            {/*    }}*/}
            {/*/>*/}
            

            {/*<Stack.Screen*/}
            {/*    name="MyOrderDetail"*/}
            {/*    component={MyOrderDetail}*/}
            {/*    options={{*/}
            {/*        headerShown: false,*/}
            {/*        tabBarStyle: { display: 'none' }*/}
            {/*    }}*/}
          
            {/*/>*/}

            
            {/*<Stack.Screen*/}
            {/*    name="Cancel Order"*/}
            {/*    component={CancelOrder}*/}
            {/*    options={{*/}
            {/*        headerShown: true*/}
            {/*    }}*/}
            {/*    />*/}
        </Stack.Navigator>
    )
}

export default function UserNavigator() {
    return <MyStack />
}