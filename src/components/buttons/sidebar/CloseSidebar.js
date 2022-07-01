import React from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faClose} from "@fortawesome/pro-regular-svg-icons";
import './CloseSidebar.scss';
import Button from "../button/Button";

function CloseSidebar({id, customClick}) {
    return (
        <Button id={id}
                customClass='btn-icon btn-round'
                customClick={customClick}>
            <FontAwesomeIcon icon={faClose}/>
        </Button>
    );
}

export default CloseSidebar;