import React, { useEffect, useContext} from 'react'
import { View, StyleSheet } from 'react-native'
import { Text, Button, ButtonText } from "@gluestack-ui/themed";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import AuthGlobal from '../../Context/store/AuthGlobal'
import AddressCard from '../../Shared/AddressCard'

const SelectPickupAddress = (props) => {

    const context = useContext(AuthGlobal);
    const address = props.route.params.order.pickupAddress;

    useEffect(() => {
        if (!context.stateUser.isAuthenticated) {            
         
            props.navigation.navigate("Login", {msg: "You must login for this."});
        }
    }, []);

    const confirmPickupAddress = () => {
       
        props.navigation.navigate("Schedule Pickup", { order: props.route.params.order})
        //props.navigation.navigate("Payment", {order: order })
    }

    const useDifferentPickupAddress = () => {
        props.navigation.navigate("Add Pickup Address", { order: props.route.params.order });
    }

    return (
        <KeyboardAwareScrollView
            viewIsInsideTabBar={true}
            extraHeight={200}
            enableOnAndroid={true}
            style={{ backgroundColor:"white" }} >
            <View style={styles.container}>
                <Text style={styles.title}>Pickup Address</Text>
                <View style={[styles.box, styles.margin]}>
                    <AddressCard address={address} />
                </View>
                <View style={styles.center}>
                    <View style={{ marginTop: 5, marginBottom: 10 }}>
                        <Button onPress={() => confirmPickupAddress()} >
                            <ButtonText fontWeight="$medium" fontSize="$md">Confirm</ButtonText>
                        </Button>
                    </View>
                    <View >
                        <Button variant="link" onPress={() => useDifferentPickupAddress()} >
                            <ButtonText fontWeight="$medium" fontSize="$md">Use Different Address</ButtonText>
                        </Button>
                    </View>
                </View>

            </View>
        </KeyboardAwareScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
        margin: 10,
        borderRadius: 10,
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
    center:
    {
        alignItems: 'center'
    }
   
});

export default SelectPickupAddress