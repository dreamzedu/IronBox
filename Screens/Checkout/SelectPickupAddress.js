import React, { useEffect, useContext} from 'react'
import { Text, View, Button } from 'react-native'
import FormContainer from '../../Shared/Form/FormContainer'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import AuthGlobal from '../../Context/store/AuthGlobal'

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
        >
            <FormContainer title={"Select Pickup Address"}>
                <View style={{ padding: 8 }}>
                    <Text>Address Line1: {address.addressLine1}</Text>
                    <Text>Address Line2: {address.addressLine2}</Text>
                    <Text>City: {address.city}</Text>
                    <Text>Zip Code: {address.zip}</Text>
                </View>
                <View style={{ width: '80%', alignItems: "center" }}>
                    <Button title="Confirm" onPress={() => confirmPickupAddress()}/>
                </View>
                <View style={{ width: '80%', alignItems: "center" }}>
                    <Button title="Use A Different Address" onPress={() => useDifferentPickupAddress()} />
                </View>
            </FormContainer>
            
        </KeyboardAwareScrollView>
    )
}

export default SelectPickupAddress