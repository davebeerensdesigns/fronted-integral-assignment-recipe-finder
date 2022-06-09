import React, {createContext, useEffect, useState} from "react";

export const AccountTabContext = createContext(null);

const {Provider} = AccountTabContext;

const AccountTabContextProvider = ({children}) => {

    let accountTabObject = localStorage.getItem('accountTab');

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
        localStorage.setItem('accountTab', JSON.stringify(accountTab));
    }, [accountTab]);

    return <Provider value={[accountTab, setAccountTab]}>{children}</Provider>;
};

AccountTabContextProvider.context = AccountTabContext;

export default AccountTabContextProvider;