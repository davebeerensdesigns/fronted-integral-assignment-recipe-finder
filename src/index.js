import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter} from "react-router-dom";
import './index.scss';
import App from './App';
import UserProvider from "./providers/UserProvider";
import {history} from "./helpers/history";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <BrowserRouter history={history}>
            <UserProvider>
                <App/>
            </UserProvider>
        </BrowserRouter>
    </React.StrictMode>
);
