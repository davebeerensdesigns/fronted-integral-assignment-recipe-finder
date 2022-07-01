import React from 'react';
import {classNames} from "../../../helpers/classNames";

function Button({type, customClass, size, customClick, children, id}) {
    return (
        <button id={id} type={type ? type : 'button'}
                className={classNames('btn', customClass, size)} onClick={customClick}>{children}</button>
    );
}

export default Button;