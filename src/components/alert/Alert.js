import React from 'react';
import './Alert.scss';
import {classNames} from "../../helpers/classNames";

function Alert({type, children}) {
    return (
        <div className={classNames('alert', 'alert-' + type)}
             role="alert">
            {children}
        </div>
    );
}

export default Alert;