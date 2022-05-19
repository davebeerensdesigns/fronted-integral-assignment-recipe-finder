import React, {useEffect, useContext} from 'react';
import './App.scss';
import MainNav from "./sidebars/mainNav/MainNav";
import AccountNav from "./sidebars/accountNav/AccountNav";
import Pages from "./pages/pages/Pages";
import {useLocation} from "react-router-dom";
import AuthVerify from "./common/AuthVerify";
import {UserContext} from "./providers/UserProvider";
import AccountTabProvider from "./providers/AccountTabProvider";
import MainNavProvider from "./providers/MainNavProvider";

function App() {

    const [userContext, setUserContext] = useContext(UserContext);

    const location = useLocation();

    useEffect(() => {
        let status = AuthVerify();
        if(status){
            setUserContext({
                loggedIn: false
            });
        }
    }, [location, userContext]);

    return (
        <div id='app__wrapper'>
            <MainNavProvider>
                <MainNav/>
            </MainNavProvider>
            <Pages/>
            <AccountTabProvider>
                <AccountNav/>
            </AccountTabProvider>
        </div>
    );
}

export default App;
