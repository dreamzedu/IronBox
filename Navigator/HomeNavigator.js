import React from 'react'
//import { createStackNavigator } from "@react-navigation/stack"
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from "../Screens/HomeScreen";
import ProductDetails from "../Screens/Products/ProductDetails"
import CheckoutHome from "../Screens/Checkout/CheckoutHome"
import { StyleSheet } from 'react-native'


const Stack = createNativeStackNavigator();

const HomeNavigator = () => {

	return (
		<Stack.Navigator initialRouteName="HomeScreen">
			
			<Stack.Screen
				name='Home'
				component={HomeScreen}
				options={{
					//headerStyle: styles.header,
					//headerTitleStyle: styles.headerTitle,
					headerShown: true
				}}
			/>
				<Stack.Screen
					name="Product Details"
					component={ProductDetails}
				options={{ headerShown: false }} />

			
						
		</ Stack.Navigator>

			);
}

const styles = StyleSheet.create({
	header: {
		backgroundColor: '#3f51b5',
	},
	headerTitle: {
		fontWeight: 'bold',
		fontSize: 20,
	},
})

export default HomeNavigator;