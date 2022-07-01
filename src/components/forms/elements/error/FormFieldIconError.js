import React from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faExclamationCircle} from "@fortawesome/pro-regular-svg-icons";
import './FormFieldIconError.scss';

function FormFieldIconError() {
    return (
        <span className='form-field__icon form-field__icon-error text-danger'>
                        <FontAwesomeIcon icon={faExclamationCircle}/>
                    </span>
    );
}

export default FormFieldIconError;