import React, { useEffect, useState, useContext} from 'react'
import { View } from 'react-native'
import FormContainer from '../../Shared/Form/FormContainer'
import Input from '../../Shared/Form/Input'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { saveUserAddress } from '../../Services/data-service';
import AuthGlobal from '../../Context/store/AuthGlobal'
import {Text, Checkbox, CheckboxIndicator, Button, ButtonText, CheckboxIcon, CheckboxLabel, CheckIcon } from '@gluestack-ui/themed';
import { setUserProfile } from '../../Context/actions/Auth.actions'
import Error from "../../Shared/Error";
import { connect } from "react-redux";
import * as actions from "../../Redux/Actions/orderActions";
import * as commonstyles from "../../common-styles";

const AddPickupAddress = (props) => {    

    const [ address1, setAddress1 ] = useState('');
    const [ address2, setAddress2 ] = useState('');
    const [ city, setCity ] = useState('');
    const [zip, setZip] = useState('');
    const [useAsDefaultAddress, setUseAsDefaultAddress] = useState(false);    
    const context = useContext(AuthGlobal);
    const [error, setError] = useState("");
    const [error1, setError1] = useState("");

    useEffect(() => {
        console.log("Add Item reloaded...")
        setError('');
        setError1('');
        if (context.stateUser.isAuthenticated !== true) {            
           
            props.navigation.navigate("Login", {msg: "You must login to perform this action."});
        }
    }, []);

    const setPickupAddress = async () => {
        let address = {
            city:city,
            addressLine1: address1,
            addressLine2: address2,
            zip:zip,
            isPrimary: useAsDefaultAddress,
            user: context.stateUser.user.userId
        }

        if (city.trim() === '' || address1.trim() === '' || address2.trim === '' || zip.trim() === '') {
            setError('All fields are mandatory.')
            setError1('Please enter all fields to proceed.')
            return;
        }

        //props.navigation.navigate("Payment", {order: order })
        if (useAsDefaultAddress) {
            address = await saveUserAddress(address)
            let user = { ...context.stateUser.userProfile, address: address };
            setUserProfile(user, context.dispatch)
            
        }
        let order = props.order;
        order.pickupAddress = address;
        props.updateOrder(order);
        props.navigation.navigate("Schedule Pickup") 
    }

    return (
        <View style={commonstyles.container}>
        <KeyboardAwareScrollView
            viewIsInsideTabBar={true}
            extraHeight={200}
            enableOnAndroid={true}
            style={{ backgroundColor: 'white' }}
        >
            <View >
            <FormContainer >
                
                   <Input
                            placeholder={"Address Line 1"}
                            name={"AddressLine1"}
                            id="1"
                            value={address1}
                            onChangeText={(text) => { setError(''); setError1(''); setAddress1(text) }}
                />
                   <Input
                            placeholder={"Address Line 2"}
                            name={"Address Line 2"}
                            value={address2}
                            id="2"
                            onChangeText={(text) => { setError(''); setError1(''); setAddress2(text) }}
                />
                   <Input
                            placeholder={"City"}
                            name={"city"}
                            value={city}
                            id="3"
                            onChangeText={(text) => { setError(''); setError1(''); setCity(text) }}
                />
                   <Input
                            placeholder={"Zip Code"}
                            name={"zip"}
                            value={zip}
                            id="4"
                            keyboardType={"numeric"}
                            onChangeText={(text) => { setError(''); setError1(''); setZip(text) }}
                />
                <View>
                    <Checkbox key="chk1" aria-label="setdeafault" size="md" isInvalid={false} isDisabled={false} value={useAsDefaultAddress} onChange={setUseAsDefaultAddress}>
                        <CheckboxIndicator mr="$2">
                            <CheckboxIcon as={CheckIcon} />
                        </CheckboxIndicator>
                        <CheckboxLabel>Use this as default address</CheckboxLabel>
                    </Checkbox>
                </View>
               
                
                    </FormContainer>
                    <View>{error ? <Error message={error} /> : null}</View>
                    <View>{error1 ? <Error message={error1} /> : null}</View>
            </View>
            </KeyboardAwareScrollView>
            <View style={commonstyles.footer}>
                <Button variant='link' onPress={() => setPickupAddress()} >
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

//export default AddPickupAddress
export default connect(mapStateToProps, mapDispatchToProps)(AddPickupAddress);