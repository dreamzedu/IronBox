import React, { useState, useContext } from 'react'
import { View, Text } from 'react-native';
import { Container, Button } from 'native-base';

// Context
import AuthGlobal from "../../Context/store/AuthGlobal";
import { logoutUser } from "../../Context/actions/Auth.actions";


const ProductDetails = (props) => {

    const context = useContext(AuthGlobal);
    const [item, setItem] = useState(props.route.params.item);
    let order = {
        items: [], pickupAddress: {}, pickupTime: {}, pickupDate: {}, status: {}
    };

    const Checkout = () => {
        if (!context.stateUser.isAuthenticated) {
           // props.navigation.navigate("User", { screen: "Login", params: {source: "checkout"} });
            props.navigation.navigate("User", { screen: "Login", params: { msg: "you must login to checkout" } });
        }
        else {
            console.log(context.stateUser);
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

    const Logout = ()=>
    {
        logoutUser(context.dispatch);
    }

    return (
        <Container>
            <View>
                <Text> {item.name}</Text>
                {/*<Button onPress={onPressLearnMore}*/}
                {/*    title="Learn More"*/}
                {/*    color="#841584"*/}
                {/*    accessibilityLabel="Learn more about this purple button" />*/}
                <Button onPress={Checkout}>Checkout</Button>
                <Button onPress={AddPickupAddress}>Add Pickup Address</Button>
                <Button onPress={ShowRateCard}>Rate Card</Button>
                <Button onPress={Logout}>Logout</Button>
            </View>
        </Container>
    );

}

export default ProductDetails;