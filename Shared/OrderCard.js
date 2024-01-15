import React, { useEffect, useState } from "react";
import { View, StyleSheet, Button } from "react-native";
import {Text, Heading, Select, SelectTrigger, SelectInput, SelectIcon, SelectPortal, SelectBackdrop, SelectContent, SelectDragIndicator, SelectDragIndicatorWrapper, SelectItem, ChevronDownIcon, Icon} from "@gluestack-ui/themed";

import TrafficLight from "./StyledComponents/TrafficLight";
import EasyButton from "./StyledComponents/EasyButton";
import Title from "./StyledComponents/Title";
import Toast from "react-native-toast-message";
import { updateOrderStatus } from '../Services/data-service';
import { formatDate, formatDateLong } from '../assets/common/formatters'




const OrderCard = (props) => {
    
    const [orderStatus, setOrderStatus] = useState();
    const [statusChange, setStatusChange] = useState();
    const [cardColor, setCardColor] = useState();
    

  useEffect(() => {          

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

    const onStatusChange=(e)=>
    {
        setStatusChange(e)
    }

  return (
    <View style={[{ backgroundColor: 'white' }]}>
          <View style={styles.detailContainer}>
              <View style={styles.row}><Text style={styles.title} size={"md"}>{props.order.product.name}</Text></View>
              <View style={styles.row}><Text style={styles.alignLeft}>Order Number:</Text><Text> #{props.order.UUID}</Text></View>
              <View style={styles.row}><Text style={styles.alignLeft}>Date Ordered:</Text><Text> {formatDate(props.order.dateOrdered.split("T")[0])}</Text></View>
              <View style={styles.row}><Text style={styles.alignLeft}>Total Cost:</Text><Text> 	₹ {props.order.totalPrice}.00</Text></View>
      </View>
          <View style={{ marginTop: 10 }}>
              <View style={styles.row}><Text style={styles.alignLeft}>Status: </Text><Text>{orderStatus} {props.order.status.name} </Text></View>
              {props.editMode ? (
                  <View style={{ display: "flex", flexDirection: "row", alignContent: "stretch" }}>
                      <Select onValueChange={(e) => onStatusChange(e)} selectedValue={statusChange}>
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
                                  {props.orderStatuses.map((c) => {
                                      return (
                                          <SelectItem key={c.code} label={c.name} value={c.id} />
                                      );
                                  })}

                              </SelectContent>
                          </SelectPortal>
                      </Select>
                      <View style={{ paddingBottom: 10, paddingTop:5 }}>
                      <EasyButton secondary large onPress={() => updateOrder()} >
                          <Text style={{ color: "white" }}>Update</Text>
                          </EasyButton>
                      </View>
                  </View>
              ) : null}            
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

export default OrderCard;
