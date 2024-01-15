import React, { useEffect, useState } from "react";
import { View, StyleSheet, Dimensions, ScrollView, Button, Text } from "react-native";

import Toast from "react-native-toast-message";
import axios from "axios";
import baseURL from "../../assets/common/baseUrl";
import { formatDate, formatTime } from '../../assets/common/formatters'
import { saveUserOrder } from '../../Services/data-service';

var { width, height } = Dimensions.get("window");

const ReviewOrder = (props) => {
  const order = props.route.params.order;

  // Add this
  const [productUpdate, setProductUpdate] = useState();
  useEffect(() => {
      
  }, []);

  
  const placeOrder = () => {

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
                  console.log("order placed" + res);
                  props.navigation.navigate("Order Acknowledgement", { orderData: { ...order, id: res.orderId } });
              }, 500);
          }
          else {
              Toast.show({
                  type: "error",
                  text1: "Failed to place order.",
                  text2: res.message
              });
          }
      })
      .catch((error) => {
        Toast.show({
          topOffset: 60,
          type: "error",
          text1: "Something went wrong",
          text2: "Please try again",
        });
      });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.subContainer}>
              <Text style={{ fontSize: 20, fontWeight: "bold", paddingBottom: 10, }}>Review Order Details</Text>
              <View style={{
                  borderTopWidth: 1, borderTopColor: "silver", alignSelf: "stretch",
                  }}>
                  <Text style={styles.title}>Pickup Address:</Text>
                  <View style={styles.blockContainer}>
                      <Text>Address Line1: {order.pickupAddress.addressLine1}</Text>
                      <Text>Address Line2: {order.pickupAddress.addressLine2}</Text>
                      <Text>City: {order.pickupAddress.city}</Text>
                      <Text>Zip Code: {order.pickupAddress.zip}</Text>
                    </View>
                  <Text style={styles.title}>Pickup Schedule:</Text>
                  <View style={styles.blockContainer}>
                      <Text>Pickup Date: {formatDate(order.pickupSlot.date)}</Text>
                      <Text>Pickup Time: {formatTime(order.pickupSlot.startTime) + " to " + formatTime(order.pickupSlot.endTime)}</Text>
                  </View>
                  <Text style={styles.title}>Item List:</Text>
                  <View style={[styles.blockContainer]}>
                      {order.items.map((item) => {console.log(order.items)
                          return (<View style={styles.itemContainer} key={item.id}><View style={styles.item}><Text>{item.name}</Text></View><View style={styles.item}><Text>{item.count}</Text></View><View style={styles.item}><Text>₹ {item.price}</Text></View></View>)
                      })}
                  </View>

          </View>
        <View style={{ alignItems: "center", margin: 20 }}>
          <Button title={"Place order"} onPress={placeOrder} />
        </View>
      </View>
    </ScrollView>
  );
};


const styles = StyleSheet.create({
  container: {
    padding: 8,
        backgroundColor: "white",
  },
  subContainer: {
    alignItems: "center",
      margin: 8,
    },
    blockContainer:
    {
        padding: 8,
        alignItems: 'center',
        borderColor: 'silver',
        borderBottomWidth: 1,
        marginBottom: 10,
        paddingBottom:10,
    },
  title: {
    alignSelf: "center",
    margin: 8,
    fontSize: 16,
    fontWeight: "bold",
  },


    itemContainer: {
        flexDirection: 'row',
        padding: 10,
        alignSelf: 'stretch',
    },
    item: {
        flex:1,
        flexDirection: 'row',
    },
});

export default ReviewOrder;
