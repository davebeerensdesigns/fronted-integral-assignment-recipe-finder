import React, {useEffect, useContext} from 'react';
import './App.scss';
import MainNav from "./sidebars/mainNav/MainNav";
import AccountNav from "./sidebars/accountNav/AccountNav";
import Pages from "./pages/pages/Pages";
import {useLocation} from "react-router-dom";
import AuthVerify from "./common/AuthVerify";
import {UserContext} from "./providers/UserProvider";
import {AccountTabContext} from "./providers/AccountTabProvider";
import MainNavProvider from "./providers/MainNavProvider";

function App() {

    const [userContext, setUserContext] = useContext(UserContext);
    const [accountTab, setAccountTab] = useContext(AccountTabContext);

    const location = useLocation();

    useEffect(() => {
        const status = AuthVerify();
            setUserContext({
                loggedIn: (status ? false : true)
            });
    }, [location, accountTab]);

    return (
        <div id='app__wrapper'>
            <MainNavProvider>
                <MainNav/>
            </MainNavProvider>
            <Pages/>
            <AccountNav/>
        </div>
    );
}

export default App;
