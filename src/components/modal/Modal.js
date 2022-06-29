import React from 'react';
import './Modal.scss';

function Modal({children}) {
    return (
        <div className='modal__overlay'>
            <div className='modal__window'>
                <div className='modal__body'>
                {children}
                </div>
            </div>
        </div>
    );
}

export default Modal;