import React, {useContext} from 'react';
import AuthService from "../../services/auth.service";
import {UserContext} from "../../providers/UserProvider";

function Logout(props) {

    const [context, setContext] = useContext(UserContext);

    const logout = () => {
        AuthService.logout()
        setContext({
            loggedIn: false
        });
    }

    return (
        <button className={props.buttonClass} onClick={logout}>
            {props.children}
        </button>
    );
}

export default Logout;