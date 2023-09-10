import React, { useEffect, useState } from "react";
import { View, StyleSheet, Dimensions, ScrollView, Button, Text } from "react-native";

import Toast from "react-native-toast-message";
import axios from "axios";
import baseURL from "../../assets/common/baseUrl";

var { width, height } = Dimensions.get("window");

const ConfirmOrder = (props) => {
  const order = props.route.params.order;

  // Add this
  const [productUpdate, setProductUpdate] = useState();
  useEffect(() => {
      
  }, []);

  
  const placeOrder = () => {
    
    axios
      .post(`${baseURL}orders`, order)
      .then((res) => {
        if (res.status == 200 || res.status == 201) {
          Toast.show({
            topOffset: 60,
            type: "success",
            text1: "Order Completed",
            text2: "",
          });
          setTimeout(() => {
            props.clearCart();
            props.navigation.navigate("Cart");
          }, 500);
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
                        <Text>Address Line1: {order.address.addressLine1}</Text>
                        <Text>Address Line2: {order.address.addressLine2}</Text>
                        <Text>City: {order.address.city}</Text>
                        <Text>Zip Code: {order.address.zip}</Text>            
                    </View>
            <Text style={styles.title}>Pickup slot:</Text>
                      <View style={{ padding: 8 }}>
                          <Text>Pickup Date: {order.pickupSlot.date}</Text>
                          <Text>Pickup Time: {order.pickupSlot.time}</Text>
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
});

export default ConfirmOrder;
