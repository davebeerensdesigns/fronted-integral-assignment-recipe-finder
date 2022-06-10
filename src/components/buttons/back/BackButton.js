import React from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faAngleLeft} from "@fortawesome/pro-regular-svg-icons";
import {Link} from "react-router-dom";
import './BackButton.scss';

function BackButton({path, label}) {
    return (
        <Link className='back-button' to={path}>
            <FontAwesomeIcon icon={faAngleLeft}/> {label}
        </Link>
    );
}

export default BackButton;