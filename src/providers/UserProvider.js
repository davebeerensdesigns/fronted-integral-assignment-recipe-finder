import React, {createContext, useEffect, useState} from "react";
import AuthService from "../services/auth.service";

export const UserContext = createContext(null);

const { Provider } = UserContext;

const UserProvider = ({ children }) => {

    let currentUser = AuthService.getCurrentUser();
    let currentUserData = (currentUser ? true : false);

    const [userValue, setUserValue] = useState(currentUserData);

    useEffect(() => {
        setUserValue(currentUser ? true : false);
    }, []);

    return <Provider value={[userValue, setUserValue]}>{children}</Provider>;
};

UserProvider.context = UserContext;

export default UserProvider;