import React from 'react';
import types from "../../../../config/types";
import {useNavigate} from "react-router-dom";
import './FilterType.scss';
import SelectGroup from "../../elements/group/SelectGroup";

function FilterType({navigateOnChange, currentType}) {
    let navigate = useNavigate();
    const handleTypeSelect = (event) => {
        const target = event.target.value !== '' ? '?type=' + event.target.value : '';
        navigate(navigateOnChange + target);
    };
    return (
        <div className='filter__type'>
            <div className='filter__name'>
                Type of meal
            </div>
            <SelectGroup>
                <select className='form-select' value={currentType}
                        onChange={handleTypeSelect}>
                    <option value=''>all types</option>
                    {
                        types.map((type, index) => {
                            return (<option key={index}
                                            value={type}>{type}</option>)
                        })
                    }
                </select>
            </SelectGroup>
        </div>
    );
}

export default FilterType;