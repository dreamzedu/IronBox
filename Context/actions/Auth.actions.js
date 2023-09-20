import jwt_decode from "jwt-decode"
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from "react-native-toast-message"
import baseURL from "../../assets/common/baseUrl"

export const SET_CURRENT_USER = "SET_CURRENT_USER";
export const SET_USER_PROFILE = "SET_USER_PROFILE";

export const loginUser = (user, dispatch) => {
    console.log("Login called");
    fetch(`${baseURL}users/login`, {
        method: "POST",
        body: JSON.stringify(user),
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
    })
    .then((res) => res.json())
        .then((data) => {
            console.log("Data received");
            if (data) {
                console.log("Data "+ data);
            const token = data.token;
                AsyncStorage.setItem("jwt", token);
                AsyncStorage.setItem("userProfile", JSON.stringify(data.user));
            const decoded = jwt_decode(token)
            console.log(decoded);
                dispatch(setCurrentUser(decoded, data.user))
        } else {
           logoutUser(dispatch)
        }
    })
    .catch((err) => {
        Toast.show({
            topOffset: 60,
            type: "error",
            text1: "Please provide correct credentials",
            text2: ""
        });
        logoutUser(dispatch)
    });
};

export const getUserProfile = (id) => {
    fetch(`${baseURL}users/${id}`, {
        method: "GET",
        body: JSON.stringify(user),
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
    })
    .then((res) => res.json())
    .then((data) => console.log(data));
}

export const logoutUser = (dispatch) => {
    AsyncStorage.removeItem("jwt");
    dispatch(setCurrentUser({}))
}

export const setCurrentUser = (decoded, user) => {
    console.log("setCurrentUser"+ user)
    return {
        type: SET_CURRENT_USER,
        payload: decoded,
        userProfile: user
    }
}

export const setUserProfile = (user) => {
    console.log("setUserProfile" + user)
    return {
        type: SET_USER_PROFILE,
        userProfile: user
    }
}