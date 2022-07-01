import React, {useState} from 'react';
import {useFormContext} from 'react-hook-form';
import {classNames} from '../../../../helpers/classNames';
import {faEye, faEyeSlash} from "@fortawesome/pro-regular-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import './Password.scss';
import FormFieldIconError from "../../elements/error/FormFieldIconError";
import FormFieldMeta from "../../elements/meta/FormFieldMeta";
import FieldLabel from "../../elements/label/FieldLabel";
import FieldWrapper from "../../elements/wrapper/FieldWrapper";

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
            <FieldLabel id={id}>
                {label}
            </FieldLabel>
            <FieldWrapper>
                <input
                    {...register(id, validation)}
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
                    <FormFieldIconError/>
                )}
            </FieldWrapper>
            <FormFieldMeta helperText={helperText}
                           error={errors[id]}/>
        </>
    );

}