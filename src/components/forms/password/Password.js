import React, {useState} from 'react';
import {useFormContext} from 'react-hook-form';
import {classNames} from '../../../helpers/classNames';
import {faEye, faEyeSlash, faExclamationCircle} from "@fortawesome/pro-regular-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import './Password.scss';

export default function Password(
    {
        label,
        placeholder = '',
        helperText = '',
        id,
        readOnly = false,
        validation,
        ...rest
    }) {
    const {
        register,
        formState: {errors},
    } = useFormContext();

    const [showPassword, setShowPassword] = useState(false);
    const togglePassword = () => setShowPassword((prev) => !prev);

    return (
        <>
            <label htmlFor={id}
                   className='form-field__label'>
                {label}
            </label>
            <div className='form-field__wrapper'>
                <input{...register(id, validation)}
                      {...rest}
                      type={showPassword ? 'text' : 'password'}
                      name={id}
                      id={id}
                      readOnly={readOnly}
                      autoComplete='on'
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
                <span
                    type=''
                    onClick={(e) => {
                        e.preventDefault();
                        togglePassword();
                    }}
                    className='btn__show-password'
                >
                    {showPassword ? (
                        <FontAwesomeIcon icon={faEyeSlash}/>
                    ) : (
                        <FontAwesomeIcon icon={faEye}/>
                    )}
                </span>
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