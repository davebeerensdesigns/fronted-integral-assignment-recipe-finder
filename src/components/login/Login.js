import React, {useState} from "react";
import AuthService from "../../services/auth.service";
import {FormProvider, useForm} from "react-hook-form";
import Input from "../forms/input/Input";
import Password from "../forms/password/Password";

function Login() {

    const [loading, toggleLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const methods = useForm({mode: 'onBlur'});
    const {handleSubmit} = methods;
    const onSubmitLogin = async (data) => {
        toggleLoading(true);
        setErrorMessage('');
        setSuccessMessage('');
        await AuthService.login(data.usernameLogin, data.passwordLogin)
            .then(
                () => {
                    setSuccessMessage('You are successfully logged in!');
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
    };

    return (
        <FormProvider {...methods}>
            <form id='loginAccount'
                  className='form'
                  onSubmit={handleSubmit(onSubmitLogin)}>
                <div className='form-field__group'>
                    <Input
                        id='usernameLogin'
                        label='Username'
                        placeholder='username'
                        validation={{
                            required: 'Username is required.',
                        }}
                    />
                </div>
                <div className='form-field__group'>
                    <Password
                        id='passwordLogin'
                        label='Password'
                        placeholder='password'
                        validation={{
                            required: 'Password is required',
                        }}
                    />
                </div>

                <button className='btn btn__primary'
                        type='submit'>
                    Login
                </button>

                {loading && (
                    <div className="form-group">
                        <div className="alert alert-info"
                             role="alert">
                            Loading...
                        </div>
                    </div>
                )}

                {errorMessage && (
                    <div className="form-group">
                        <div className="alert alert-danger"
                             role="alert">
                            {errorMessage}
                        </div>
                    </div>
                )}

                {successMessage && (
                    <div className="form-group">
                        <div className="alert alert-success"
                             role="alert">
                            {successMessage}
                        </div>
                    </div>
                )}
            </form>
        </FormProvider>
    );
}

export default Login;