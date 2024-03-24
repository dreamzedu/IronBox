
import React from "react"
import { createStackNavigator } from "@react-navigation/stack"

import Orders from "../Screens/Admin/Orders"
import AdminOrderDetail from "../Screens/Admin/AdminOrderDetail"
import AdminUpdateOrderItems from "../Screens/Admin/AdminUpdateOrderItems"
import AdminUpdatePickupSchedule from "../Screens/Admin/AdminUpdatePickupSchedule"
import * as commonstyles from "../common-styles";

const Stack = createStackNavigator();

function MyStack() {
    return (
        <Stack.Navigator>         
            <Stack.Screen name="Orders" component={Orders} />
               
            <Stack.Screen name="AdminOrderDetail" component={AdminOrderDetail} />
            <Stack.Screen name="Admin - Update Order Items" component={AdminUpdateOrderItems} />
            <Stack.Screen
                name="Admin - Update Pickup Schedule"
                component={AdminUpdatePickupSchedule}
                options={{ title: 'Update Pickup Schedule', headerStyle: commonstyles.header }}
            />
        </Stack.Navigator>
    )
}
export default function AdminNavigator() {
    return <MyStack />
}