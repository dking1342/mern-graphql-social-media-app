import React, { createContext, useReducer } from 'react'
import jwtDecode from 'jwt-decode';
import { CONST } from './reducers/authConstants';
import { authReducer } from './reducers/authReducer';

const checkUser = () => {
    if(localStorage.getItem('userInfo')){
        let { token } = JSON.parse(localStorage.getItem('userInfo'));
        let decodeToken = jwtDecode(token);

        if(decodeToken.exp * 1000 < Date.now()){
            localStorage.removeItem('userInfo');
            return null;
        } else {
            return JSON.parse(localStorage.getItem('userInfo'));
        }
    } else {
        return null;
    }
}

const initialState = {
    user: checkUser()
}

export const AuthContext = createContext({
    user:checkUser(),
    login:(userData) => {},
    logout:()=>{}
});

export const AuthProvider = ({children}) => {
    const [state,dispatch]=useReducer(authReducer,initialState);

    // actions
    const login = userData => {
        dispatch({
            type:CONST.LOGIN,
            payload:userData
        })
        localStorage.setItem('userInfo',JSON.stringify(userData,null,2));
    }

    const logout = () => {
        dispatch({
            type:CONST.LOGOUT
        })
        localStorage.removeItem('userInfo');
    }

    return(
        <AuthContext.Provider
            value={{
                user:state.user,
                login,
                logout
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}