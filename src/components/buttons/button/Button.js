import React from 'react';
import './Button.scss';
import {classNames} from "../../../helpers/classNames";

function Button({type, customClass, size, customClick, children}) {
    return (
        <button type={type ? type : 'button'}
                className={classNames('btn', customClass, size)} onClick={customClick}>{children}</button>
    );
}

export default Button;