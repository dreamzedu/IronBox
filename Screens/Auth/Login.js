import React, { useEffect, useContext, useState, useCallback } from "react";
import { View, StyleSheet } from "react-native";
import FormContainer from "../../Shared/Form/FormContainer";
import Input from "../../Shared/Form/Input";
import Error from "../../Shared/Error";
import { useFocusEffect } from "@react-navigation/native"
import { Text, Spinner, Button, ButtonIcon, ButtonText, ArrowRightIcon, ArrowLeftIcon } from "@gluestack-ui/themed";


// Context
import AuthGlobal from "../../Context/store/AuthGlobal";
import { loginUser } from "../../Context/actions/Auth.actions";

const Login = (props) => {
  const context = useContext(AuthGlobal);
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
    const [error, setError] = useState("");
    const [msg, setMessage] = useState("");

  //useEffect(() => {
  //    if (context.stateUser.isAuthenticated === true) {
  //        if (props.route.params && props.route.params.returnPage) {
  //            props.navigation.navigate(props.route.params.returnPage);
  //        }
  //        else {
  //            props.navigation.navigate("User Profile");
  //        } 
  //    }

  //    if (props.route.params != null && props.route.params.msg !== null) {
  //        setMessage(props.route.params.msg);
  //    }

  //    return () => {
  //        setPassword("");// Clear the password from state after login
  //    }

  //}, [context.stateUser.isAuthenticated]);

    useFocusEffect(useCallback(() => {

        if (context.stateUser.isAuthenticated) {
            navigateBack();
        }

        if (props.route.params != null && props.route.params.msg !== null) {
            setMessage(props.route.params.msg);
        }

        return () => {
            setPassword("");// Clear the password from state after login
        }

    }, [context.stateUser.isAuthenticated]));


    const navigateBack = () => {        
        if (props.route.params && props.route.params.returnPage) {
            props.navigation.navigate(props.route.params.returnPage);
            props.route.params = null;
        }
        else {
            props.navigation.navigate("Home");
        }
    }

    const cancelLogin = () => {        
        //props.navigation.navigate(props.route.params.returnPage);
        props.navigation.navigate("TabNavigator", { screen: "Home" });
    }

  const handleSubmit = () => {
    const user = {
      phone,
      password,
    };

      if (password === "" || phone === "") {
      setError("Please fill in your credentials");
    } else {
          loginUser(user, context.dispatch);
          
    }
  };

  return (
      <FormContainer title={"Login"}>
          <View><Text>{ }</Text></View>
      <Input
        placeholder={"Enter Phone"}
        name={"phone"}
        id={"phone"}
        value={phone}
        onChangeText={(text) => setPhone(text.toLowerCase())}
      />
      <Input
        placeholder={"Enter Password"}
        name={"password"}
        id={"password"}
              value={password}
              secureTextEntry={true}
        onChangeText={(text) => setPassword(text)}
      />
      <View style={styles.buttonGroup}>
              {error ? <Error message={error} /> : null}
              <Button
                  size="md"
                  variant="solid"
                  action="primary"
                  isDisabled={false}
                  isFocusVisible={false}
                  onPress={() => handleSubmit()}
              >
                  <ButtonText>Login </ButtonText>
              </Button>
              <Button variant="link" onPress={() => cancelLogin()}>
                  <ButtonText
                      fontWeight="$medium"
                      fontSize="$sm"
                  >
                      Cancel
                    </ButtonText>
              </Button>
          
      </View>
      <View style={[{ marginTop: 46 }, styles.buttonGroup]}>
              <Text style={styles.middleText}>Don't have an account yet?</Text>
              <Button variant="link" onPress={() => props.navigation.navigate("Register")}>
                  <ButtonText
                      fontWeight="$medium"
                      fontSize="$sm"
                  >
                      Register
                    </ButtonText>
              </Button>        
      </View>
    </FormContainer>
  );
};

const styles = StyleSheet.create({
  buttonGroup: {
    width: "80%",
    alignItems: "center",
  },
  middleText: {
    alignSelf: "center",
  },
});

export default Login;
