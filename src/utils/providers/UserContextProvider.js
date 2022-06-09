import React, {createContext, useEffect, useState} from "react";
import AuthService from "../../services/auth.service";

export const UserContext = createContext(null);

const {Provider} = UserContext;

const UserContextProvider = ({children}) => {

    let currentUser = AuthService.getCurrentUser();

    const [userValue, setUserValue] = useState(
        !!currentUser
    );

    useEffect(() => {
        setUserValue(!!currentUser);
    }, [currentUser]);

    return <Provider value={[userValue, setUserValue]}>{children}</Provider>;
};

UserContextProvider.context = UserContext;

export default UserContextProvider;