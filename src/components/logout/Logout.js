import React, {useContext} from 'react';
import AuthService from "../../services/auth.service";
import {UserContext} from "../../providers/UserProvider";
import {toast} from "react-toastify";
import toastMessage from "../../helpers/toastMessage";

function Logout(props) {

    const [context, setContext] = useContext(UserContext);

    const notifyError = (message) => {
        toast.error(message, {
            position: "top-right",
            autoClose: 3000
        });
    }

    const logout = () => {
        AuthService.logout()
        setContext(false);
        toastMessage.notifySuccess('You have been logged out successfully!');
    }

    return (
        <button className={props.buttonClass} onClick={logout}>
            {props.children}
        </button>
    );
}

export default Logout;