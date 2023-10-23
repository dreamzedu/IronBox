import React, { useEffect, useState, useContext } from 'react'
import { Text, View, Button } from 'react-native'
import FormContainer from '../../Shared/Form/FormContainer'
import Input from '../../Shared/Form/Input'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { updateUserAddress, saveUserAddress } from '../../Services/data-service';
import AuthGlobal from '../../Context/store/AuthGlobal'
import { setUserProfile } from '../../Context/actions/Auth.actions'

const AddressEditor = (props) => {

    const address = props.route.params.address;
    const mode = props.route.params.mode;
    const [address1, setAddress1] = useState(address.addressLine1);
    const [address2, setAddress2] = useState(address.addressLine2);
    const [city, setCity] = useState(address.city);
    const [zip, setZip] = useState(address.zip);
    const context = useContext(AuthGlobal);

    useEffect(() => {
        if (context.stateUser.isAuthenticated !== true) {

            props.navigation.navigate("Login", { msg: "You must login to perform this action." });
        }
    }, []);

    const updateAddress = async () => {
        let newAddress = {
            city,
            addressLine1: address1,
            addressLine2: address2,
            zip,
            isPrimary: true,
            user: context.stateUser.user.userId
        }

       if(mode==='edit')
           newAddress = await updateUserAddress(address.id, newAddress)
       else
            newAddress = await saveUserAddress(address.id, newAddress)

        let user = { ...context.stateUser.userProfile, address: newAddress };
        setUserProfile(user, context.dispatch)
        
        props.navigation.replace("User Profile")
    }

    return (
        <KeyboardAwareScrollView
            viewIsInsideTabBar={true}
            extraHeight={200}
            enableOnAndroid={true}
        >
            <FormContainer title={mode==="edit"? "Edit Address": "Add Address"} class={{ alignContent: 'start', justifyContent: 'start' }}>
                <Text>Address Line 1:</Text>
                <Input
                    placeholder={"Address Line 1"}
                    name={"AddressLine1"}
                    id="1"
                    value={address1}
                    onChangeText={(text) => setAddress1(text)}
                />
                <Text>Address Line 2:</Text>
                <Input
                    placeholder={"Address Line 2"}
                    name={"Address Line 2"}
                    value={address2}
                    id="2"
                    onChangeText={(text) => setAddress2(text)}
                />
                <Text>City:</Text>
                <Input
                    placeholder={"City"}
                    name={"city"}
                    value={city}
                    id="3"
                    onChangeText={(text) => setCity(text)}
                />
                <Text>Zip Code:</Text>
                <Input
                    placeholder={"Zip Code"}
                    name={"zip"}
                    value={zip}
                    id="4"
                    keyboardType={"numeric"}
                    onChangeText={(text) => setZip(text)}
                />
                
                <View style={{ width: '80%', alignItems: "center" }}>
                    <Button title="Save" onPress={() => updateAddress()} />
                </View>
            </FormContainer>

        </KeyboardAwareScrollView>
    )
}

export default AddressEditor