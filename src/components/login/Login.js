import React, {useState, useContext} from "react";
import AuthService from "../../services/auth.service";
import {FormProvider, useForm} from "react-hook-form";
import Input from "../forms/input/Input";
import Password from "../forms/password/Password";
import {UserContext} from "../../providers/UserProvider";
import toastMessage from "../../helpers/toastMessage";

function Login() {

    const [loading, toggleLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const [user, setUser] = useContext(UserContext);

    const methods = useForm({mode: 'onBlur'});
    const {handleSubmit} = methods;
    const onSubmitLogin = async (data) => {
        toggleLoading(true);
        setErrorMessage('');
        AuthService.login(data.usernameLogin, data.passwordLogin)
            .then(
                (response) => {
                    if(response.data.accessToken){
                        localStorage.setItem('token', response.data.accessToken);
                        toastMessage.notifySuccess('You are successfully logged in!');
                        setUser(true);
                        methods.reset();
                    } else {
                        setErrorMessage('Something went wrong');
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
            </form>
        </FormProvider>
    );
}

export default Login;