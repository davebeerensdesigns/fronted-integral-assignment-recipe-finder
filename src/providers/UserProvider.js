import React, {createContext, useEffect, useState} from "react";
import AuthService from "../services/auth.service";

export const UserContext = createContext(null);

const { Provider } = UserContext;

const UserProvider = ({ children }) => {

    const currentUser = AuthService.getCurrentUser();

    const [userValue, setUserValue] = useState({
        loggedIn: false
    });

    useEffect(() => {
        if(currentUser){
            setUserValue(prevState => ({
                ...prevState,
                loggedIn: (currentUser)
            }))
        }
    }, []);

    return <Provider value={[userValue, setUserValue]}>{children}</Provider>;
};

UserProvider.context = UserContext;

export default UserProvider;