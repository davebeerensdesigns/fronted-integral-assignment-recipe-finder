import React, {useEffect, useContext, useState} from 'react';
import './App.scss';
import MainNav from "./sidebars/mainNav/MainNav";
import AccountNav from "./sidebars/accountNav/AccountNav";
import Pages from "./pages/pages/Pages";
import {useLocation} from "react-router-dom";
import {AccountTabContext} from "./providers/AccountTabProvider";
import {UserContext} from "./providers/UserProvider";
import AuthService from "./services/auth.service";
import jwt_decode from "jwt-decode";
import UserService from "./services/user.service";
import {toast, ToastContainer} from "react-toastify";

import 'react-toastify/dist/ReactToastify.css';
import toastMessage from "./helpers/toastMessage";
import {MainNavContext} from "./providers/MainNavProvider";
import {classNames} from "./helpers/classNames";

function App() {

    const [userValue, setUserValue] = useContext(UserContext);
    const [accountTab, setAccountTab] = useContext(AccountTabContext);
    const [mainNav, setMainNav] = useContext(MainNavContext);

    const location = useLocation();

    const authVerification = (token) => {
        try {
            const decodedJwt = jwt_decode(token)
            const expiresAt = decodedJwt.exp * 1000
            const currentDate = Date.now()
            if (currentDate >= expiresAt) {
                // token is expired
                AuthService.logout()
                setUserValue(false);
                toastMessage.notifyError('Your token has expired. Log in again.');
            } else {
                UserService.verifyUser().then((response) => {
                    setUserValue(true);
                }).catch((e) => {
                    // token not verified
                    AuthService.logout()
                    setUserValue(false);
                    toastMessage.notifyError('Something went wrong. Log in again.');
                })
            }
        } catch (e) {
            // token not verified
            AuthService.logout()
            setUserValue(false);
            toastMessage.notifyError('Something went wrong. Log in again.');
        }
    }

    useEffect(() => {
        let token = AuthService.getCurrentUser();
        if (token) {
            authVerification(token);
        }
    }, [location, accountTab]);

    return (
        <>
            <ToastContainer/>
            <div id='app__wrapper'
                 className={classNames(
                     mainNav['show'] ? 'main-show' : 'main-hidden',
                     accountTab['show'] ? 'account-show' : 'account-hidden'
                 )}
            >
                <MainNav/>
                <Pages/>
                <AccountNav/>
            </div>
        </>
    );
}

export default App;
