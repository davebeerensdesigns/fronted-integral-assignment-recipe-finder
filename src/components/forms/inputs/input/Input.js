import React, {useFormContext} from 'react-hook-form';
import {classNames} from '../../../../helpers/classNames';
import FormFieldIconError from "../../elements/error/FormFieldIconError";
import FormFieldMeta from "../../elements/meta/FormFieldMeta";
import FieldLabel from "../../elements/label/FieldLabel";
import FieldWrapper from "../../elements/wrapper/FieldWrapper";


export default function Input(
    {
        label,
        placeholder = '',
        helperText = '',
        id,
        type = 'text',
        readOnly = false,
        validation,
        value,
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
            </FieldLabel>
            <FieldWrapper>
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
                    value={value}
                />

                {errors[id] && (
                    <FormFieldIconError/>
                )}
            </FieldWrapper>
            <FormFieldMeta helperText={helperText} error={errors[id]} />
        </>
    );
}