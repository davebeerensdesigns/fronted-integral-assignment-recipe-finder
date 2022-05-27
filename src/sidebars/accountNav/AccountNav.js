import React, {useState, useContext} from 'react';
import './AccountNav.scss';
import {
    faUserPlus,
    faArrowRightToBracket,
    faArrowRightFromBracket,
    faClose
} from "@fortawesome/pro-regular-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import Login from "../../components/login/Login";
import Register from "../../components/register/Register";
import Profile from "../../components/profile/Profile";
import {UserContext} from "../../providers/UserProvider";
import Logout from "../../components/logout/Logout";
import {AccountTabContext} from "../../providers/AccountTabProvider";

function AccountNav(props) {

    // Tab menu active state

    const [accountTab, setAccountTab] = useContext(AccountTabContext);
    const [user, setUser] = useContext(UserContext);
    return (
        <aside
            id='account-nav__wrapper'
        >
            <button onClick={() => {
                {
                    setAccountTab(arr => ({...arr, show: !arr.show}))
                }
            }}>
                <FontAwesomeIcon icon={faClose}/>
            </button>
            {user ? (
                <>
                    <Logout buttonClass='btn btn-icon text-danger'>
                        <FontAwesomeIcon icon={faArrowRightFromBracket}/>
                    </Logout>
                    <div className='tabs'>
                        <Profile/>
                    </div>
                </>
            ) : (
                <>
                    <nav>
                        <button onClick={() => {
                            {
                                setAccountTab(arr => ({...arr, guest: 'register'}))
                            }
                        }}>
                            <FontAwesomeIcon icon={faUserPlus}/>
                        </button>
                        <button onClick={() => {
                            {
                                setAccountTab(arr => ({...arr, guest: 'login'}))
                            }
                        }}>
                            <FontAwesomeIcon icon={faArrowRightToBracket}/>
                        </button>
                    </nav>
                    <div className='tabs'>
                        {accountTab['guest'] === 'login' &&
                            <Login/>
                        }
                        {accountTab['guest'] === 'register' &&
                            <Register/>
                        }
                    </div>
                </>
            )}

        </aside>
    );
}

export default AccountNav;