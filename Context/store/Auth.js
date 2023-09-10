import React, { useEffect, useReducer, userEffect, useState } from "react";
import jwt_decode from "jwt-decode";
import AsyncStorageProvider from "./AsyncStorageProvider"

import authReducer from "../reducers/Auth.reducer";
import { setCurrentUser } from "../actions/Auth.actions";
import AuthGlobal from './AuthGlobal'

const Auth = props => {
    const [stateUser, dispatch] = useReducer(authReducer, {
        isAuthenticated: null,
        user: {}
    });
    const [showChild, setShowChild] = useState(false);

    useEffect(async () => {
        setShowChild(true);
        let jwt = await AsyncStorageProvider.getData('jwt')
        if (jwt) {
            const decoded = jwt ? jwt : "";
            if (setShowChild) {
                dispatch(setCurrentUserUser(jwt_decode(decoded)))
            }
        }
        return () => setShowChild(false);
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