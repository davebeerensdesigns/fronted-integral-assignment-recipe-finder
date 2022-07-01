import React from 'react';
import './FieldGroup.scss';

function FieldGroup({children}) {
    return (
        <div className='form-field__group'>{children}</div>
    );
}

export default FieldGroup;