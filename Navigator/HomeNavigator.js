import React from 'react'
//import { createStackNavigator } from "@react-navigation/stack"
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ProductContainer from "../Screens/Products/ProductContainer";
import ProductDetails from "../Screens/Products/ProductDetails"
import SchedulePickup from "../Screens/Checkout/SchedulePickup"
import AddPickupAddress from '../Screens/Checkout/AddPickupAddress';
import SelectPickupAddress from '../Screens/Checkout/SelectPickupAddress';
import RateCard from '../Screens/Checkout/RateCard';
import ConfirmOrder from '../Screens/Checkout/ConfirmOrder';
import Login from '../Screens/User/Login';

const Stack = createNativeStackNavigator();

const HomeNavigator = () => {

	return (
		<Stack.Navigator>
			
			<Stack.Screen
				name='Home'
				component={ProductContainer}
				options={{ headerShown: false }}
			/>
				<Stack.Screen
					name="Product Details"
					component={ProductDetails}
				options={{ headerShown: true }} />
			<Stack.Screen
				name="Schedule Pickup"
				component={SchedulePickup}
				options={{ headerShown: true }} />
			<Stack.Screen
				name="Select Pickup Address"
				component={SelectPickupAddress}
				options={{ headerShown: true }} />
			<Stack.Screen
				name="Add Pickup Address"
				component={AddPickupAddress}
				options={{ headerShown: true }} />
			<Stack.Screen
				name="Rate Card"
				component={RateCard}
				options={{ headerShown: true }} />
			<Stack.Screen
				name="Confirm Order"
				component={ConfirmOrder}
				options={{ headerShown: true }} />
		</ Stack.Navigator>

			);
}

export default HomeNavigator;