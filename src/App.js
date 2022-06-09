import React, {useEffect, useContext} from 'react';
import './App.scss';
import MainNav from "./pages/sidebar/mainNav/MainNav";
import AccountNav from "./pages/sidebar/accountNav/AccountNav";
import Pages from "./pages/page/Pages";
import {useLocation} from "react-router-dom";
import {AccountTabContext} from "./utils/providers/AccountTabContextProvider";
import {UserContext} from "./utils/providers/UserContextProvider";
import AuthService from "./services/auth.service";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import {MainNavContext} from "./utils/providers/MainNavContextProvider";
import {classNames} from "./helpers/classNames";
import AvatarContextProvider from "./utils/providers/AvatarContextProvider";
import {authVerification} from "./services/auth.verification";

function App() {

    // TODO: improve styling for responsive breakpoints
    // TODO: style register account component
    // TODO: file cleanup/restructure

    const [userValue, setUserValue] = useContext(UserContext);
    const [accountTab, setAccountTab] = useContext(AccountTabContext);
    const [mainNav] = useContext(MainNavContext);

    const location = useLocation();

    useEffect(() => {
        let token = AuthService.getCurrentUser();
        if (token) {
            authVerification([userValue, setUserValue], token);
        }
    }, [location, accountTab, userValue, setUserValue]);

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
                <AvatarContextProvider>
                    <Pages/>
                    <AccountNav/>
                </AvatarContextProvider>
                <span className='backdrop'
                      onClick={() => {
                          setAccountTab(arr => ({...arr, show: !arr.show}))
                      }}/>
            </div>
        </>
    );
}

export default App;
