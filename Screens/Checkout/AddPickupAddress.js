import React, { useEffect, useState, useContext} from 'react'
import { Text, View, Button } from 'react-native'
import FormContainer from '../../Shared/Form/FormContainer'
import Input from '../../Shared/Form/Input'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { saveUserAddress } from '../../Services/data-service';
import AuthGlobal from '../../Context/store/AuthGlobal'
import { Checkbox, CheckboxIndicator, CheckboxIcon, CheckboxLabel, CheckIcon } from '@gluestack-ui/themed';
import { setUserProfile } from '../../Context/actions/Auth.actions'

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
            isPrimary: useAsDefaultAddress,
            user: context.stateUser.user.userId
        }
       
        //props.navigation.navigate("Payment", {order: order })
        if (useAsDefaultAddress) {
            address = await saveUserAddress(address)
            let user = { ...context.stateUser.userProfile, address: address };
            setUserProfile(user, context.dispatch)
            
        }
        let order = props.route.params.order;
        order.pickupAddress = address;
        props.navigation.navigate("Schedule Pickup", { order: order }) 
    }

    return (
        <KeyboardAwareScrollView
            viewIsInsideTabBar={true}
            extraHeight={200}
            enableOnAndroid={true}
        >
            <FormContainer title={"Add Pickup Address"}>
                   <Input
                    placeholder={"Address Line 1"}
                    name={"AddressLine1"}
                    id="1"
                    value={address1}
                    onChangeText={(text) => setAddress1(text)}
                />
                   <Input
                    placeholder={"Address Line 2"}
                    name={"Address Line 2"}
                    value={address2}
                    id="2"
                    onChangeText={(text) => setAddress2(text)}
                />
                   <Input
                    placeholder={"City"}
                    name={"city"}
                    value={city}
                    id="3"
                    onChangeText={(text) => setCity(text)}
                />
                   <Input
                    placeholder={"Zip Code"}
                    name={"zip"}
                    value={zip}
                    id="4"
                    keyboardType={"numeric"}
                    onChangeText={(text) => setZip(text)}
                />
                <View>
                    <Checkbox key="chk1" aria-label="setdeafault" size="md" isInvalid={false} isDisabled={false} value={useAsDefaultAddress} onChange={setUseAsDefaultAddress}>
                        <CheckboxIndicator mr="$2">
                            <CheckboxIcon as={CheckIcon} />
                        </CheckboxIndicator>
                        <CheckboxLabel>Use this as default address</CheckboxLabel>
                    </Checkbox>
                    </View>
                <View style={{ width: '80%', alignItems: "center" }}>
                    <Button title="Confirm" onPress={() => setPickupAddress()}/>
                </View>
            </FormContainer>
            
        </KeyboardAwareScrollView>
    )
}

export default AddPickupAddress