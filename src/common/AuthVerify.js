import React, {useContext} from 'react';
import jwt_decode from 'jwt-decode';
import AuthService from "../services/auth.service";

const AuthVerify = () => {

    const user = localStorage.getItem('token');
    if (user) {
        const token = user.substring(7, user.length);
        const decodedJwt = jwt_decode(token);
        if (decodedJwt.exp * 1000 < Date.now()) {
            AuthService.logout();
            return true;
        }
        return false;
    }
    return false;
};

export default AuthVerify;