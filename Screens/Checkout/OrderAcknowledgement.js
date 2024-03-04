
import React, { useContext, useEffect } from 'react';
import { View, ScrollView, StyleSheet, Image, Dimensions } from 'react-native';
import { Heading, Spinner, Text, Button, ButtonText } from "@gluestack-ui/themed";
import AuthGlobal from "../../Context/store/AuthGlobal";
import { formatDate, formatTime } from '../../assets/common/formatters';
import { StackActions } from '@react-navigation/native';
import * as orderActions from "../../Redux/Actions/orderActions";
import * as actions from "../../Redux/Actions/cartActions";
import { connect } from "react-redux";

var { height, width } = Dimensions.get('window')

const OrderAcknowledgement = (props) => {
    const context = useContext(AuthGlobal)
    const order = props.order;
    
    useEffect(() => {
            if (
                context?.stateUser?.isAuthenticated === false ||
                context?.stateUser?.isAuthenticated === null
            ) {
                props.navigation.navigate("Login")
            }

        }, [])

    const cancelOrder = ()=>
    {
        props.navigation.navigate("Cancel Order", { order: order });    
    }

    const goToCheckout = () => {       
        props.navigation.dispatch(StackActions.popToTop());
        props.navigation.replace("Checkout");
        
    }

    return (
        <View style={styles.container}>
            <View style={[styles.box, styles.order]}>
                <Image resizeMode='contain' source={require('../../assets/done.png')} />

                <Text size={"xl"} style={{ textAlign: 'center' }}>Thank you! Your order has been placed successfully. </Text>
                <Heading style={{ fontSize: 20 }}>Order# {order.UUID}</Heading>
                <Text size={"xl"} style={styles.buttonSpacing}>Total order value: ₹ {order.totalPrice}.00</Text>
                <Text style={styles.info}>Our pickup boy will come to pickup the laundry on <Text bold={true}> {formatDate(order.pickupSlot.date)}</Text> between <Text bold={true}>{formatTime(order.pickupSlot.startTime) + " to " + formatTime(order.pickupSlot.endTime)}.</Text>
                    <Text>Please make yourself available during the scheduled time.</Text></Text>
                <View >
                    

                    <Button onPress={() => goToCheckout()} style={styles.buttonSpacing} >
                        <ButtonText fontWeight="$medium" fontSize="$md">Place another order</ButtonText>
                    </Button>
                    <Button onPress={() => props.navigation.navigate("Order Detail", { orderId: order.id })}  style={styles.buttonSpacing}>
                        <ButtonText fontWeight="$medium" fontSize="$md">View order detail</ButtonText>
                    </Button>
                    <Button onPress={() => { props.navigation.dispatch(StackActions.popToTop()); props.navigation.navigate("Home"); }}>
                        <ButtonText fontWeight="$medium" fontSize="$md">Home</ButtonText>
                    </Button>
                    
                </View>
            </View>
        </View>
    )
}

const mapStateToProps = (state) => {
    const { order } = state;
    return {
        order: order,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        clearOrder: () => dispatch(orderActions.clearOrder()),
        clearCart: () => dispatch(actions.clearCart()),
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        margin: 0,
        
    },
   
    order: {
        alignItems: "center",
        marginBottom: 60,
        padding: 10,
        height: height,
        paddingTop: 40,
    },
    error:
    {
        color: "red"
    },
    box: {
        display: 'flex',
        flexDirection: "column",
        backgroundColor: "white",
        marginBottom: 10,
    },
    title: {
        fontWeight: 'bold',
        fontSize: 18,
        paddingBottom: 10,
    },
    buttonSpacing:
    {
        marginVertical:10
    },
    info:
    {
        backgroundColor: '#fafad2',
        margin: 10,
        elevation: 1,
        padding: 10
    }
})

//export default OrderAcknowledgement;
export default connect(mapStateToProps, mapDispatchToProps)(OrderAcknowledgement);