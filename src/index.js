import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter} from "react-router-dom";
import './index.scss';
import App from './App';
import UserContextProvider from "./utils/providers/UserContextProvider";
import {history} from "./helpers/history";
import AccountTabContextProvider from "./utils/providers/AccountTabContextProvider";
import MainNavContextProvider from "./utils/providers/MainNavContextProvider";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <BrowserRouter history={history}>
            <UserContextProvider>
                <AccountTabContextProvider>
                    <MainNavContextProvider>
                        <App/>
                    </MainNavContextProvider>
                </AccountTabContextProvider>
            </UserContextProvider>
        </BrowserRouter>
    </React.StrictMode>
);
