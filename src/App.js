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

    // TODO: if there is time left then cleanup code a little bit. only components left.
    // TODO: improve error messages for visitors i.e. wrong password message
    // TODO: improve index.html header
    // TODO: run some tests with google lighthouse
    // TODO: create readme installation file
    // TODO: maybe separate button styling from index.scss

    const [userValue, setUserValue] = useContext(UserContext);
    const [accountTab, setAccountTab] = useContext(AccountTabContext);
    const [mainNav, setMainNav] = useContext(MainNavContext);

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

                          if(accountTab['show'] === true && mainNav['show'] === true){
                              setAccountTab(arr => ({...arr, show: false}))
                          } else if(accountTab['show'] === true) {
                              setAccountTab(arr => ({...arr, show: false}))
                          } else if(mainNav['show'] === true) {
                              setMainNav(arr => ({...arr, show: false}))
                          }
                      }}/>
            </div>
        </>
    );
}

export default App;
