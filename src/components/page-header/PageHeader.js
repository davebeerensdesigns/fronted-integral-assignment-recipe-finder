import React, {useContext} from 'react';
import {AccountTabContext} from "../../providers/AccountTabProvider";
import {MainNavContext} from "../../providers/MainNavProvider";
import {UserContext} from "../../providers/UserProvider";
import './/PageHeader.scss';

function PageHeader(props) {


    const [accountTab, setAccountTab] = useContext(AccountTabContext);
    const [mainNav, setMainNav] = useContext(MainNavContext);
    const [user, setUser] = useContext(UserContext);

    return (
        <div id='page-header__wrapper'>
            <button onClick={() => {
                {
                    setMainNav(arr => ({...arr, show: !arr.show}))
                }
            }}>
                MENU
            </button>
            <input type='text'
                   placeholder='search recipes'/>
            <button onClick={() => {
                {
                    setAccountTab(arr => ({...arr, show: !arr.show}))
                }
            }}>
                AVATAR
            </button>
        </div>
    );
}

export default PageHeader;