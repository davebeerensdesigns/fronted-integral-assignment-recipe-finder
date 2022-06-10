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
import {ReactComponent as AppLogo} from "../../../assets/logo/logo.svg";
import {MainNavContext} from "../../../utils/providers/MainNavContextProvider";
import CardRegister from "../../../components/cards/register/CardRegister";

function MainNav() {

    const [, setMainNav] = useContext(MainNavContext);
    const [user] = useContext(UserContext);

    const closeMenu = () => {
        let viewportWidth = window.innerWidth || document.documentElement.clientWidth;
        viewportWidth < 768 && setMainNav(arr => ({...arr, show: false}));
    }

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
                <NavLink
                    className='main-nav__link'
                    to='/'
                    onClick={closeMenu}
                >
                    <FontAwesomeIcon icon={faHouse}/> <span>Dashboard</span>
                </NavLink>
                <NavLink
                    className='main-nav__link'
                    to='/search-pantry'
                    onClick={closeMenu}
                >
                    <FontAwesomeIcon icon={faRefrigerator}/> <span>Search pantry</span>
                </NavLink>
                <NavLink
                    className='main-nav__link'
                    to='/cuisines'
                    onClick={closeMenu}
                >
                    <FontAwesomeIcon icon={faUserChef}/> <span>Cuisines</span>
                </NavLink>
                {user &&
                    <NavLink
                        className='main-nav__link'
                        to='/favorites'
                        onClick={closeMenu}
                    >
                        <FontAwesomeIcon icon={faHeart}/> <span>Favorites</span>
                    </NavLink>
                }
                <NavLink
                    className='main-nav__link'
                    to='/popular'
                    onClick={closeMenu}
                >
                    <FontAwesomeIcon icon={faSparkles}/> <span>Popular</span>
                </NavLink>
                <NavLink
                    className='main-nav__link'
                    to='/latest'
                    onClick={closeMenu}
                >
                    <FontAwesomeIcon icon={faHatChef}/> <span>Latest</span>
                </NavLink>
                <NavLink
                    className='main-nav__link'
                    to='/about'
                    onClick={closeMenu}
                >
                    <FontAwesomeIcon icon={faInfoCircle}/> <span>About</span>
                </NavLink>
            </nav>
            {!user &&
                <CardRegister/>
            }
        </aside>
    );
}

export default MainNav;