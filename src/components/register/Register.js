import React, { useState, useRef } from "react";
import AuthService from "../../services/auth.service";
import {useForm} from "react-hook-form";

function Register(props) {

    const { register, errors, handleSubmit } = useForm();
    const onSubmitRegister = (data) => {
        console.log(data)
        AuthService.register(data.usernameRegister, data.emailRegister, data.passwordRegister)
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            }
        );
    }

    return (
        <form id='registerAccount' onSubmit={handleSubmit(onSubmitRegister)}>
            <label>Username</label>
            <input
                type="text"
                {...register("usernameRegister", { required: true })}
            />
            <label>Email</label>
            <input
                type="text"
                {...register("emailRegister", {
                    required: true,
                    pattern: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                })}
            />
            <label>Password</label>
            <input
                type="password"
                autoComplete='on'
                {...register("passwordRegister", { required: true })}
            />

            <input type="submit" />
        </form>
    );
}

export default Register;