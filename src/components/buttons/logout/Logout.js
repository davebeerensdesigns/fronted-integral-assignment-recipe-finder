import React, {useContext} from 'react';
import AuthService from "../../../services/auth.service";
import {UserContext} from "../../../utils/providers/UserContextProvider";
import notifyToast from "../../../utils/hooks/notifyToast";
import {classNames} from "../../../helpers/classNames";
import './Logout.scss';
import {AccountTabContext} from "../../../utils/providers/AccountTabContextProvider";

function Logout(props) {

    const [, setUser] = useContext(UserContext);
    const [, setAccountTab] = useContext(AccountTabContext);

    const logout = () => {
        AuthService.logout()
        setUser(false);
        setAccountTab(arr => ({...arr, show: false}))
        notifyToast.notifySuccess('You have been logged out successfully!');
        setTimeout(() => {
            window.location.reload()
        }, 2000);
    }

    return (
        <button className={classNames(props.buttonClass, 'btn-logout')}
                onClick={logout}>
            {props.children}
        </button>
    );
}

export default Logout;