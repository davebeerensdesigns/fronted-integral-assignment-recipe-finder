import React, {useState, useContext} from "react";
import AuthService from "../../services/auth.service";
import {FormProvider, useForm} from "react-hook-form";
import Input from "../forms/input/Input";
import Password from "../forms/password/Password";
import {UserContext} from "../../providers/UserProvider";

function Login() {

    const [loading, toggleLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const [user, setUser] = useContext(UserContext);

    const methods = useForm({mode: 'onBlur'});
    const {handleSubmit} = methods;
    const onSubmitLogin = async (data) => {
        toggleLoading(true);
        setErrorMessage('');
        setSuccessMessage('');
        AuthService.login(data.usernameLogin, data.passwordLogin)
            .then(
                (response) => {
                    if(response.data.accessToken){
                        localStorage.setItem('token', response.data.accessToken);
                        setSuccessMessage('You are successfully logged in!');
                        setUser({
                            loggedIn: true
                        });
                        methods.reset();
                    } else {
                        setSuccessMessage('Something went wrong');
                        methods.reset();
                    }
                    toggleLoading(false);
                })
            .catch(
                (error) => {
                    const errorMessage =
                        (error.response.data.error && (error.response.data.status === 401 ? 'Wrong username and/or password' : error.response.data.error)) ||
                        error.response.data.message ||
                        error.message ||
                        error.toString();
                    setErrorMessage(errorMessage);
                    methods.reset();
                    toggleLoading(false);
                    console.clear();
                }
            )
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