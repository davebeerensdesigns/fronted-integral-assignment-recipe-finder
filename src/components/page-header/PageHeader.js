import React, {useContext} from 'react';
import {AccountTabContext} from "../../providers/AccountTabProvider";
import {MainNavContext} from "../../providers/MainNavProvider";
import './/PageHeader.scss';
import AvatarButton from "../avatar-button/AvatarButton";

function PageHeader(props) {


    const [mainNav, setMainNav] = useContext(MainNavContext);

    return (
        <div id='page-header__wrapper'>
            <button className='btn btn-icon' onClick={() => {
                {
                    setMainNav(arr => ({...arr, show: !arr.show}))
                }
            }}>
                MENU
            </button>
            <input type='text'
                   placeholder='search recipes'/>
            <AvatarButton />
        </div>
    );
}

export default PageHeader;