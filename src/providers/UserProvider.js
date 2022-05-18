import React, {createContext, useEffect, useState} from "react";
import AuthService from "../services/auth.service";

export const UserContext = createContext(null);

const { Provider } = UserContext;

const UserProvider = ({ children }) => {

    const currentUser = AuthService.getCurrentUser();

    const [state, setState] = useState({
        loggedIn: false
    });

    useEffect(() => {
        if(currentUser){
            setState(prevState => ({
                ...prevState,
                loggedIn: (currentUser)
            }))
        }
    }, []);

    return <Provider value={[state, setState]}>{children}</Provider>;
};

UserProvider.context = UserContext;

export default UserProvider;