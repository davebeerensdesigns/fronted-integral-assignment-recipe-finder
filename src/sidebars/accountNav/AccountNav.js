import React, {useState, useContext} from 'react';
import './AccountNav.scss';
import {faUserPlus, faArrowRightToBracket, faArrowRightFromBracket, faHeart, faCog} from "@fortawesome/pro-regular-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import Login from "../../components/login/Login";
import Register from "../../components/register/Register";
import Profile from "../../components/profile/Profile";
import {UserContext} from "../../providers/UserProvider";
import Logout from "../../components/logout/Logout";
import Favorites from "../../components/favorites/Favorites";
import {AccountTabContext} from "../../providers/AccountTabProvider";

function AccountNav(props) {

    // TODO: Make a message handler so user knows what happened when logging in or out

    // Tab menu active state

    const [accountTab, setAccountTab] = useContext(AccountTabContext);
    const [user, setUser] = useContext(UserContext);
    return (
        <aside
            id='account-nav__wrapper'
            className={(accountTab['show']) ? 'show' : 'hidden'}
        >
            <button onClick={() => {{setAccountTab(arr => ({...arr, show: !arr.show }))}}}>
                {(accountTab['show']) ? 'Close menu' : 'Open menu'}
            </button>
            {user ? (
                    <>
                        <nav>
                            <button onClick={() => {{setAccountTab(arr => ({...arr, user: 'favorites' }))}}}>
                                <FontAwesomeIcon icon={ faHeart } />
                            </button>
                            <button onClick={() => {{setAccountTab(arr => ({...arr, user: 'profile' }))}}}>
                                <FontAwesomeIcon icon={ faCog } />
                            </button>
                            <Logout buttonClass='btn btn-icon text-danger'>
                                <FontAwesomeIcon icon={ faArrowRightFromBracket } />
                            </Logout>
                        </nav>
                        <div className='tabs'>
                            {accountTab['user'] === 'profile' &&
                                <Profile/>
                            }
                            {accountTab['user'] === 'favorites' &&
                                <Favorites/>
                            }
                        </div>
                    </>
            ) : (
                <>
                    <nav>
                        <button onClick={() => {{setAccountTab(arr => ({...arr, guest: 'register' }))}}}>
                            <FontAwesomeIcon icon={ faUserPlus } />
                        </button>
                        <button onClick={() => {{setAccountTab(arr => ({...arr, guest: 'login' }))}}}>
                            <FontAwesomeIcon icon={ faArrowRightToBracket } />
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