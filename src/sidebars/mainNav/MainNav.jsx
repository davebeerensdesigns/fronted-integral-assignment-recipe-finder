import React from 'react';
import {Link} from "react-router-dom";
import Logo from "../../components/logo/Logo";
import '../../sidebars/mainNav/MainNav.css';

function MainNav(props) {
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
                <Link
                    className='main-nav__link'
                    to='/'
                >
                    Dashboard
                </Link>
                <Link
                    className='main-nav__link'
                    to='/search-pantry'
                >
                    Search Pantry
                </Link>
                <Link
                    className='main-nav__link'
                    to='/cuisines'
                >
                    Cuisines
                </Link>
                <Link
                    className='main-nav__link'
                    to='/popular'
                >
                    Popular
                </Link>
                <Link
                    className='main-nav__link'
                    to='/latest'
                >
                    Latest
                </Link>
                <Link
                    className='main-nav__link'
                    to='/about'
                >
                    About
                </Link>
            </nav>
        </aside>
    );
}

export default MainNav;