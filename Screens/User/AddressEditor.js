import React, { useEffect, useState, useContext } from 'react'
import { View } from 'react-native'
import FormContainer from '../../Shared/Form/FormContainer'
import Input from '../../Shared/Form/Input'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { updateUserAddress, saveUserAddress } from '../../Services/data-service';
import AuthGlobal from '../../Context/store/AuthGlobal'
import { setUserProfile } from '../../Context/actions/Auth.actions'
import Error from "../../Shared/Error";
import { Text, Button, ButtonText, Spinner } from "@gluestack-ui/themed";
import * as commonstyles from "../../common-styles";
import Toast from "react-native-toast-message";

const AddressEditor = (props) => {

    const address = props.route.params.address;
    const mode = props.route.params.mode;
    const [address1, setAddress1] = useState(address.addressLine1);
    const [address2, setAddress2] = useState(address.addressLine2);
    const [city, setCity] = useState(address.city);
    const [zip, setZip] = useState(address.zip);
    const context = useContext(AuthGlobal);
    const [error, setError] = useState("");
    const [error1, setError1] = useState("");
    const [processing, setProcessing] = useState(false)

    useEffect(() => {
        setError('');
        setError1('');
        if (context.stateUser.isAuthenticated !== true) {

            props.navigation.navigate("Login", { msg: "You must login to perform this action." });
        }
        if (mode === 'edit') {
            props.navigation.setOptions({ title: 'Edit Address' })
        }
        else {
            props.navigation.setOptions({ title: 'Add Address' })
        }
    }, []);

    const updateAddress = async () => {
        try {
            let newAddress = {
                city,
                addressLine1: address1,
                addressLine2: address2,
                zip,
                isPrimary: true,
                user: context.stateUser.user.userId
            }

            if (city.trim() === '' || address1.trim() === '' || address2.trim === '' || zip.trim() === '') {
                setError('All fields are mandatory.')
                setError1('Please enter all fields to proceed.')
                return;
            }

            setProcessing(true);
            if (mode === 'edit') {
                newAddress = await updateUserAddress(address.id, newAddress)
                
            }
            else {
                newAddress = await saveUserAddress(address.id, newAddress)
                
            }

            if (newAddress) {
                let user = { ...context.stateUser.userProfile, address: newAddress };
                setUserProfile(user, context.dispatch)

                Toast.show({
                    type: "success",
                    text1: "Address created/updated successfully.",
                    text2: "",
                });
                setTimeout(() => {
                    props.navigation.navigate("User Profile");
                    setProcessing(false);
                }, 500);
            }
            else {
                setProcessing(false)
            }
        }
        catch (e) {
            setProcessing(false);
            console.log(e);
            Toast.show({
                type: "success",
                text1: "Operation failed! Please try again.",
                text2: "",
            });
        }
    }

    return (
        <View style={commonstyles.container}>
        <KeyboardAwareScrollView
            viewIsInsideTabBar={true}
            extraHeight={200}
            enableOnAndroid={true}
            style={{ backgroundColor:'white' }}
            >
                {processing ? <Spinner size='large'></Spinner> :
                    <View>

                        <FormContainer >

                            <Text >Address Line 1:</Text>
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


                        </FormContainer>
                        <View>{error ? <Error message={error} /> : null}</View>
                        <View>{error1 ? <Error message={error1} /> : null}</View>
                    </View>
                }
            </KeyboardAwareScrollView>
            <View style={commonstyles.footer}>
                <Button variant='link' onPress={() => updateAddress()} isDisabled={processing}>
                    <ButtonText color="$white" fontWeight="$medium" fontSize="$md">Confirm</ButtonText>
                </Button>
            </View>
        </View>
    )
}

export default AddressEditor