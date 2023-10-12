import React, { useEffect, useContext, useState, useCallback } from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import FormContainer from "../../Shared/Form/FormContainer";
import Input from "../../Shared/Form/Input";
import Error from "../../Shared/Error";
import { useFocusEffect } from "@react-navigation/native"


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
        props.navigation.replace('TabNavigator');
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
              <Button large primary onPress={() => handleSubmit()} title="Login" />
          
      </View>
      <View style={[{ marginTop: 40 }, styles.buttonGroup]}>
        <Text style={styles.middleText}>Don't have an account yet?</Text>
        <Button
        title="Register"
                  onPress={() => props.navigation.navigate("Register")} />

              <Button
                  title="Cancel"
                  onPress={() => cancelLogin()} />
        
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
    marginBottom: 20,
    alignSelf: "center",
  },
});

export default Login;
