import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter} from "react-router-dom";
import './index.scss';
import App from './App';
import TestProvider from "./providers/TestProvider";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <BrowserRouter>
            <TestProvider>
                <App/>
            </TestProvider>
        </BrowserRouter>
    </React.StrictMode>
);
