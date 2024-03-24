import React, { useEffect, useState } from "react";
import { View, StyleSheet, Image } from "react-native";
import { Text, Button, ButtonText, Heading } from "@gluestack-ui/themed";



const PaymentCard = (props) => {
            

  useEffect(() => {          

     
  }, []);

    const updateOrder = () => {
        updateOrderStatus(props.order.id, statusChange).then((order) => {
            if (order) {
                Toast.show({
                    topOffset: 60,
                    type: "success",
                    text1: "Order status updated.",
                    text2: "",
                });
            }
            else {
                Toast.show({
                    topOffset: 60,
                    type: "error",
                    text1: "Something went wrong",
                    text2: "Please try again",
                });
            }
        });
    }

    const onStatusChange=(e)=>
    {
        setStatusChange(e)
    }

  return (
    <View style={[{ backgroundColor: 'white' }]}>
          <View style={styles.detailContainer}>
              <View style={[styles.row, {marginBottom:15}]}>
                  <Image style={{ height: 40, width: 40, marginRight: 10 }} resizeMode='contain' source={require('../../assets/done.png')} />
                  <Text size={"md"}>                      
                      Your order# <Text style={{ fontWeight: 'bold' }}> {props.order.UUID}</Text> completed successfully.</Text>
              </View>
              <View style={[styles.row, { marginBottom: 15 }]}><Text style={styles.alignLeft}>Total order value:</Text><Text style={{ fontWeight: 'bold' }}> 	₹ {props.order.totalPrice}.00</Text></View>
              <View style={styles.row}>
              </View>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                  <Button variant='link' onPress={() => props.navigation.navigate("Order Detail", { orderId: props.order.id })}><ButtonText>View Order Details</ButtonText></Button>

                  <Button onPress={() => props.navigation.navigate("Payment", { order: props.order })}><ButtonText>Pay Now</ButtonText></Button>
              </View>

          </View>
                
          
      </View>
  );
}

const styles = StyleSheet.create({
 
    title: {
        fontWeight: 'bold',
        fontSize: 18,
        paddingBottom: 10,
    },

    detailContainer: {
        display: 'flex',
        flexDirection: "column",
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
        flex:1
    },      
   
});

export default PaymentCard;
