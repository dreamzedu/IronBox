import React, { useEffect, useState, useContext} from 'react'
import { Text, View, Button } from 'react-native'
import FormContainer from '../../Shared/Form/FormContainer'
import Input from '../../Shared/Form/Input'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { saveUserAddress } from '../../Services/data-service';
import AuthGlobal from '../../Context/store/AuthGlobal'
import { Checkbox } from 'native-base';
import { setUserProfile } from '../../Context/actions/Auth.actions'
import AsyncStorage from '@react-native-async-storage/async-storage';

const AddPickupAddress = (props) => {    

    const [ address1, setAddress1 ] = useState();
    const [ address2, setAddress2 ] = useState();
    const [ city, setCity ] = useState();
    const [zip, setZip] = useState();
    const [useAsDefaultAddress, setUseAsDefaultAddress] = useState(false);    
    const context = useContext(AuthGlobal);

    useEffect(() => {
        if (context.stateUser.isAuthenticated !== true) {            
           
            props.navigation.navigate("Login", {msg: "You must login to perform this action."});
        }
    }, []);

    const setPickupAddress = async () => {
        let address = {
            city,
            addressLine1: address1,
            addressLine2: address2,
            zip,
            isPrimary: useAsDefaultAddress
        }
       
        //props.navigation.navigate("Payment", {order: order })
        if (useAsDefaultAddress) {
            address = await saveUserAddress({ ...address, user: context.stateUser.user.userId })
            let user = { ...context.stateUser.userProfile, address: address };
            AsyncStorage.setItem("userProfile", JSON.stringify(user));
            setUserProfile(user, context.dispatch)
            
        }
        let order = props.route.params.order;
        order.AddPickupAddress = address;
        props.navigation.navigate("Schedule Pickup", { order: order }) 
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
                <View><Checkbox shadow={2} value={useAsDefaultAddress} onChange={setUseAsDefaultAddress} accessibilityLabel="Use this as default address" >
                    Use this as default address
                </Checkbox></View>
                <View style={{ width: '80%', alignItems: "center" }}>
                    <Button title="Confirm" onPress={() => setPickupAddress()}/>
                </View>
            </FormContainer>
            
        </KeyboardAwareScrollView>
    )
}

export default AddPickupAddress