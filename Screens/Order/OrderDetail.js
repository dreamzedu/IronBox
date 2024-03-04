import React, { useEffect, useState, useContext } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { Heading, Spinner, Text, Button, ButtonText } from "@gluestack-ui/themed";
import TrafficLight from "../../Shared/StyledComponents/TrafficLight";
import { getOrderDetail, getOrderStatuses } from '../../Services/data-service';
import { formatDate, formatDateLong, formatTime } from '../../assets/common/formatters'
import AddressCard from "../../Shared/AddressCard"
import AuthGlobal from "../../Context/store/AuthGlobal"




const OrderDetail = (props) => {
    const [orderStatus, setOrderStatus] = useState();
    const [order, setOrder] = useState();
    const context = useContext(AuthGlobal)


    useEffect(() => {
        const orderId = props.route.params.orderId;
        
           
                getOrderDetail(orderId).then((res) => {

                    try {
                        setOrder(res);
                        switch (res.status.code) {
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
                    } catch (e) {
                        console.log(e)
                    }
                });
                
                 


        return () => {
            setOrderStatus();
        };
    }, []);

   

    return (
        <ScrollView>
            {
                order ?
                    (<View style={styles.container}>
                        <View style={[styles.box, styles.roundBorder]}>
                            <View style={styles.row}><Text style={styles.center} size={"md"}>{order.product.name}</Text></View>
                            <View style={styles.row}><Text style={styles.alignLeft}>Order Number:</Text><Text> #{order.UUID}</Text></View>
                            <View style={styles.row}><Text style={styles.alignLeft}>Date Ordered:</Text><Text> {formatDate(order.dateOrdered.split("T")[0])}</Text></View>
                            <View style={styles.row}><Text style={styles.alignLeft}>Total Cost: </Text><Text>₹ {order.totalPrice + order.cancelCharges}.00</Text></View>
                        </View>

                        <View style={styles.row}>
                            <Heading style={styles.alignLeft}>Oredr Status</Heading>
                        {order.status.name !== "Cancelled" ?
                                <View style={styles.alignRight}>
                                    <Button style={{ marginBottom:-10 }} variant="link" onPress={() => props.navigation.navigate("Cancel Order", { orderData: order })}>
                                    {/*<Button style={{ marginBottom: -10 }} variant="link" onPress={() => props.cancelOrder(order)}>*/}
                                    <ButtonText fontWeight="$medium" fontSize="$md">Cancel Order</ButtonText>
                            </Button></View>
                                : null}
                        </View>
                        <View style={[styles.box, styles.roundBorder]}>
                            <View style={styles.row}><Text style={styles.alignLeft}>Status: </Text><Text>{orderStatus} {order.status.name} </Text></View>
                            {
                                order.status.name === "Cancelled" ?
                                    <>
                                        <View style={styles.row}><Text style={styles.alignLeft}>Cancellation Date: </Text><Text>{formatDateLong(order.cancelDate)}</Text></View>
                                        <View style={styles.row}><Text style={styles.alignLeft}>Cancellation Reason: </Text><Text>{order.cancelReason}</Text></View>
                                        <View style={styles.row}><Text style={styles.alignLeft}>Cancellation Charges:</Text><Text> ₹ {order.cancelCharges}.00</Text></View>

                                    </>
                                    : null
                            }
                            
                           
                        </View>
                        <View style={styles.row}>
                            <Heading style={styles.alignLeft}>Pickup Slot</Heading>
                            {//admin flow for updating pick schedule before the order is picked up
                                (context.stateUser.user.isAdmin && order.status.code < 3) ?
                                    <View style={styles.alignRight}>
                                        <Button style={{ marginBottom: -10 }} variant="link" onPress={() => { props.navigation.navigate("AdminNavigator", { screen: "Admin - Update Pickup Schedule", params: { order: order } }) }}>
                                            <ButtonText fontWeight="$medium" fontSize="$md">Update Pickup</ButtonText>
                                        </Button></View>
                                    : null}
                        </View>
                        <View style={[styles.box, styles.roundBorder]}>
                            <View style={styles.row}><Text style={styles.alignLeft}>Pickup Date: </Text><Text>{formatDate(order.pickupSlot.date)}</Text></View>
                            <View style={styles.row}><Text style={styles.alignLeft}>Pickup Time: </Text><Text>{formatTime(order.pickupSlot.startTime) + " to " + formatTime(order.pickupSlot.endTime)}</Text></View>
                        </View>

                        <Heading>Pickup Address</Heading>
                        <View style={[styles.box, styles.roundBorder]}>
                            <AddressCard address={order.pickupAddress} />                            
                        </View>

                        <View style={styles.row}>
                            <Heading style={styles.alignLeft}>Item Summary</Heading>
                            {//order status 2 is not pickedup and 4 is in progress and 5 is complete
                                (context.stateUser.user.isAdmin && order.status.code < 5) || order.status.code < 3 ?
                                <View style={styles.alignRight}>
                                        <Button style={{ marginBottom: -10 }} variant="link" onPress={() => { props.navigation.navigate("AdminNavigator", { screen: "Admin - Update Order Items", params: { order: order } }) }}>
                                        <ButtonText fontWeight="$medium" fontSize="$md">Update Items</ButtonText>
                                    </Button></View>
                                : null}
                        </View>
                        
                        <View style={[styles.box, styles.roundBorder]}>
                            {order.items.length <= 0 ? <View><Text>No items selected.</Text></View> :
                                <>
                                    <View style={[styles.row, styles.borderBottom]} ><Text style={[styles.col1, styles.listHeader]}>Item name</Text><Text style={[styles.col2, styles.listHeader]} >Count</Text><Text style={[styles.col3, styles.listHeader]}>Price</Text></View>
                           
                                    {order.items.map((item) => {
                                        return (<View style={styles.row} key={item.id}><Text style={styles.col1}>{item.name}</Text><Text style={styles.col2} >{item.count}</Text><Text style={styles.col3}>{item.count*item.price}.0</Text></View>)
                                    })}
                            
                                    <View style={[styles.row, styles.borderTop, {marginTop:5}]} ><Text style={[styles.col1, styles.listHeader]}>Total</Text><Text style={[styles.col2, styles.listHeader]} >{order.items.length}</Text><Text style={[styles.col3, styles.listHeader]}>{order.totalPrice}.0</Text></View>
                                </>
                            }

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
    //title: {
    //    backgroundColor: "#62B1F6",
    //    padding: 5,
    //    alignItems: 'center'
    //},
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
    },
    col1: {
        flex: 0.6,
        alignSelf: 'stretch'
    },
    col2: {
        flex: 0.2,
        alignSelf: 'stretch'
    },
    col3: {
        flex: 0.2,
        alignSelf: 'stretch',
        textAlign:"right",
    },

    box: {
        display: 'flex',
        flexDirection: "column",
        backgroundColor: "white",
        marginBottom:10,
    },
    title: {
        fontWeight: 'bold',
        fontSize: 18,
        paddingBottom: 10,
    },
    row: {
        display: 'flex',
        flexDirection: "row",
        alignSelf: 'stretch',
        width: '100%',
        marginTop:5,
    },
    alignLeft:
    {
        alignSelf: 'stretch',
        flex: 1
    },
    roundBorder:
    {
        borderRadius: 8,
        borderColor: "gainsboro",
        
        padding:10
    },
    center:
    {
        paddingBottom: 5,
        textAlign: "center",
        flex: 1,
        fontWeight:"bold",
    },
    listHeader:
    {
        fontWeight: "bold",
        marginBottom:3
    },
    borderTop:
    {
        borderColor: 'silver',
        borderTopWidth: 1,
    },
    borderBottom:
    {
        borderColor: 'silver',
        borderBottomWidth: 1,
    }

});

export default OrderDetail;
