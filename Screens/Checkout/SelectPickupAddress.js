import React, { useEffect, useContext } from 'react'
import { View, StyleSheet, Dimensions } from 'react-native'
import { Text, Button, ButtonText } from "@gluestack-ui/themed";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import AuthGlobal from '../../Context/store/AuthGlobal'
import AddressCard from '../../Shared/AddressCard'
import { connect } from "react-redux";
import * as actions from "../../Redux/Actions/orderActions";
import * as commonstyles from "../../common-styles";

const { width, height } = Dimensions.get("window")
const SelectPickupAddress = (props) => {

    const context = useContext(AuthGlobal);
    //const address = props.route.params.order.pickupAddress;
    const address = props.order?.pickupAddress;

    useEffect(() => {
        console.log("Select Pickup Address reloaded...")
        if (!context.stateUser.isAuthenticated) {

            props.navigation.navigate("Login", { msg: "You must login for this." });
        }
        //address = props.order.pickupAddress;
    }, []);

    const confirmPickupAddress = () => {
        //props.navigation.navigate("Schedule Pickup", { order: props.route.params.order });
        props.navigation.navigate("Schedule Pickup");
        //props.navigation.navigate("Payment", {order: order })
    }

    const useDifferentPickupAddress = () => {
        //props.navigation.navigate("Schedule Pickup", { order: props.route.params.order });
        //props.navigation.navigate("Add Pickup Address", { order: props.route.params.order });
        props.navigation.navigate("Add Pickup Address");
    }

    return (
        <View style={commonstyles.container}>
        <KeyboardAwareScrollView
            viewIsInsideTabBar={true}
            extraHeight={200}
            enableOnAndroid={true}
            
           >
            <View style={styles.subContainer}>
                <Text style={styles.title}>Pickup Address</Text>
                <View style={[styles.box, styles.margin]}>
                    <AddressCard address={address} />
                </View>
                    <View style={commonstyles.center}>
                    <View >
                        <Button variant="link" onPress={() => useDifferentPickupAddress()} >
                            <ButtonText fontWeight="$medium" fontSize="$md">Use Different Address</ButtonText>
                        </Button>
                    </View>
                    
                </View>

            </View>
            
            
            </KeyboardAwareScrollView>
            <View style={commonstyles.footer}>
                <Button variant="link" onPress={() => confirmPickupAddress()} >
                    <ButtonText color="$white" fontWeight="$medium" fontSize="$md">Confirm</ButtonText>
                </Button>
            </View>
            </View>
    )
}


const mapStateToProps = (state) => {
    const { order } = state.order;
    return {
        order: state.order,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        updateOrder: (order) => dispatch(actions.updateOrder(order)),
    }
}

const styles = StyleSheet.create({
    
    subContainer: {
        padding: 10,
        margin: 10,
        borderRadius: 10,
        backgroundColor: 'white',
    },
    title: {
        fontWeight: 'bold',
        fontSize: 18,
        paddingBottom: 10,
    },   
    roundBorder:
    {
        borderRadius: 8,
        borderColor: "gainsboro",
        borderWidth: 1,
        padding: 10
    },
    plainBorder:
    {
        borderColor: "gainsboro",
        borderWidth: 1,
        padding: 10
    },
    box: {
        display: 'flex',
        flexDirection: "column",
        //backgroundColor: "white",
        marginBottom: 10,
    },
    row: {
        display: 'flex',
        flexDirection: "row",
        alignSelf: 'stretch',
        width: '100%',
        flexWrap: "nowrap",
    },
    margin:
    {
        padding: 10,
        marginBottom: 20,
        borderColor: 'silver',
        borderBottomWidth: 1,
        
    },

   
});

//export default SelectPickupAddress
export default connect(mapStateToProps, mapDispatchToProps)(SelectPickupAddress);