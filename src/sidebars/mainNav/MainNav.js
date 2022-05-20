import React, {useEffect, useState, useContext} from 'react';
import {Link, NavLink} from "react-router-dom";
import Logo from "../../components/logo/Logo";
import './MainNav.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouse, faRefrigerator, faUserChef, faSparkles, faHatChef, faInfoCircle } from "@fortawesome/pro-regular-svg-icons"
import {UserContext} from "../../providers/UserProvider";
import {MainNavContext} from "../../providers/MainNavProvider";

function MainNav(props) {

    const [mainNav, setMainNav] = useContext(MainNavContext);
    const [user, setUser] = useContext(UserContext);

    return (
        <aside id='main-nav__wrapper'
               className={(mainNav['show']) ? 'show' : 'hidden'}
        >
            <button onClick={() => {{setMainNav(arr => ({...arr, show: !arr.show }))}}}>
                {(mainNav['show']) ? 'Close menu' : 'Open menu'}
            </button>
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
            {!user.loggedIn &&
                <>
                    REGISTER NOW!!
                </>
            }
        </aside>
    );
}

export default MainNav;