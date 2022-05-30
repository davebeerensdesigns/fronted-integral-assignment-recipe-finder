import React, {useContext} from 'react';
import AuthService from "../../services/auth.service";
import {UserContext} from "../../providers/UserProvider";
import {toast} from "react-toastify";
import toastMessage from "../../helpers/toastMessage";
import {classNames} from "../../helpers/classNames";
import './Logout.scss';
import {AccountTabContext} from "../../providers/AccountTabProvider";

function Logout(props) {

    const [user, setUser] = useContext(UserContext);
    const [accountTab, setAccountTab] = useContext(AccountTabContext);

    const notifyError = (message) => {
        toast.error(message, {
            position: "top-right",
            autoClose: 3000
        });
    }

    const logout = () => {
        AuthService.logout()
        setUser(false);
        toastMessage.notifySuccess('You have been logged out successfully!');
        setAccountTab(arr => ({...arr, show: false}))
    }

    return (
        <button className={classNames(props.buttonClass, 'btn-logout')} onClick={logout}>
            {props.children}
        </button>
    );
}

export default Logout;