import React, { useEffect, useReducer, userEffect, useState } from "react";
import jwt_decode from "jwt-decode";
import AsyncStorage from '@react-native-async-storage/async-storage';

import authReducer from "../reducers/Auth.reducer";
import { setCurrentUser } from "../actions/Auth.actions";
import AuthGlobal from './AuthGlobal'

const Auth = props => {
    const [stateUser, dispatch] = useReducer(authReducer, {
        isAuthenticated: null,
        user: {}
    });
    const [showChild, setShowChild] = useState(false);

    useEffect(() => {
        setShowChild(true);
        AsyncStorage.getItem('jwt').then(async(jwt) => {
            if (jwt) {
                const decoded = jwt ? jwt : "";
                if (setShowChild) {
                    let user = await AsyncStorage.getItem("userProfile");
                    console.log("user in Auth-" + user);
                    dispatch(setCurrentUser(jwt_decode(decoded), JSON.parse(user)));
                }
            }
            return () => setShowChild(false);
        });
    }, [])


    if (!showChild) {
        return null;
    } else {
        return (
            <AuthGlobal.Provider
                value={{
                    stateUser,
                    dispatch
                }}
            >
                {props.children}
            </AuthGlobal.Provider>
        )
    }
};

export default Auth;