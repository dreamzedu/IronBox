import React, { useEffect, useState, useContext } from "react";
import { View, StyleSheet, Dimensions, ScrollView } from "react-native";
import { Text, Button, ButtonText, Heading, Spinner, Select, SelectTrigger, SelectInput, SelectIcon, SelectPortal, SelectBackdrop, SelectContent, SelectDragIndicator, SelectDragIndicatorWrapper, SelectItem, ChevronDownIcon, Icon, useToast,  VStack, ToastTitle, ToastDescription } from "@gluestack-ui/themed";
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
    const [processing, setProcessing] = useState(false);

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
          setProcessing(true);
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
                          //props.navigation.pop(2).push("Order Detail", { orderId: order.id });
                          props.navigation.pop();
                          props.navigation.replace("Order Detail", {orderId: order.id});
                         // props.orderCancelled('success', order) // this is the parent view cancelOrder method injected into props

                          setProcessing(false);
                      }, 500);
                  }
                  else {
                      setProcessing(false);
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
                  setProcessing(false);
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
        <View style={styles.container}>
        <ScrollView style={{ backgroundColor:'white' }}>
          
              <View style={[styles.box, styles.roundBorder]}>
                  <OrderCard order={order} navigation={props.navigation} />
              </View>
              <View>
                  <View style={[ styles.info, { marginBottom: 10, marginLeft: 5 }]}>
                  <Text size="sm" ><Text style={{ fontWeight: "bold" }}>Note: </Text>Any cancellation until one hour prior to the pick slot is free of cost, but any cancellation done after that will be charged Rs 50.</Text>
                  </View>
                  <Text style={styles.title}>Select reason for cancellation</Text>
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
                    
                    <Button onPress={() => cancelOrder()} isDisabled={ processing} >
                        <ButtonText fontWeight="$medium" fontSize="$md">Cancel Order</ButtonText>
                        
                    </Button>
                    {processing ? <Spinner size='large'></Spinner> : null}
              </View>
              <View style={{ alignItems: "center", margin: 20 }}>
                  <Text style={{color:'red'}}>{error}</Text>
              </View>
      
            </ScrollView>
        </View>
  );
};


const styles = StyleSheet.create({
  container: {
        padding: 10,
      margin:0,
    alignContent: "center",
        backgroundColor: "white",
    height:height,
  },
  titleContainer: {
    justifyContent: "center",
    alignItems: "center",
    margin: 8,
  },
  title: {
    marginTop: 10,
    fontSize: 18,
    fontWeight: "bold",
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

    box: {
        display: 'flex',
        flexDirection: "column",
        backgroundColor: "white",
        marginBottom: 10,
    },
    roundBorder:
    {
        borderRadius: 8,
        borderColor: "gainsboro",
        borderWidth: 1,
        padding: 10
    },
     info:
    {
        backgroundColor: '#fafad2',
        margin: 10,
        elevation: 2,
        padding: 10
    }
});

export default CancelOrder;
