import React, { useState, useContext } from 'react'
import { View, Text } from 'react-native';
import { Button } from '@gluestack-ui/themed';

// Context
import AuthGlobal from "../../Context/store/AuthGlobal";
import { logoutUser } from "../../Context/actions/Auth.actions";


const ProductDetails = (props) => {

    const context = useContext(AuthGlobal);
    const [product, setProduct] = useState(props.route.params.product);
    let order = {
        productId: product.id, userId: null, items: [], pickupAddress: null, pickupSlot: null, totalPrice:0 };

    const Checkout = () => {
        if (!context.stateUser.isAuthenticated) {
           // props.navigation.navigate("User", { screen: "Login", params: {source: "checkout"} });
            props.navigation.navigate("LoginNavigator", { screen: "Login", params: {returnPage:'HomeScreen', msg: "you must login to checkout" } });
        }
        else {            
            console.log(context.stateUser);
            order.userId = context.stateUser.user.userId;
            order.pickupAddress = context.stateUser.userProfile.address;
            if (order.pickupAddress) {
                SelectPickupAddress(order);
            }
            else {
                AddPickupAddress(order);
            }
        }

    }

    const AddPickupAddress = (order) =>
    {
        props.navigation.navigate("Add Pickup Address", { order: order }  );
    }

    const SelectPickupAddress = (order) => {
        props.navigation.navigate("Select Pickup Address", { order: order });
    }

    const ShowRateCard = () => {
        props.navigation.navigate("Rate Card");
    }

    const AddServiceItems = () => {
        props.navigation.navigate("Add Items");
    }

    const Logout = ()=>
    {
        logoutUser(context.dispatch);
    }

    return (
        
            <View>
                <Text> {product.name}</Text>
                {/*<Button onPress={onPressLearnMore}*/}
                {/*    title="Learn More"*/}
                {/*    color="#841584"*/}
                {/*    accessibilityLabel="Learn more about this purple button" />*/}
            <Button onPress={Checkout}><Button.Text>Checkout</Button.Text></Button>
            <Button onPress={AddPickupAddress}><Button.Text>Add Pickup Address</Button.Text></Button>
            <Button onPress={ShowRateCard}><Button.Text>Rate Card</Button.Text></Button>
            <Button onPress={AddServiceItems}><Button.Text>Add Items</Button.Text></Button>
            <Button onPress={() => props.navigation.navigate("User", { screen: "MyOrders" })}><Button.Text>My Orders</Button.Text></Button>
            <Button onPress={Logout}><Button.Text>Logout</Button.Text></Button>
                
            </View>
        
    );

}

export default ProductDetails;