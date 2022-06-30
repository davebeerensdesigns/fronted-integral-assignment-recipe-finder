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
import {classNames} from "../../../helpers/classNames";
import CloseSidebar from "../../../components/buttons/sidebar/CloseSidebar";
import Button from "../../../components/buttons/button/Button";

function AccountNav() {

    // Tab menu active state
    const [accountTab, setAccountTab] = useContext(AccountTabContext);
    const [user] = useContext(UserContext);

    return (
        <aside
            id='account-nav__wrapper'
        >
            <CloseSidebar id='account-nav__close'
                          screenSide='right'
                          customClick={
                              () => {
                                  setAccountTab(arr => ({...arr, show: !arr.show}))
                              }
                          }/>

            {
                accountTab.show && (
                    user ? (
                        <Profile/>
                    ) : (
                        <>
                            <nav id='account-nav__tabs-btn'>
                                <Button id='btn-tab__register'
                                        customClass={classNames(accountTab['guest'] === 'register' ? 'active' : '', 'btn-icon')}
                                        customClick={() => {
                                            setAccountTab(arr => ({...arr, guest: 'register'}))
                                        }}>
                                    <FontAwesomeIcon icon={faUserPlus}/>
                                </Button>
                                <Button id='btn-tab__login'
                                        customClass={classNames(accountTab['guest'] === 'login' ? 'active' : '', 'btn-icon')}
                                        customClick={() => {
                                            setAccountTab(arr => ({...arr, guest: 'login'}))
                                        }}>
                                    <FontAwesomeIcon icon={faArrowRightToBracket}/>
                                </Button>
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