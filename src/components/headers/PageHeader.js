import React, {useContext} from 'react';
import {MainNavContext} from "../../utils/providers/MainNavContextProvider";
import './/PageHeader.scss';
import AvatarButton from "../buttons/avatar-button/AvatarButton";

function PageHeader() {


    const [, setMainNav] = useContext(MainNavContext);

    return (
        <div id='page-header__wrapper'>
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
    );
}

export default PageHeader;