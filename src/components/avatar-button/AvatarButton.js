import React, {useContext} from 'react';
import {AccountTabContext} from "../../providers/AccountTabProvider";
import './AvatarButton.scss';
import Avatar from "../avatar/Avatar";

function AvatarButton() {
    const [accountTab, setAccountTab] = useContext(AccountTabContext);
    return (
        <button className='btn btn-avatar' onClick={() => {
            {
                setAccountTab(arr => ({...arr, show: !arr.show}))
            }
        }}>
            <Avatar />
        </button>
    );
}

export default AvatarButton;