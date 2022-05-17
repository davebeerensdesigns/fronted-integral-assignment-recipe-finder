import React from 'react';
import './App.scss';
import MainNav from "./sidebars/mainNav/MainNav";
import AccountNav from "./sidebars/accountNav/AccountNav";
import Pages from "./pages/pages/Pages";

function App() {

    return (
        <div id='app__wrapper'>
            <MainNav/>
            <Pages/>
            <AccountNav/>
        </div>
    );
}

export default App;
