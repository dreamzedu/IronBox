import React, {  useState  } from "react";
import { View, Dimensions, StyleSheet, ActivityIndicator } from 'react-native';
import SchedulePickup from '../Checkout/SchedulePickup';
import { updateOrderPickupSchedule } from '../../Services/data-service';
import Toast from "react-native-toast-message";

var { height, width } = Dimensions.get("window")


const AdminUpdatePickupSchedule = (props) => {

    const [loading, setLoading] = useState(false);

    const updatePickupSchedule = (order) => {
        //console.log(order );
        try {
            setLoading(true);
            updateOrderPickupSchedule(order.id, order.pickupSlot).then((res) => {
                setLoading(false);
                Toast.show({
                    type: "success",
                    text1: "Order updated successfully.",
                    text2: "",
                });
                props.navigation.navigate("AdminOrderDetail", { orderId: order.id });
            })
                .catch((error) => {
                    console.log(error);
                    setLoading(false);
                    Toast.show({
                        type: "success",
                        text1: "Something went wrong.",
                        text2: "",
                    });

                })
        }
        catch (error) {
            setLoading(false);
            console.log(error);
        }
    }

    return (
        <>
            <SchedulePickup {...props} updatePickupSchedule={updatePickupSchedule} flow="admin" />
            {loading ?
                <View style={styles.spinner}>
                    <ActivityIndicator size="large" color="red" />
                </View> : null}
        </>
        )
}

const styles = StyleSheet.create({
    
    spinner: {
        height: height / 2,
        alignItems: 'center',
        justifyContent: 'center'
    },
    container: {
        marginBottom: 160,
        backgroundColor: 'white'
    }
})

export default AdminUpdatePickupSchedule