import React, {useContext} from 'react';
import {Link, NavLink} from "react-router-dom";
import './MainNav.scss';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {
    faHouse,
    faRefrigerator,
    faUserChef,
    faSparkles,
    faHatChef,
    faInfoCircle,
    faHeart, faClose
} from "@fortawesome/pro-regular-svg-icons"
import {UserContext} from "../../../utils/providers/UserContextProvider";
import {AccountTabContext} from "../../../utils/providers/AccountTabContextProvider";
import {ReactComponent as AppLogo} from "../../../assets/logo/logo.svg";
import {MainNavContext} from "../../../utils/providers/MainNavContextProvider";

function MainNav() {

    const [, setAccountTab] = useContext(AccountTabContext);
    const [, setMainNav] = useContext(MainNavContext);
    const [user] = useContext(UserContext);

    return (
        <aside id='main-nav__wrapper'
        >
            <button id='main-nav__close'
                    className='btn btn-icon btn-round'
                    onClick={
                        () => {
                            setMainNav(arr => ({...arr, show: !arr.show}))
                        }
                    }>
                <FontAwesomeIcon icon={faClose}/>
            </button>
            <Link
                id='app-logo__link'
                to='/'
            >
                <AppLogo
                    id='app-logo__img'
                />
            </Link>
            <nav
                id='main-nav__navigation'
                className='main-nav__list'
            >
                <NavLink className='main-nav__link'
                         to='/'
                >
                    <FontAwesomeIcon icon={faHouse}/> <span>Dashboard</span>
                </NavLink>
                <NavLink
                    className='main-nav__link'
                    to='/search-pantry'
                >
                    <FontAwesomeIcon icon={faRefrigerator}/> <span>Search pantry</span>
                </NavLink>
                <NavLink
                    className='main-nav__link'
                    to='/cuisines'
                >
                    <FontAwesomeIcon icon={faUserChef}/> <span>Cuisines</span>
                </NavLink>
                {user &&
                    <NavLink
                        className='main-nav__link'
                        to='/favorites'
                    >
                        <FontAwesomeIcon icon={faHeart}/> <span>Favorites</span>
                    </NavLink>
                }
                <NavLink
                    className='main-nav__link'
                    to='/popular'
                >
                    <FontAwesomeIcon icon={faSparkles}/> <span>Popular</span>
                </NavLink>
                <NavLink
                    className='main-nav__link'
                    to='/latest'
                >
                    <FontAwesomeIcon icon={faHatChef}/> <span>Latest</span>
                </NavLink>
                <NavLink
                    className='main-nav__link'
                    to='/about'
                >
                    <FontAwesomeIcon icon={faInfoCircle}/> <span>About</span>
                </NavLink>
            </nav>
            {!user &&
                <>
                    <button onClick={() => {
                        setAccountTab(arr => ({...arr, show: true, guest: 'register'}))
                    }}>
                        Register
                    </button>
                </>
            }
        </aside>
    );
}

export default MainNav;