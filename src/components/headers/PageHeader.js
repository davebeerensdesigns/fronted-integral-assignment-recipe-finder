import React, {useContext} from 'react';
import {MainNavContext} from "../../utils/providers/MainNavContextProvider";
import './PageHeader.scss';
import AvatarButton from "../buttons/avatar-button/AvatarButton";
import Container from "../container/Container";
import {ReactComponent as AppIcon} from "../../assets/logo/icon.svg";
import {Link} from "react-router-dom";
import AutocompleteSearch from "../forms/form/autocomplete-search/AutocompleteSearch";
import Button from "../buttons/button/Button";
import {faBars} from "@fortawesome/pro-regular-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

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
                    <Button customClass='btn-icon'
                            customClick={() => {
                                setMainNav(arr => ({...arr, show: !arr.show}))
                            }}>
                        <FontAwesomeIcon icon={faBars}/> MENU
                    </Button>

                    <AutocompleteSearch/>

                    <AvatarButton/>
                </div>
            </Container>
        </div>
    );
}

export default PageHeader;