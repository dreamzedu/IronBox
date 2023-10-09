import React, { useEffect, useState, useContext } from "react";
import { View, StyleSheet, Dimensions, ScrollView, Button, Text } from "react-native";
import { Heading, Spinner, Select, SelectTrigger, SelectInput, SelectIcon, SelectPortal, SelectBackdrop, SelectContent, SelectDragIndicator, SelectDragIndicatorWrapper, SelectItem, ChevronDownIcon, Icon, useToast,  VStack, ToastTitle, ToastDescription } from "@gluestack-ui/themed";
import Toast from "react-native-toast-message";
import OrderCard from "../../Shared/OrderCard";
import { cancelUserOrder } from '../../Services/data-service';
import AuthGlobal from "../../Context/store/AuthGlobal"

var { width, height } = Dimensions.get("window");

const CancelOrder = (props) => {
    const toast = useToast();
    const context = useContext(AuthGlobal)
  const order = props.route.params.orderData;
    const reasons = [{ code: 1, name: "Placed by mistake" }, { code: 2, name: "Chose wrong pickup date" }, { code: 3, name: "Chose wrong pickup time slot" }, { code: 4, name: "Chose wrong items" }, { code: 5, name: "Other" }];
    const [cancelReason, setCancelReason] = useState();
    const [error, setError] = useState();

  useEffect(() => {
      
  }, []);


    const cancellationReasonChanged = (reason) => {
        setCancelReason(reason);
        setError('');
    }

    const cancelOrder = () => {

        if (
            context?.stateUser?.isAuthenticated === false ||
            context?.stateUser?.isAuthenticated === null
        ) {
            props.navigation.navigate("Login")
        }

      if (!cancelReason || cancelReason === '') {
          setError("Please select a cancellation reason to proceed.");
      }
      else {          
          cancelUserOrder(order.id, cancelReason)
              .then((res) => {
                  if (res.success) {
                      toast.show({
                          placement: "top",
                          render: ({ id }) => {
                              return (<Toast action="success" variant="outline">
                                  <VStack space="xs">
                                      <ToastTitle>Success!</ToastTitle>
                                      <ToastDescription>
                                          {res.message}
                                      </ToastDescription>
                                  </VStack>
                              </Toast>)
                          }
                      });
                      setTimeout(() => {
                          //props.clearCart();
                          console.log("order cancelled" + res.message);
                          props.navigation.navigate("Products");
                      }, 1000);
                  }
                  else {
                      Toast.show({
                          type: "error",
                          text1: "Faild!",
                          text2: res.message,
                          visibilityTime: 4000
                      });
                      //toast.show({
                      //    placement: "top",
                      //    render: ({ id }) => {
                      //        return (<Toast action="error" variant="outline">
                      //            <VStack space="xs">
                      //                <ToastTitle>Failed!</ToastTitle>
                      //                <ToastDescription>
                      //                    {res.message}
                      //                </ToastDescription>
                      //            </VStack>
                      //        </Toast>)
                      //    }
                      //})
                  }

              })
              .catch((error) => {
                  toast.show({
                      placement: "top",
                      render: ({ id }) => {
                          return (<Toast action="error" variant="outline">
                              <VStack space="xs">
                                  <ToastTitle>Failed!</ToastTitle>
                                  <ToastDescription>
                                      Something went wrong. Please try again!
                                  </ToastDescription>
                              </VStack>
                          </Toast>)
                      }
                  })
              });
      }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
          <View style={styles.container}>
              <OrderCard order={order} navigation={props.navigation} />
              <View>
                  <Text>Any cancellation until one hour prior to the pick slot is free of cost, but any cancellation done after that will be charged Rs 50.</Text>
                  <Heading>Select a reason for cancellation</Heading>
                  <Select onValueChange={(e) => cancellationReasonChanged(e)} selectedValue={cancelReason}>
                      <SelectTrigger variant="outline" size="md" >
                          <SelectInput placeholder="Select Reason" />
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
                              {reasons.map((c) => {
                                  return (
                                      <SelectItem key={c.code} label={c.name} value={c.name} />
                                  );
                              })}
                          </SelectContent>
                      </SelectPortal>
                  </Select>
              </View>
              <View style={{ alignItems: "center", margin: 20 }}>
                  <Button title={"Cancel Order"} onPress={cancelOrder} />
              </View>
              <View style={{ alignItems: "center", margin: 20 }}>
                  <Text style={{color:'red'}}>{error}</Text>
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

export default CancelOrder;
