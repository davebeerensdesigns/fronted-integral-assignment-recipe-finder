import React from 'react';
import './FieldLabel.scss';

function FieldLabel({id, children}) {
    return (
        <label htmlFor={id}
               className='form-field__label'>
            {children}
        </label>
    );
}

export default FieldLabel;