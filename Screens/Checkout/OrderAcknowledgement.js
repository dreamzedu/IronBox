import { Heading } from '@gluestack-ui/themed';
import React, { useContext, useEffect } from 'react';
import { View, Text, ScrollView, Button, StyleSheet } from 'react-native';
import AuthGlobal from "../../Context/store/AuthGlobal"

const OrderAcknowledgement = (props) => {
    const context = useContext(AuthGlobal)
    const order = props.route.params.orderData;

    useEffect(() => {
            if (
                context?.stateUser?.isAuthenticated === false ||
                context?.stateUser?.isAuthenticated === null
            ) {
                props.navigation.navigate("Login")
            }

        }, [context.stateUser.isAuthenticated])

    const cancelOrder = ()=>
    {
        props.navigation.navigate("Cancel Order", { order: order });    
    }

    return (
        <View style={styles.container}>

            <Heading style={{ fontSize: 20 }}>Order# {order.id}</Heading>
                    
                <View style={styles.order}>
                    <Text>Your order has been placed successfully. </Text>

                <Button title="Place another order" onPress={() => props.navigation.navigate("Products")} />
                <Button title="View order detail" onPress={() => props.navigation.navigate("Order Detail", { orderId: order.id })} />
                <Button title="Cancel Order" onPress={() => cancelOrder()} />
                </View>
                 
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center"
    },
    subContainer: {
        alignItems: "center",
        marginTop: 60
    },
    order: {
        marginTop: 20,
        alignItems: "center",
        marginBottom: 60
    },
    error:
    {
        color: "red"
    }
})

export default OrderAcknowledgement;