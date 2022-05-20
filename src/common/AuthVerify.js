import React, {useContext} from 'react';
import jwt_decode from 'jwt-decode';
import AuthService from "../services/auth.service";
import UserService from "../services/user.service";

const AuthVerify = () => {

    const user = localStorage.getItem('token');
    if (user) {
        const decodedJwt = jwt_decode(user);
        const expiresAt = decodedJwt.exp * 1000;
        const currentDate = Date.now();
        if (currentDate >= expiresAt) {
            // token is expired
            AuthService.logout();
            return false;
        } else {
            UserService.verifyUser()
                .then((response) => {
                    if(response.status === 200){
                        // token is verified
                        return true;
                    } else {
                        // token not verified
                        AuthService.logout();
                        return false;
                    }
                })
                .catch(() => {
                    // token not verified
                    AuthService.logout();
                    return false;
                });
        }
    } else {
        // no token found
        return true;
    }
};

export default AuthVerify;