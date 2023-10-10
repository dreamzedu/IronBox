import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView, Button } from "react-native";
import { Heading, Spinner } from "@gluestack-ui/themed";
import TrafficLight from "../../Shared/StyledComponents/TrafficLight";
import { getOrderDetail, getOrderStatuses } from '../../Services/data-service';
import { formatDate, formatDateLong, formatTime } from '../../assets/common/formatters'
import AddressCard from "../../Shared/AddressCard"




const OrderDetail = (props) => {
    const [orderStatus, setOrderStatus] = useState();
    const [order, setOrder] = useState();
   


    useEffect(() => {
        const orderId = props.route.params.orderId;
        console.log(orderId);
        const fetchOrder = () => {
            try
            {
                getOrderDetail(orderId).then((res) => {
                    console.log(res);
                    setOrder(res);

                    orderStatuses = getOrderStatuses();

                    switch (props.order.status.code) {
                        case 1:
                        case 2:
                            setOrderStatus(<TrafficLight unavailable></TrafficLight>);
                            break;
                        case 3:
                        case 4:
                            setOrderStatus(<TrafficLight limited></TrafficLight>);
                            break;
                        case 5:
                            setOrderStatus(<TrafficLight available></TrafficLight>);
                            break;
                        case 6:
                        case 7:
                            setOrderStatus(<TrafficLight cancelled></TrafficLight>);
                            break;
                        default:
                            setOrderStatus(<TrafficLight cancelled></TrafficLight>);
                            break;

                    }
                });
                
            } catch (e) {
                console.log(e)
            }
        };

        fetchOrder();

        return () => {
            setOrderStatus();
        };
    }, []);

   

    return (
        <ScrollView>
            {
                order ? 
                    (<View style={styles.container}>
                        <View style={styles.title}>
                            <Text>{order.product.name}</Text>
                            <Text>Order Number: #{order.id}</Text>
                        </View>
                        <View style={{ marginTop: 10 }}>
                            <Text>Status: {order.status.name} {orderStatus}</Text>
                            {
                                order.status.name === "Cancelled" ?
                                    <>
                                        <Text>Cancellation Date: {formatDateLong(order.cancelDate)}</Text>
                                        <Text>Cancellation Reason: {order.cancelReason}</Text>
                                        <Text>Cancellation Charges: Rs {order.cancelCharges}.00</Text>

                                    </>
                                    : null
                            }
                            <Text>Date Ordered: {order.dateOrdered.split("T")[0]}</Text>
                            <Text>Total Cost: </Text>
                            <Text style={styles.price}>Rs {order.totalPrice + order.cancelCharges}.00</Text>
                            {order.status.name !== "Cancelled" ?
                                <Button title="Cancel Order" onPress={() => props.navigation.navigate("Cancel Order", { orderData: order })} ></Button>
                                : null}
                        </View>
                        <Heading style={{ marginTop: 10 }}>Pickup Schedule</Heading>
                        <View>
                            <Text>Pickup Date: {formatDate(order.pickupSlot.date)}</Text>
                            <Text>Pickup Time: {formatTime(order.pickupSlot.startTime) + " to " + formatTime(order.pickupSlot.endTime)}</Text>
                        </View>

                        <Heading style={{ marginTop: 10 }}>Pickup Address</Heading>
                        <View >
                            <AddressCard address={order.pickupAddress} />                            
                        </View>

                        <Heading>Item List:</Heading>
                        <View>
                            {order.items.map((item) => {
                                return (<View class={styles.itemContainer} key={item.id }><Text class={styles.item}>{item.name}</Text><Text class={styles.item}>{item.count}</Text></View>)
                            })}
                        </View>
                    </View>)
                    :
                    (<Spinner size='small'></Spinner>)
                    
            }
        </ ScrollView>
  );
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
        margin: 10,
        borderRadius: 10,
    },
    title: {
        backgroundColor: "#62B1F6",
        padding: 5,
        alignItems: 'center'
    },
    priceContainer: {
        marginTop: 10,
        alignSelf: "flex-end",
        flexDirection: "row",
    },
    price: {
        color: "blue",
        fontWeight: "bold",
    },
    itemContainer: {
        flexDirection: "row",
        width:'300px'
    },
    item: {
        width:'150px'
    }
});

export default OrderDetail;
