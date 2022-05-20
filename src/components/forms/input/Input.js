import React, {useFormContext} from 'react-hook-form';
import {classNames} from '../../../helpers/classNames';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faExclamationCircle} from "@fortawesome/pro-regular-svg-icons";


export default function Input(
    {
        label,
        placeholder = '',
        helperText = '',
        id,
        type = 'text',
        readOnly = false,
        validation,
        ...rest
    }) {
    const {
        register,
        formState: {errors},
    } = useFormContext();

    return (
        <>
            <label htmlFor={id}
                   className='form-field__label'>
                {label}
            </label>
            <div className='form-field__wrapper'>
                <input
                    {...register(id, validation)}
                    {...rest}
                    type={type}
                    name={id}
                    id={id}
                    readOnly={readOnly}
                    className={classNames(
                        readOnly
                            ? 'readonly'
                            : errors[id]
                                ? 'form-field__invalid'
                                : '',
                        'form-field'
                    )}
                    placeholder={placeholder}
                    aria-describedby={id}
                />

                {errors[id] && (
                    <span className='form-field__icon form-field__icon-error'>
                        <FontAwesomeIcon icon={faExclamationCircle}/>
                    </span>
                )}
            </div>
            <div className='form-field__meta'>
                {helperText !== '' && (
                    <p className='form-field__helper'>{helperText}</p>
                )}
                {errors[id] && (
                    <span className='form-field__error'>{errors[id].message}</span>
                )}
            </div>
        </>
    );
}