import React, {useContext} from 'react';
import {AccountTabContext} from "../../../utils/providers/AccountTabContextProvider";
import './AvatarButton.scss';
import Avatar from "../../profile/Avatar";

function AvatarButton() {
    const [, setAccountTab] = useContext(AccountTabContext);
    return (
        <button className='btn btn-avatar'
                onClick={() => {
                    setAccountTab(arr => ({...arr, show: !arr.show}))
                }}>
            <Avatar/>
        </button>
    );
}

export default AvatarButton;