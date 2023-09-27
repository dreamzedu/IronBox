import React, { useEffect, useState, useContext} from 'react'
import { Text, View, Button } from 'react-native'
import FormContainer from './Form/FormContainer'
import Input from '../../Shared/Form/Input'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { saveAddress } from '../Services/data-service';
import AuthGlobal from '../Context/store/AuthGlobal'
import { Checkbox } from '@gluestack-ui/themed';

const Address = (props) => {    

    const [ address1, setAddress1 ] = useState();
    const [ address2, setAddress2 ] = useState();
    const [ city, setCity ] = useState();
    const [zip, setZip] = useState();
    const [useAsDefaultAddress, setUseAsDefaultAddress] = useState(false);    
    const context = useContext(AuthGlobal);

    
    const saveAddress = () => {
        let address = {
            city,
            addressLine1: address1,
            addressLine2: address2,
            zip,
            isPrimary: useAsDefaultAddress
        }
        props.navigation.navigate("Schedule Pickup", { order: {address: address}})
        //props.navigation.navigate("Payment", {order: order })
        if (context.stateUser.isAuthenticated === true) {
            console.log(context.stateUser);
            var address = saveUserAddress(context.stateUser.user.userId);
            console.log(address);
        }
        else {
            props.navigation.navigate("Login", { params: "You must login to perform this action." });
        }
        
    }

    return (
        <KeyboardAwareScrollView
            viewIsInsideTabBar={true}
            extraHeight={200}
            enableOnAndroid={true}
        >
            <FormContainer title={"Address"}>
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
                <View><Checkbox shadow={2} value={useAsDefaultAddress} onChange={setUseAsDefaultAddress} accessibilityLabel="Use this as default address" defaultIsChecked>
                    Use this as default address
                </Checkbox></View>
                <View style={{ width: '80%', alignItems: "center" }}>
                    <Button title={props.isEdit ? "Update" : "Save"} onPress={() => saveAddress()}/>
                </View>
            </FormContainer>
            
        </KeyboardAwareScrollView>
    )
}

export default Address