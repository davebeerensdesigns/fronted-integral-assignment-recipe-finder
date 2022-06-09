import React, {useFormContext} from 'react-hook-form';
import {classNames} from '../../../../helpers/classNames';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faExclamationCircle} from "@fortawesome/pro-regular-svg-icons";
import '../../Forms.scss'
import Avatar from "../../../profile/Avatar";


export default function Image(
    {
        label,
        placeholder = '',
        helperText = '',
        id,
        type = 'file',
        readOnly = false,
        validation,
        value,
        children,
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
                <figure id='profile-picture'>
                    <Avatar/>
                </figure>
                <div className='file-field__wrapper'>
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
                            'file-field'
                        )}
                        placeholder={placeholder}
                        aria-describedby={id}
                        value={value}
                        accept='.png, .jpg'
                        multiple={false}

                    />

                    {errors[id] && (
                        <span className='form-field__icon form-field__icon-error'>
                            <FontAwesomeIcon icon={faExclamationCircle}/>
                        </span>
                    )}
                </div>
            </label>
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