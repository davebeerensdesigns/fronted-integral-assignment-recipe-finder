import React, {useContext} from 'react';
import './AccountNav.scss';
import {
    faUserPlus,
    faArrowRightToBracket,
    faClose
} from "@fortawesome/pro-regular-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import Login from "../../../components/forms/form/login/Login";
import Register from "../../../components/forms/form/register/Register";
import Profile from "../../../components/profile/Profile";
import {UserContext} from "../../../utils/providers/UserContextProvider";
import {AccountTabContext} from "../../../utils/providers/AccountTabContextProvider";

function AccountNav() {

    // Tab menu active state
    const [accountTab, setAccountTab] = useContext(AccountTabContext);
    const [user] = useContext(UserContext);

    return (
        <aside
            id='account-nav__wrapper'
        >
            <button id='account-nav__close'
                    className='btn btn-icon btn-round'
                    onClick={
                        () => {
                            setAccountTab(arr => ({...arr, show: !arr.show}))
                        }
                    }>
                <FontAwesomeIcon icon={faClose}/>
            </button>

            {
                accountTab.show && (
                    user ? (
                        <Profile/>
                    ) : (
                        <>
                            <nav id='account-nav__tabs-btn'>
                                <button id='btn-tab__register'
                                        className='btn btn-icon'
                                        onClick={() => {
                                            setAccountTab(arr => ({...arr, guest: 'register'}))
                                        }}>
                                    <FontAwesomeIcon icon={faUserPlus}/>
                                </button>
                                <button id='btn-tab__login'
                                        className='btn btn-icon'
                                        onClick={() => {
                                            setAccountTab(arr => ({...arr, guest: 'login'}))
                                        }}>
                                    <FontAwesomeIcon icon={faArrowRightToBracket}/>
                                </button>
                            </nav>
                            <div className='account-nav__tabs'>
                                {accountTab['guest'] === 'login' &&
                                    <Login/>
                                }
                                {accountTab['guest'] === 'register' &&
                                    <Register/>
                                }
                            </div>
                        </>
                    )
                )

            }

        </aside>
    );
}

export default AccountNav;