import React, {createContext, useEffect, useState} from "react";
import Appservice from "../../services/app.service";

export const AccountTabContext = createContext(null);

const {Provider} = AccountTabContext;

const AccountTabContextProvider = ({children}) => {

    let accountTabObject = Appservice.getAccountTab();

    let accountTabData = {
        show: false,
        guest: 'login'
    }

    if(accountTabObject){
        try {
            const parsed = JSON.parse(accountTabObject);
            accountTabData = {
                show: !!parsed['show'],
                guest: parsed['guest'] === 'login' ? 'login' : 'register'
            }
        } catch (e) {
            accountTabData = {
                show: false,
                guest: 'login'
            }
        }
    }

    const [accountTab, setAccountTab] = useState(accountTabData);

    useEffect(() => {
        Appservice.setAccountTab(JSON.stringify(accountTab));
    }, [accountTab]);

    return <Provider value={[accountTab, setAccountTab]}>{children}</Provider>;
};

AccountTabContextProvider.context = AccountTabContext;

export default AccountTabContextProvider;