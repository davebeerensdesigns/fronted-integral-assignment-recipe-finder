import React from 'react';
import './FieldWrapper.scss';

function FieldWrapper({children}) {
    return (
        <div className='form-field__wrapper'>
            {children}
        </div>
    );
}

export default FieldWrapper;