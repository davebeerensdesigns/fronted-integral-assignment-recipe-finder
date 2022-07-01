import React, {useContext} from 'react';
import {AccountTabContext} from "../../../utils/providers/AccountTabContextProvider";
import './AvatarButton.scss';
import Avatar from "../../profile/Avatar";
import Button from "../button/Button";

function AvatarButton() {
    const [, setAccountTab] = useContext(AccountTabContext);
    return (
        <Button customClass='btn-avatar'
                customClick={() => {
                    setAccountTab(arr => ({...arr, show: !arr.show}))
                }}>
            <Avatar/>
        </Button>
    );
}

export default AvatarButton;