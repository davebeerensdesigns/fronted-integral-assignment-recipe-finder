import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter} from "react-router-dom";
import './index.scss';
import App from './App';
import UserProvider from "./providers/UserProvider";
import {history} from "./helpers/history";
import AccountTabProvider from "./providers/AccountTabProvider";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <BrowserRouter history={history}>
            <UserProvider>
                <AccountTabProvider>
                    <App/>
                </AccountTabProvider>
            </UserProvider>
        </BrowserRouter>
    </React.StrictMode>
);
