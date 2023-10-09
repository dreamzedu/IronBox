import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { Select, SelectTrigger, SelectInput, SelectIcon, SelectPortal, SelectBackdrop, SelectContent, SelectDragIndicator, SelectDragIndicatorWrapper, SelectItem, ChevronDownIcon, Icon} from "@gluestack-ui/themed";

import TrafficLight from "./StyledComponents/TrafficLight";
import EasyButton from "./StyledComponents/EasyButton";
import Toast from "react-native-toast-message";
import { updateOrderStatus, getOrderStatuses } from '../Services/data-service';


let orderStatuses = [];

const OrderCard = (props) => {
    
    const [orderStatus, setOrderStatus] = useState();
    const [statusChange, setStatusChange] = useState();
    const [cardColor, setCardColor] = useState();

  useEffect(() => {
      orderStatuses = getOrderStatuses();

      switch (props.order.status.code) {
          case 1:
          case 2:
              setOrderStatus(<TrafficLight unavailable></TrafficLight>);
              setCardColor("#E74C3C");
              break;
          case 3:
          case 4:    
              setOrderStatus(<TrafficLight limited></TrafficLight>);
              setCardColor("#F1C40F");
              break;
          case 5:
              setOrderStatus(<TrafficLight available></TrafficLight>);
              setCardColor("#2ECC71");
              break;
          case 6:
          case 7:
              setOrderStatus(<TrafficLight cancelled></TrafficLight>);
              setCardColor("#808080");
              break;
          default:
              setOrderStatus(<TrafficLight cancelled></TrafficLight>);
              setCardColor("#808080");
              break;

      }

    return () => {
      setOrderStatus();
      setCardColor();
    };
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

  return (
    <View style={[{ backgroundColor: cardColor }, styles.container]}>
      <View style={styles.container}>
              <Text>{props.order.product.name}</Text>
              <Text>Order Number: #{props.order.id}</Text>
      </View>
      <View style={{ marginTop: 10 }}>
              <Text>Status: {props.order.status.name} {orderStatus}</Text>
            <Text>Date Ordered: {props.order.dateOrdered.split("T")[0]}</Text>
            <Text>Total Cost: </Text>
            <Text style={styles.price}>Rs {props.order.totalPrice}.00</Text>
        </View>
        {props.editMode ? (
              <View>
                  <Select onValueChange={(e) => setStatusChange(e)} selectedValue={statusChange}>
                      <SelectTrigger variant="outline" size="md" >
                          <SelectInput placeholder="Change Status" />
                          <SelectIcon mr="$3">
                              <Icon as={ChevronDownIcon} />
                          </SelectIcon>
                      </SelectTrigger>
                      <SelectPortal>
                          <SelectBackdrop />
                          <SelectContent>
                              <SelectDragIndicatorWrapper>
                                  <SelectDragIndicator />
                              </SelectDragIndicatorWrapper>
                              {orderStatuses.map((c) => {
                                  return (
                                      <SelectItem key={c.code} label={c.name} value={c.name} />
                                  );
                              })}
                             
                          </SelectContent>
                      </SelectPortal>
                  </Select>
            
            <EasyButton secondary large onPress={() => updateOrder()}>
              <Text style={{ color: "white" }}>Update</Text>
            </EasyButton>
          </View>
          ) : null}

          <Button title="View Detail" onPress={() => props.navigation.navigate("Order Detail", {orderId: props.order.id})} />
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    margin: 10,
    borderRadius: 10,
  },
  title: {
    backgroundColor: "#62B1F6",
    padding: 5,
  },
  priceContainer: {
    marginTop: 10,
    alignSelf: "flex-end",
    flexDirection: "row",
  },
  price: {
    color: "white",
    fontWeight: "bold",
  },
});

export default OrderCard;
