import React from 'react'
//import { createStackNavigator } from "@react-navigation/stack"
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ProductContainer from "../Screens/Products/ProductContainer";
import ProductDetails from "../Screens/Products/ProductDetails"
import RateCard from '../Screens/Products/RateCard';
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
				name="Rate Card"
				component={RateCard}
				options={{ headerShown: true }} />			
			
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