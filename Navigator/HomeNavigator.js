import React from 'react'
//import { createStackNavigator } from "@react-navigation/stack"
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ProductContainer from "../Screens/Products/ProductContainer";
import ProductDetails from "../Screens/Products/ProductDetails"
import SchedulePickup from "../Screens/Checkout/SchedulePickup"
import AddPickupAddress from '../Screens/Checkout/AddPickupAddress';
import SelectPickupAddress from '../Screens/Checkout/SelectPickupAddress';
import RateCard from '../Screens/Products/RateCard';
import AddItems from '../Screens/Checkout/AddItems';
import ReviewOrder from '../Screens/Checkout/ReviewOrder';
import OrderDetail from '../Screens/Order/OrderDetail';
import OrderAcknowledgement from "../Screens/Checkout/OrderAcknowledgement"
import CancelOrder from '../Screens/Checkout/CancelOrder';

const Stack = createNativeStackNavigator();

const HomeNavigator = () => {

	return (
		<Stack.Navigator initialRouteName="Products">
			
			<Stack.Screen
				name='Products'
				component={ProductContainer}
				options={{ headerShown: false }}
			/>
				<Stack.Screen
					name="Product Details"
					component={ProductDetails}
				options={{ headerShown: false }} />
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
				name="Add Items"
				component={AddItems}
				options={{ headerShown: true }} />
			<Stack.Screen
				name="Review Order"
				component={ReviewOrder}
				options={{ headerShown: true }} />
			<Stack.Screen
				name="Order Detail"
				component={OrderDetail}
				options={{ headerShown: true }} />
			<Stack.Screen
				name="Order Acknowledgement"
				component={OrderAcknowledgement}
				options={{
					headerShown: false
				}}
			/>
			<Stack.Screen
				name="Cancel Order"
				component={CancelOrder}
				options={{
					headerShown: false
				}}
			/>
		</ Stack.Navigator>

			);
}

export default HomeNavigator;