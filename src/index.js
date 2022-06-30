import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter} from "react-router-dom";
import './index.scss';
import App from './App';
import UserContextProvider from "./utils/providers/UserContextProvider";
import {history} from "./helpers/history";
import AccountTabContextProvider from "./utils/providers/AccountTabContextProvider";
import MainNavContextProvider from "./utils/providers/MainNavContextProvider";
import FavoriteRecipesContextProvider from "./utils/providers/FavoriteRecipesContextProvider";
import PantryFilterContextProvider from "./utils/providers/PantryFilterContextProvider";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter history={history}>
        <UserContextProvider>
            <FavoriteRecipesContextProvider>
                <AccountTabContextProvider>
                    <MainNavContextProvider>
                        <PantryFilterContextProvider>
                            <App/>
                        </PantryFilterContextProvider>
                    </MainNavContextProvider>
                </AccountTabContextProvider>
            </FavoriteRecipesContextProvider>
        </UserContextProvider>
    </BrowserRouter>
);
