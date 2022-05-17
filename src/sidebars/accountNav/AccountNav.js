import React, {useEffect, useState} from 'react';
import './AccountNav.scss';
import {faUserPlus, faArrowRightToBracket} from "@fortawesome/pro-regular-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import Login from "../../components/login/Login";
import Register from "../../components/register/Register";
import AuthService from "../../services/auth.service";
import Profile from "../../components/profile/Profile";

function AccountNav(props) {

    // Tab menu active state
    const [accountActiveTab, setAccountActiveTab] = useState('login');

    const [currentUser, setCurrentUser] = useState(undefined);
    useEffect(() => {
        const user = AuthService.getCurrentUser();
        if (user) {
            setCurrentUser(user);
        }
    }, []);
    const logOut = () => {
        AuthService.logout();
        //TODO: use async instead of reloading the app
        window.location.reload();
    };

    return (
        <aside
            id='account-nav__wrapper'
        >
            {currentUser ? (
                <>
                    Hello {currentUser.username}
                    <button className="nav-link" onClick={logOut}>
                        LogOut
                    </button>

                    <Profile/>
                </>
            ) : (
                <>
                    <nav>
                        <button onClick={() => {setAccountActiveTab('register')}}>
                            <FontAwesomeIcon icon={ faUserPlus } />
                        </button>
                        <button onClick={() => {setAccountActiveTab('login')}}>
                            <FontAwesomeIcon icon={ faArrowRightToBracket } />
                        </button>
                    </nav>
                    <div className='tabs'>
                        {accountActiveTab === 'login' &&
                            <Login/>
                        }
                        {accountActiveTab === 'register' &&
                            <Register/>
                        }
                    </div>
                </>
            )}




        </aside>
    );
}

export default AccountNav;