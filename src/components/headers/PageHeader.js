import React, {useContext} from 'react';
import {MainNavContext} from "../../utils/providers/MainNavContextProvider";
import './PageHeader.scss';
import AvatarButton from "../buttons/avatar-button/AvatarButton";
import Container from "../container/Container";
import {ReactComponent as AppIcon} from "../../assets/logo/icon.svg";
import {Link} from "react-router-dom";

function PageHeader() {


    const [, setMainNav] = useContext(MainNavContext);

    return (
        <div id='page-header'>
            <Container>
                <div id='page-header__wrapper'>
                    <Link
                        id='app-icon__link'
                        to='/'
                    >
                        <AppIcon
                            id='app-icon__img'
                        />
                    </Link>
                    <button className='btn btn-icon'
                            onClick={() => {
                                setMainNav(arr => ({...arr, show: !arr.show}))
                            }}>
                        MENU
                    </button>
                    <input type='text'
                           placeholder='search recipes'/>
                    <AvatarButton/>
                </div>
            </Container>
        </div>
    );
}

export default PageHeader;