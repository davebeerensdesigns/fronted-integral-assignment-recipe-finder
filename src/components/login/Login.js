import React from "react";
import AuthService from "../../services/auth.service";
import {useForm} from "react-hook-form";

function Login(props) {

    const { register, errors, handleSubmit } = useForm();
    const onSubmitLogin = (data) => {
        AuthService.login(data.usernameLogin, data.passwordLogin).then(
            () => {
                //TODO: use async instead of reloading the app
                window.location.reload();
            },
            (error) => {
                const resMessage =
                    (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                    error.message ||
                    error.toString();
            }
        );
    };

    return (
        <form id='loginAccount' onSubmit={handleSubmit(onSubmitLogin)}>
            <label>Username</label>
            <input
                type="text"
                {...register("usernameLogin", { required: true })}
            />
            <label>Password</label>
            <input
                type="password"
                autoComplete='on'
                {...register("passwordLogin", { required: true })}
            />

            <input type="submit" />
        </form>
    );
}

export default Login;