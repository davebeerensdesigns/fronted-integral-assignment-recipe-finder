import React from 'react';
import types from "../../config/types";
import {useNavigate} from "react-router-dom";

function FilterType({navigateOnChange, currentType}) {
    let navigate = useNavigate();
    const handleTypeSelect = (event) => {
        const target = event.target.value !== '' ? '?type=' + event.target.value : '';
        navigate(navigateOnChange + target);
    };
    return (
        <div className='type-filter'>
            <select value={currentType}
                    onChange={handleTypeSelect}>
                <option value=''>all types</option>
                {
                    types.map((type, index) => {
                        return (<option key={index}
                                        value={type}>{type}</option>)
                    })
                }
            </select>
        </div>
    );
}

export default FilterType;