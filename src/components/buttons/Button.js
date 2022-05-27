import React from 'react';
import './Button.scss';
import {classNames} from "../../helpers/classNames";

function Button({type, style, size, children}) {
    return (
        <button type={type ? type : 'button'} className={classNames('btn', style, size)}>{children}</button>
    );
}

export default Button;