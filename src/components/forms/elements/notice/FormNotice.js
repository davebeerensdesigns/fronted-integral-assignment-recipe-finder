import React from 'react';
import './FormNotice.scss';

function FormNotice({children}) {
    return (
        <div className="form-notice">
            {children}
        </div>
    );
}

export default FormNotice;