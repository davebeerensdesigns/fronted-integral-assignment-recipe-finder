import React from 'react';
import {BrowserRouter} from "react-router-dom";
import './App.css';
import MainNav from "./sidebars/mainNav/MainNav";
import AccountNav from "./sidebars/accountNav/AccountNav";
import Page from "./pages/page/Page";


function App() {
  return (
    <div id='app__wrapper'>
        <BrowserRouter>
            <MainNav/>
            <Page/>
            <AccountNav/>
        </BrowserRouter>
    </div>
  );
}

export default App;
