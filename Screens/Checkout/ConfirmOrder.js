import React, { useEffect, useState } from "react";
import { View, StyleSheet, Dimensions, ScrollView, Button, Text } from "react-native";

import Toast from "react-native-toast-message";
import axios from "axios";
import baseURL from "../../assets/common/baseUrl";
import { formatDate, formatTime } from '../../assets/common/formatters'
import { saveUserOrder } from '../../Services/data-service';

var { width, height } = Dimensions.get("window");

const ConfirmOrder = (props) => {
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
                  props.navigation.navigate("Order Acknowledgement", { orderData: { ...order, id: res.data } });
              }, 500);
          }
          else {
              Toast.show({
                  type: "error",
                  text1: "Failed",
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
      <View style={styles.titleContainer}>
        <Text style={{ fontSize: 20, fontWeight: "bold" }}>Confirm Order</Text>
          <View style={{ borderWidth: 1, borderColor: "orange" }}>
            <Text style={styles.title}>Pickup Address:</Text>
                  <View style={{ padding: 8 }}>                      
                      <Text>Address Line1: {order.pickupAddress.addressLine1}</Text>
                      <Text>Address Line2: {order.pickupAddress.addressLine2}</Text>
                      <Text>City: {order.pickupAddress.city}</Text>
                      <Text>Zip Code: {order.pickupAddress.zip}</Text>
                    </View>
            <Text style={styles.title}>Pickup Schedule:</Text>
                      <View style={{ padding: 8 }}>
                      <Text>Pickup Date: {formatDate(order.pickupSlot.date)}</Text>
                      <Text>Pickup Time: {formatTime(order.pickupSlot.startTime) + " to " + formatTime(order.pickupSlot.endTime)}</Text>
                  </View>
                  <Text style={styles.title}>Item List:</Text>
                  <View>
                      {order.items.map((item) => {
                          return (<View class={styles.itemContainer} key={ item.id}><Text class={styles.item}>{item.name}</Text><Text class={styles.item}>{item.count}</Text></View>)
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
    height: height,
    padding: 8,
    alignContent: "center",
    backgroundColor: "white",
  },
  titleContainer: {
    justifyContent: "center",
    alignItems: "center",
    margin: 8,
  },
  title: {
    alignSelf: "center",
    margin: 8,
    fontSize: 16,
    fontWeight: "bold",
  },
  body: {
    margin: 10,
    alignItems: "center",
    flexDirection: "row",
    },

    itemContainer: {
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row"
    },
    item: {
        alignSelf: "flex-end",
        flexDirection: "row"
    },
});

export default ConfirmOrder;
