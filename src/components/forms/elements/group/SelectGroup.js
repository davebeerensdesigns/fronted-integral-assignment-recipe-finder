import React from 'react';
import './SelectGroup.scss';

function SelectGroup({children}) {
    return (
        <div className='form-select__group'>{children}</div>
    );
}

export default SelectGroup;