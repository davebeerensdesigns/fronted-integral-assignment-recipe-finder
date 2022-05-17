import React from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import './App.css';
import MainNav from "./sidebars/mainNav/MainNav";
import AccountNav from "./sidebars/accountNav/AccountNav";
import Pages from "./pages/pages/Pages";


function App() {
  return (
    <div id='app__wrapper'>
        <Router>
            <MainNav/>
            <Pages/>
        </Router>
        <AccountNav/>
    </div>
  );
}

export default App;
