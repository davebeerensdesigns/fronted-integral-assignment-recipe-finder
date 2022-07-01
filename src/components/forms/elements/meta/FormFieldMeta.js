import React from 'react';
import './FormFieldMeta.scss';

function FormFieldMeta({helperText, error}) {
    return (
        <div className='form-field__meta'>
            {helperText !== '' && (
                <p className='form-field__helper'>{helperText}</p>
            )}
            {error && (
                <span className='form-field__error text-danger'>{error.message}</span>
            )}
        </div>
    );
}

export default FormFieldMeta;