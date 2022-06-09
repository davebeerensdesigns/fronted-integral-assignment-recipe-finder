import React, {useState} from "react";
import AuthService from "../../../../services/auth.service";
import {FormProvider, useForm} from "react-hook-form";
import Input from "../../inputs/input/Input";
import Password from "../../inputs/password/Password";
import Button from "../../../buttons/button/Button";
import Alert from "../../../alert/Alert";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSpinner} from "@fortawesome/pro-regular-svg-icons";

function Register() {


    const [loading, toggleLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const methods = useForm({mode: 'onBlur'});
    const {handleSubmit} = methods;
    const onSubmitRegister = async (data) => {
        toggleLoading(true);
        setErrorMessage('');
        setSuccessMessage('');
        await AuthService.register(data.usernameRegister, data.emailRegister, data.passwordRegister)
            .then(
                () => {
                    setSuccessMessage('You have successfully registered your account!');
                    methods.reset();
                    toggleLoading(false);
                }
            )
            .catch(
                (error) => {
                    const errorMessage =
                        (error.response &&
                            error.response.data) ||
                        error.message ||
                        error.toString();
                    setErrorMessage(errorMessage);
                    methods.reset();
                    toggleLoading(false);
                }
            );
    }

    return (
        <>
            <header id='register__header'>
                <h3>
                    Register
                </h3>
            </header>
            <FormProvider {...methods}>
                <form id='registerAccount'
                      onSubmit={handleSubmit(onSubmitRegister)}>
                    <div className='form-field__group'>
                        <Input
                            id='usernameRegister'
                            label='Username'
                            placeholder='username'
                            validation={{
                                required: 'Username is required.',
                                minLength: {
                                    value: 3,
                                    message: 'The username must be between 3 and 20 characters.'
                                },
                                maxLength: {
                                    value: 20,
                                    message: 'The username must be between 3 and 20 characters.'
                                },
                                pattern: {
                                    value: /^[A-Za-z][A-Za-z0-9]+$/i,
                                    message: 'The username must start with a letter. No special characters allowed.'
                                }
                            }}
                        />
                    </div>
                    <div className='form-field__group'>
                        <Input
                            id='emailRegister'
                            label='Email'
                            placeholder='email'
                            validation={{
                                required: 'Email is required.',
                                pattern: {
                                    value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                                    message: 'This is not a valid email.'
                                }
                            }}
                        />
                    </div>
                    <div className='form-field__group'>
                        <Password
                            id='passwordRegister'
                            label='Password'
                            placeholder='password'
                            validation={{
                                required: 'Password is required',
                                minLength: {
                                    value: 6,
                                    message: 'The password must be between 6 and 40 characters.'
                                },
                                maxLength: {
                                    value: 40,
                                    message: 'The password must be between 6 and 40 characters.'
                                },
                            }}
                        />
                    </div>

                    <Button type='submit'
                            customClass='btn-primary'>Register {loading && <FontAwesomeIcon icon={faSpinner}
                                                                                      spin={true}/>}</Button>

                    {errorMessage && (
                        <div className="form-notice">
                            <Alert type='danger'>
                                {errorMessage}
                            </Alert>
                        </div>
                    )}

                    {successMessage && (
                        <div className="form-notice">
                            <Alert type='success'>
                                {successMessage}
                            </Alert>
                        </div>
                    )}
                </form>
            </FormProvider>
        </>
    );
}

export default Register;