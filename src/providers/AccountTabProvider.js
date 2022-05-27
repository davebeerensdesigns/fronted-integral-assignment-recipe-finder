import React, {createContext, useEffect, useState} from "react";

export const AccountTabContext = createContext(null);

const { Provider } = AccountTabContext;

const AccountTabProvider = ({ children }) => {

    let accountTabObject = JSON.parse(localStorage.getItem('accountTab'));
    let accountTabData = (accountTabObject ? accountTabObject : {} )

    const [accountTab, setAccountTab] = useState({
        show: (accountTabData['show'] ? accountTabData['show'] : false),
        guest: (accountTabData['guest'] ? accountTabData['guest'] : 'login'),
    });

    useEffect(() => {
        localStorage.setItem('accountTab', JSON.stringify(accountTab));
    }, [accountTab]);

    return <Provider value={[accountTab, setAccountTab]}>{children}</Provider>;
};

AccountTabProvider.context = AccountTabContext;

export default AccountTabProvider;