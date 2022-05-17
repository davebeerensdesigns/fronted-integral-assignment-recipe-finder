import React, {useEffect, useState} from 'react';
import {Link, NavLink} from "react-router-dom";
import Logo from "../../components/logo/Logo";
import './MainNav.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouse, faRefrigerator, faUserChef, faSparkles, faHatChef, faInfoCircle } from "@fortawesome/pro-regular-svg-icons"
import AuthService from "../../services/auth.service";



function MainNav(props) {

    const [currentUser, setCurrentUser] = useState(undefined);
    useEffect(() => {
        const user = AuthService.getCurrentUser();
        if (user) {
            setCurrentUser(user);
        }
    }, []);

    return (
        <aside id='main-nav__wrapper'>
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
            {currentUser ? (
                <>
                    Hello {currentUser.username}
                </>
            ) : (
                <>
                    REGISTER NOW!!
                </>
            )}
        </aside>
    );
}

export default MainNav;