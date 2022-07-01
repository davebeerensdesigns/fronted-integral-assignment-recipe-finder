import React from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSpinner} from "@fortawesome/pro-regular-svg-icons";
import  './Loader.scss';

function Loader({label = '', hideText = false}) {
    return (
        <div className='loading'>
            <FontAwesomeIcon icon={faSpinner}
                             spin={true}/> {
            !hideText && ('Loading' + (label && ' ') + label)
        }
        </div>
    );
}

export default Loader;