import React, {useFormContext} from 'react-hook-form';
import {classNames} from '../../../../helpers/classNames';
import Avatar from "../../../profile/Avatar";
import './ProfileImage.scss';
import FormFieldIconError from "../../elements/error/FormFieldIconError";
import FormFieldMeta from "../../elements/meta/FormFieldMeta";
import FieldLabel from "../../elements/label/FieldLabel";


export default function ProfileImage(
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
            <FieldLabel id={id}>
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
                        <FormFieldIconError/>
                    )}
                </div>
            </FieldLabel>
            <FormFieldMeta helperText={helperText} error={errors[id]} />
        </>
    );
}