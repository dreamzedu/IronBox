import React, { useContext, useState, useCallback, useEffect } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { useFocusEffect } from "@react-navigation/native"
import AuthGlobal from "../../Context/store/AuthGlobal"
import { Heading, Spinner } from "@gluestack-ui/themed";
import { updateUserProfile } from '../../Services/data-service';
import Toast from "react-native-toast-message";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import FormContainer from "../../Shared/Form/FormContainer";
import Input from "../../Shared/Form/Input";
import Error from "../../Shared/Error";
import { setUserProfile } from '../../Context/actions/Auth.actions'

import { Text, Button, ButtonText } from "@gluestack-ui/themed";

const UpdateUserProfile = (props) => {
    const context = useContext(AuthGlobal)

    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [repassword, setRePassword] = useState("");
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)

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
        if (email === "" || name === "" || phone === "" ) {
            setError("Please fill in the form correctly");
            return;
        }
        else if (repassword?.trim() !== password?.trim()) {
            setError("Password does not match with confirm password");
            return;
        }

        let user = {
            name: name,
            email: email,
            phone: phone,
            password: password?.trim(),
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
                        setLoading(false);
                        props.navigation.replace("User Profile");
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
        <KeyboardAwareScrollView
        viewIsInsideTabBar={true}
        extraHeight={200}
        enableOnAndroid={true}
        >
            {loading ? <Spinner size='small'></Spinner> : null}

                <FormContainer style={styles.container}>

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
                    value={password}
                        secureTextEntry={true}
                        onChangeText={(text) => setRePassword(text)}
                    />

                    <View style={styles.buttonGroup}>
                        {error ? <Error message={error} /> : null}
                    </View>
                <View>
                    <Button style={{ margin: 10 }} onPress={() => updateProfile()} >
                        <ButtonText>Update</ButtonText>
                    </Button>
                    </View>

                </FormContainer>
            
    </KeyboardAwareScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center"
    },
    subContainer: {
        alignItems: "center",
        marginTop: 60
    },
    order: {
        marginTop: 20,
        alignItems: "center",
        marginBottom: 60
    }
})

export default UpdateUserProfile;