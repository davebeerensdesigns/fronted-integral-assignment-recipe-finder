import React from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faClose} from "@fortawesome/pro-regular-svg-icons";
import './CloseSidebar.scss';

function CloseSidebar({id, customClick}) {
    return (
        <button id={id}
                className='btn btn-icon btn-round'
                onClick={customClick}>
            <FontAwesomeIcon icon={faClose}/>
        </button>
    );
}

export default CloseSidebar;