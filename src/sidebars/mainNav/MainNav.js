import React, {useEffect, useState, useContext} from 'react';
import {Link, NavLink} from "react-router-dom";
import Logo from "../../components/logo/Logo";
import './MainNav.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faHouse,
    faRefrigerator,
    faUserChef,
    faSparkles,
    faHatChef,
    faInfoCircle,
    faHeart,
    faClose
} from "@fortawesome/pro-regular-svg-icons"
import {UserContext} from "../../providers/UserProvider";
import {MainNavContext} from "../../providers/MainNavProvider";
import {AccountTabContext} from "../../providers/AccountTabProvider";

function MainNav(props) {

    const [accountTab, setAccountTab] = useContext(AccountTabContext);
    const [mainNav, setMainNav] = useContext(MainNavContext);
    const [user, setUser] = useContext(UserContext);

    return (
        <aside id='main-nav__wrapper'
               className={(mainNav['show']) ? 'show' : 'hidden'}
        >
            <Link
                id='app-logo__link'
                to='/'
            >
                <Logo />
            </Link>
            <nav
                id='main-nav__navigation'
                className='main-nav__list'
            >
                <NavLink className='main-nav__link'
                    to='/'
                >
                    <FontAwesomeIcon icon={ faHouse } /> <span>Dashboard</span>
                </NavLink>
                <NavLink
                    className='main-nav__link'
                    to='/search-pantry'
                >
                    <FontAwesomeIcon icon={ faRefrigerator } /> <span>Search pantry</span>
                </NavLink>
                <NavLink
                    className='main-nav__link'
                    to='/cuisines'
                >
                    <FontAwesomeIcon icon={ faUserChef } /> <span>Cuisines</span>
                </NavLink>
                {user &&
                    <NavLink
                        className='main-nav__link'
                        to='/favorites'
                    >
                        <FontAwesomeIcon icon={ faHeart } /> <span>Favorites</span>
                    </NavLink>
                }
                <NavLink
                    className='main-nav__link'
                    to='/popular'
                >
                    <FontAwesomeIcon icon={ faSparkles } /> <span>Popular</span>
                </NavLink>
                <NavLink
                    className='main-nav__link'
                    to='/latest'
                >
                    <FontAwesomeIcon icon={ faHatChef } /> <span>Latest</span>
                </NavLink>
                <NavLink
                    className='main-nav__link'
                    to='/about'
                >
                    <FontAwesomeIcon icon={ faInfoCircle } /> <span>About</span>
                </NavLink>
            </nav>
            {!user &&
                <>
                    <button onClick={() => {
                        {
                            setAccountTab(arr => ({...arr, show: true, guest: 'register'}))
                        }
                    }}>
                        Register
                    </button>
                </>
            }
        </aside>
    );
}

export default MainNav;