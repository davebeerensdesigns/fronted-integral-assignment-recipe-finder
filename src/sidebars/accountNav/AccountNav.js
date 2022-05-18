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

function AccountNav(props) {

    // Tab menu active state
    const [guestAccountActiveTab, setGuestAccountActiveTab] = useState('login');
    const [userAccountActiveTab, setUserAccountActiveTab] = useState('favorites');

    const [context, setContext] = useContext(UserContext);
    const {loggedIn} = context;

    return (
        <aside
            id='account-nav__wrapper'
        >
            {loggedIn ? (
                    <>
                        <nav>
                            <button className='btn btn-icon' onClick={() => {setUserAccountActiveTab('favorites')}}>
                                <FontAwesomeIcon icon={ faHeart } />
                            </button>
                            <button className='btn btn-icon' onClick={() => {setUserAccountActiveTab('profile')}}>
                                <FontAwesomeIcon icon={ faCog } />
                            </button>
                            <Logout buttonClass='btn btn-icon text-danger'>
                                <FontAwesomeIcon icon={ faArrowRightFromBracket } />
                            </Logout>
                        </nav>
                        <div className='tabs'>
                            {userAccountActiveTab === 'profile' &&
                                <Profile/>
                            }
                            {userAccountActiveTab === 'favorites' &&
                                <Favorites/>
                            }
                        </div>
                    </>
            ) : (
                <>
                    <nav>
                        <button onClick={() => {setGuestAccountActiveTab('register')}}>
                            <FontAwesomeIcon icon={ faUserPlus } />
                        </button>
                        <button onClick={() => {setGuestAccountActiveTab('login')}}>
                            <FontAwesomeIcon icon={ faArrowRightToBracket } />
                        </button>
                    </nav>
                    <div className='tabs'>
                        {guestAccountActiveTab === 'login' &&
                            <Login/>
                        }
                        {guestAccountActiveTab === 'register' &&
                            <Register/>
                        }
                    </div>
                </>
            )}




        </aside>
    );
}

export default AccountNav;