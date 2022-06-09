import React from 'react';
import './Button.scss';
import {classNames} from "../../../helpers/classNames";

function Button({type, customClass, size, children}) {
    return (
        <button type={type ? type : 'button'}
                className={classNames('btn', customClass, size)}>{children}</button>
    );
}

export default Button;