import React, {useContext} from 'react';
import {Link, NavLink} from "react-router-dom";
import './MainNav.scss';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faClose} from "@fortawesome/pro-regular-svg-icons"
import {UserContext} from "../../../utils/providers/UserContextProvider";
import {ReactComponent as AppLogo} from "../../../assets/logo/logo.svg";
import {MainNavContext} from "../../../utils/providers/MainNavContextProvider";
import CardRegister from "../../../components/cards/register/CardRegister";
import links from "../../../config/mainNav";

function MainNav() {

    const [, setMainNav] = useContext(MainNavContext);
    const [user] = useContext(UserContext);

    const closeMenu = () => {
        let viewportWidth = window.innerWidth || document.documentElement.clientWidth;
        viewportWidth < 768 && setMainNav(arr => ({...arr, show: false}));
    }



    const navItems = links.map(item => {
        if(!user & item.user){ return }
        return (
            <NavLink
                className='main-nav__link'
                to={item.path}
                onClick={closeMenu}
            >
                <FontAwesomeIcon icon={item.icon}/> <span>{item.title}</span>
            </NavLink>
        )
    })

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
                onClick={closeMenu}
            >
                <AppLogo
                    id='app-logo__img'
                />
            </Link>
            <nav
                id='main-nav__navigation'
                className='main-nav__list'
            >
                {navItems}
            </nav>
            {!user &&
                <CardRegister/>
            }
        </aside>
    );
}

export default MainNav;