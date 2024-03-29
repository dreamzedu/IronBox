﻿import React, { useEffect, useState, useContext } from "react";
import { View, StyleSheet, Dimensions, ScrollView } from "react-native";

import { Heading, Spinner, Text, Button, ButtonText } from "@gluestack-ui/themed";
import Toast from "react-native-toast-message";
import axios from "axios";
import baseURL from "../../assets/common/baseUrl";
import { formatDate, formatTime } from '../../assets/common/formatters'
import { saveUserOrder } from '../../Services/data-service';
import AddressCard from "../../Shared/AddressCard";
import AuthGlobal from "../../Context/store/AuthGlobal";
import { connect } from "react-redux";
import * as actions from "../../Redux/Actions/orderActions";
import * as commonstyles from "../../common-styles";

var { width, height } = Dimensions.get("window");

const ReviewOrder = (props) => {
    //const order = props.route.params.order;
    const order = props.order;
    const context = useContext(AuthGlobal)

  // Add this
    const [productUpdate, setProductUpdate] = useState();
    const [processing, setProcessing] = useState(false);
  useEffect(() => {
      console.log("Review Order reloaded...")
  }, [props]);

  
    const placeOrder = () => {
        setProcessing(true);
        saveUserOrder(order)
            .then((res) => {
                if (res.success) {
                    Toast.show({
                        type: "success",
                        text1: "Order placed successfully.",
                        text2: "",
                    });
                    setTimeout(() => {
                        //props.clearCart();
                        //console.log("order placed" + res);
                        let newOrder = { ...order, id: res.orderId, UUID: res.UUID };
                        props.updateOrder(newOrder);
                        props.setLatestOrder(newOrder);
                        props.navigation.navigate("Order Acknowledgement" );
                        setProcessing(false);
              }, 0);
          }
          else {
              Toast.show({
                  type: "error",
                  text1: "Failed to place order.",
                  text2: res.message
              });
                    setProcessing(false);
          }
      })
      .catch((error) => {
        Toast.show({
          topOffset: 60,
          type: "error",
          text1: "Something went wrong",
          text2: "Please try again",
        });
          setProcessing(false);
      });
  };

    return (
        <View style={commonstyles.container}>
            {processing ? <Spinner size='small'></Spinner> :
                <ScrollView>
                    {
                        order ?
                            (<View style={commonstyles.subContainer}>
                                <View style={[styles.box, styles.roundBorder]}>
                                    <View style={styles.row}><Text style={styles.center} size={"lg"}>{order.productName}</Text></View>

                                    <View style={[styles.row, { justifyContent: 'center' }]}>
                                        <Text >Total Order Value: </Text><Text>₹ {order.totalPrice}.00</Text>
                                    </View>
                                    {order.totalPrice < 100 ?
                                        <View style={{ backgroundColor: 'yellow', padding: 5, marginTop: 10 }}><Text>Your minimum order value has to be ₹100. If you have not added the items to your order now, no worries! our executive will add items for you while pickup.</Text></View> : <></>
                                    }
                                </View>

                                <Heading>Pickup Schedule</Heading>
                                <View style={[styles.box, styles.roundBorder]}>
                                    <View style={styles.row}><Text style={styles.alignLeft}>Pickup Date: </Text><Text>{formatDate(order.pickupSlot.date)}</Text></View>
                                    <View style={styles.row}><Text style={styles.alignLeft}>Pickup Time: </Text><Text>{formatTime(order.pickupSlot.startTime) + " to " + formatTime(order.pickupSlot.endTime)}</Text></View>
                                </View>

                                <Heading>Pickup Address</Heading>
                                <View style={[styles.box, styles.roundBorder]}>
                                    <AddressCard address={order.pickupAddress} />
                                </View>

                                <Heading style={styles.alignLeft}>Item Summary</Heading>

                                <View style={[styles.box, styles.roundBorder]}>
                                    {order.items.length <= 0 ? <View><Text>No items added.</Text></View> :
                                        <>
                                            <View style={[styles.row, styles.borderBottom]} ><Text style={[styles.col1, styles.listHeader]}>Item name</Text><Text style={[styles.col2, styles.listHeader]} >Count</Text><Text style={[styles.col3, styles.listHeader]}>Price</Text></View>

                                            {order.items.map((item) => {
                                                return (<View style={[styles.row, { paddingVertical: 5 }]} key={item.id}><Text style={styles.col1}>{item.name}</Text><Text style={styles.col2} >{item.count}</Text><Text style={styles.col3}>₹ {item.count * item.price}.0</Text></View>)
                                            })}

                                            <View style={[styles.row, styles.borderTop, { marginTop: 5 }]} ><Text style={[styles.col1, styles.listHeader]}>Total</Text><Text style={[styles.col2, styles.listHeader]} >{order.items?.reduce((n, { count }) => n + count, 0)}</Text><Text style={[styles.col3, styles.listHeader]}>₹ {order.totalPrice}.0</Text></View>
                                        </>
                                    }

                                </View>

                            </View>)
                            :
                            (<Spinner size='small'></Spinner>)

                    }
                </ ScrollView>
            }
            <View style={commonstyles.footer}>
                <Button variant='link' onPress={() => placeOrder()} isDisabled={processing}>
                    <ButtonText color='$white' fontWeight="$medium" fontSize="$md">Place Order</ButtonText>
                </Button>
                
            </View>
        </View>

    );
}

const mapStateToProps = (state) => {
    const { order } = state;
    return {
        order: order,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        updateOrder: (order) => dispatch(actions.updateOrder(order)),
        setLatestOrder: (order) => dispatch(actions.setLatestOrder(order)),
    }
}

const styles = StyleSheet.create({
    
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
        textAlign: "right",
    },

    box: {
        display: 'flex',
        flexDirection: "column",
        backgroundColor: "white",
        marginBottom: 20,
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
        //borderWidth: 1,
        padding: 10,
    },
    center:
    {
        paddingBottom: 5,
        textAlign: "center",
        flex: 1,
        fontWeight: "bold",
    },
    listHeader:
    {
        fontWeight: "bold",
        marginBottom: 3
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

//export default ReviewOrder;
export default connect(mapStateToProps, mapDispatchToProps)(ReviewOrder);
