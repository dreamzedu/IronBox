import React, { useState } from "react";
import { View,  StyleSheet } from "react-native";
import FormContainer from "../../Shared/Form/FormContainer";
import Input from "../../Shared/Form/Input";
import Error from "../../Shared/Error";
import Toast from "react-native-toast-message";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Text, Spinner, Button, ButtonIcon, ButtonText, ArrowRightIcon, ArrowLeftIcon } from "@gluestack-ui/themed";

import axios from "axios";
import { baseURL, apiPrefix } from "../../assets/common/baseUrl";

const Register = (props) => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [repassword, setRePassword] = useState("");

  const [error, setError] = useState("");

  const register = () => {
    if (email === "" || name === "" || phone === "" || password === "") {
        setError("Please fill in the form correctly");
        return;
      }
      else if (repassword !== password) {
          setError("Password does not match with confirm password");
          return;
      }

    let user = {
      name: name,
      email: email,
      phone: phone,
      password: password,
      isAdmin: false,
      isAgent:false
    };
    axios
        .post(`${baseURL}${apiPrefix}users/register`, user)
      .then((res) => {
        if (res.status == 200) {
          Toast.show({
            topOffset: 60,
            type: "success",
            text1: "Registration Succeeded",
            text2: "Please Login into your account",
          });
          setTimeout(() => {
            props.navigation.navigate("Login");
          }, 500);
        }
      })
        .catch((error) => {
            console.log(error);
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
      enableOnAndroid={true}
    >
      <FormContainer title={"Register"}>
              <View><Text>{ }</Text></View>
        <Input
          placeholder={"Name"}
          name={"name"}
          id={"name"}
          onChangeText={(text) => setName(text)}
        />
        <Input
          placeholder={"Phone Number"}
          name={"phone"}
          id={"phone"}
          keyboardType={"numeric"}
          onChangeText={(text) => setPhone(text)}
        />
        <Input
            placeholder={"Email"}
            name={"email"}
            id={"email"}
            onChangeText={(text) => setEmail(text.toLowerCase())}
        />
        <Input
            placeholder={"Password"}
            name={"password"}
            id={"password"}
            secureTextEntry={true}
            onChangeText={(text) => setPassword(text)}
              />
              <Input
                  placeholder={"Confirm Password"}
                  name={"retypePassword"}
                  id={"retypePassword"}
                  secureTextEntry={true}
                  onChangeText={(text) => setRePassword(text)}
              />
             
        <View style={styles.buttonGroup}>
          {error ? <Error message={error} /> : null}
        </View>
        <View>
                  <Button onPress={() => register()} >
                      <ButtonText
                          fontWeight="$medium"
                          fontSize="$sm"
                      >
                          Register
                    </ButtonText>
                  </Button>
        </View>
              <View>
                  <Button variant="link" onPress={() => props.navigation.navigate("Login")}>
                      <ButtonText
                          fontWeight="$medium"
                          fontSize="$sm"
                      >
                          Back to Login
                    </ButtonText>
                  </Button>
        </View>
      </FormContainer>
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  buttonGroup: {
    width: "80%",
    margin: 10,
    alignItems: "center",
  },
});

export default Register;
