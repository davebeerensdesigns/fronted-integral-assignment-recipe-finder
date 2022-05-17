import React, {useState} from 'react';
import './AccountNav.scss';
import {faUserPlus, faArrowRightToBracket} from "@fortawesome/pro-regular-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useForm } from "react-hook-form";

function AccountNav(props) {

    // Tab menu active state
    const [accountActiveTab, setAccountActiveTab] = useState('login');

    // Account login JWT Token
    const [jwtToken, setJwtToken] = useState('');


    const { register, errors, handleSubmit } = useForm();
    const onSubmitLogin = (data) => {
        console.log(data);
        loginAccount(data);
    };
    const onSubmitRegister = (data) => {
        console.log(data);
        createAccount(data);
    };

    const createAccount = (data) => {
        axios.post('https://frontend-educational-backend.herokuapp.com/api/auth/signup', {
            //TODO: info field is not yet working
            "username": data.usernameRegister,
            "email" : data.emailRegister,
            "password" : data.passwordRegister,
            "info" : "dit is het info veld",
            "role": ["user"]
        })
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    const loginAccount = (data) => {
        axios.post('https://frontend-educational-backend.herokuapp.com/api/auth/signin', {
            "username": data.usernameLogin,
            "password" : data.passwordLogin,
        })
            .then(function (response) {
                console.log(response);
                setJwtToken(response.data.accessToken);
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    const getProfile = () => {
        axios.get('https://frontend-educational-backend.herokuapp.com/api/user', {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${jwtToken}`,
            }
        })
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
    }



    const setProfilePicture = () => {
        axios.post('https://frontend-educational-backend.herokuapp.com/api/user/image', {
            "base64Image": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg=="
        },{
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${jwtToken}`,
            }})
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
    }







    return (
        <aside
            id='account-nav__wrapper'
        >
            {/* GUEST USER */}
            <nav>
                <button onClick={() => {setAccountActiveTab('register')}}>
                    <FontAwesomeIcon icon={ faUserPlus } />
                </button>
                <button onClick={() => {setAccountActiveTab('login')}}>
                    <FontAwesomeIcon icon={ faArrowRightToBracket } />
                </button>
            </nav>
            <div className='tabs'>
                {accountActiveTab === 'login' &&
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
                }
                {accountActiveTab === 'register' &&
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
                }
            </div>



        </aside>
    );
}

export default AccountNav;