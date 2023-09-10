import React, { useEffect, useState} from 'react'
import { Text, View, Button } from 'react-native'
import FormContainer from '../../Shared/Form/FormContainer'
import Input from '../../Shared/Form/Input'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'


const PickupAddress = (props) => {    

    const [ address1, setAddress1 ] = useState();
    const [ address2, setAddress2 ] = useState();
    const [ city, setCity ] = useState();
    const [ zip, setZip ] = useState();
    const [ user, setUser ] = useState();

    
    const setPickupAddress = () => {
        let address = {
            city,
            addressLine1: address1,
            addressLine2: address2,
            zip,
        }
        props.navigation.navigate("Schedule Pickup", { order: {address: address}})
        //props.navigation.navigate("Payment", {order: order })
    }

    return (
        <KeyboardAwareScrollView
            viewIsInsideTabBar={true}
            extraHeight={200}
            enableOnAndroid={true}
        >
            <FormContainer title={"Pickup Address"}>
                   <Input
                    placeholder={"Address Line 1"}
                    name={"AddressLine1"}
                    value={address1}
                    onChangeText={(text) => setAddress1(text)}
                />
                   <Input
                    placeholder={"Address Line 2"}
                    name={"Address Line 2"}
                    value={address2}
                    onChangeText={(text) => setAddress2(text)}
                />
                   <Input
                    placeholder={"City"}
                    name={"city"}
                    value={city}
                    onChangeText={(text) => setCity(text)}
                />
                   <Input
                    placeholder={"Zip Code"}
                    name={"zip"}
                    value={zip}
                    keyboardType={"numeric"}
                    onChangeText={(text) => setZip(text)}
                />
                <View style={{ width: '80%', alignItems: "center" }}>
                    <Button title="Confirm" onPress={() => setPickupAddress()}/>
                </View>
            </FormContainer>
        </KeyboardAwareScrollView>
    )
}

export default PickupAddress