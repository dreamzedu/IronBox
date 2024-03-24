import React, { useContext, useState, useCallback, useEffect } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { useFocusEffect } from "@react-navigation/native"
import AuthGlobal from "../../Context/store/AuthGlobal"
import { Text, Button, ButtonText,Heading, Spinner, Checkbox, CheckboxIcon, CheckboxLabel, CheckIcon, CheckboxIndicator } from "@gluestack-ui/themed";
import { updateUserProfile } from '../../Services/data-service';
import Toast from "react-native-toast-message";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import FormContainer from "../../Shared/Form/FormContainer";
import Input from "../../Shared/Form/Input";
import Error from "../../Shared/Error";
import { setUserProfile } from '../../Context/actions/Auth.actions'
import * as commonstyles from "../../common-styles";


const UpdateUserProfile = (props) => {
    const context = useContext(AuthGlobal)

    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [repassword, setRePassword] = useState("");
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)
    const [resetPassword, setResetPassword] = useState(false);

    useFocusEffect(useCallback(() => {

        if (!context.stateUser || context.stateUser.isAuthenticated === null || context.stateUser.isAuthenticated === false) {
            //props.navigation.navigate("LoginNavigator")
            props.navigation.replace("LoginNavigator", { screen: "Login", params: { returnPage: 'User Profile', msg: "you must login for this" } });
        }
        else {
            setEmail(context.stateUser.userProfile.email);
            setName(context.stateUser.userProfile.name);
            setPhone(context.stateUser.userProfile.phone);
        }

        return () => {
            setLoading(false);
            setError(false);
        }

    }, []));

    const updateProfile =()=>
    {
        if (email.trim() === "" || name.trim() === "" || phone.trim() === "" ) {
            setError("Please fill in the required fields");
            return;
        }

        if (resetPassword) {
            if (password?.trim() === "") {
                setError("Please enter the New Password.");
                return;
            }
            if (repassword?.trim() === "") {
                setError("Please enter the Confirm New Password.");
                return;
            }
            if (password?.trim().length < 6 || password?.trim().length > 15) {
                setError("The Password should be betwwn 6 to 15 characters only.");
                return;
            }
            if (repassword?.trim() !== password?.trim()) {
                setError("Password does not match with Confirm Password");
                return;
            }
        }

        let user = {
            name: name,
            email: email,
            phone: phone,
            password: resetPassword ? password?.trim() : '',
            isAdmin: context.stateUser.user.isAdmin,
            isAgent: context.stateUser.user.isAgent
        };
        setLoading(true);
        updateUserProfile(context.stateUser.user.userId, user)
            .then((res) => {
                if (res.success) {
                    let userProfile = {
                        ...context.stateUser.userProfile, name: name,
                        email: email,
                        phone: phone
                    };

                    
                    setUserProfile(userProfile, context.dispatch)

                    Toast.show({
                        type: "success",
                        text1: "Profile updated successfully.",
                        text2: "",
                    });
                    setTimeout(() => {                        
                        props.navigation.navigate("User Profile");
                        setLoading(false);
                    }, 500);
                }
            })
            .catch((error) => {
                console.log(error)
                setLoading(false);
                Toast.show({
                    type: "error",
                    text1: "Something went wrong",
                    text2: "Please try again",
                });
            });
    };

    return (
        <View style={commonstyles.container}>
        <KeyboardAwareScrollView
            viewIsInsideTabBar={true}
            extraHeight={200}
            enableOnAndroid={true}
            style={{ backgroundColor:'white' }}
        >
                {loading ? <Spinner size='large'></Spinner> :

                    <FormContainer >

                        <Input
                            placeholder={"Name"}
                            name={"name"}
                            id={"name"}
                            value={name}
                            onChangeText={(text) => setName(text)}
                        />
                        <Input
                            placeholder={"Phone Number"}
                            name={"phone"}
                            id={"phone"}
                            value={phone}
                            keyboardType={"numeric"}
                            onChangeText={(text) => setPhone(text)}
                        />
                        <Input
                            placeholder={"Email"}
                            name={"email"}
                            id={"email"}
                            value={email}
                            onChangeText={(text) => setEmail(text.toLowerCase())}
                        />
                        <View style={{ marginTop: 25 }}>
                            <Checkbox key="chk1" aria-label="setdeafault" size="md" isInvalid={false} isDisabled={false} value={resetPassword} onChange={setResetPassword}>
                                <CheckboxIndicator mr="$2">
                                    <CheckboxIcon as={CheckIcon} />
                                </CheckboxIndicator>
                                <CheckboxLabel>Reset password</CheckboxLabel>
                            </Checkbox>
                        </View>
                        <Input
                            placeholder={"New Password"}
                            name={"password"}
                            id={"password"}
                            value={password}
                            secureTextEntry={true}
                            onChangeText={(text) => setPassword(text)}
                        />
                        <Input
                            placeholder={"Confirm New Password"}
                            name={"retypePassword"}
                            id={"retypePassword"}
                            value={repassword}
                            secureTextEntry={true}
                            onChangeText={(text) => setRePassword(text)}
                        />

                        <View style={styles.buttonGroup}>
                            {error ? <Error message={error} /> : null}
                        </View>

                    </FormContainer>
                }
            </KeyboardAwareScrollView>
            <View style={ commonstyles.footer}>
                <Button variant='link' onPress={() => updateProfile()} isDisabled={processing}>
                    <ButtonText color="$white" fontWeight="$medium" fontSize="$md">Update</ButtonText>
                </Button>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center"
    },
     
})

export default UpdateUserProfile;