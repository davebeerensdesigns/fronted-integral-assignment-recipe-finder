import React, {useEffect, useState} from 'react';
import './AccountNav.scss';
import {faUserPlus, faArrowRightToBracket} from "@fortawesome/pro-regular-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useForm } from "react-hook-form";
import Login from "../../components/login/Login";
import Register from "../../components/register/Register";
import AuthService from "../../services/auth.service";
import Profile from "../../components/profile/Profile";

function AccountNav(props) {

    // Tab menu active state
    const [accountActiveTab, setAccountActiveTab] = useState('login');

    // Account login JWT Token
    const [jwtToken, setJwtToken] = useState('');


    const { register, errors, handleSubmit } = useForm();
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

    const [currentUser, setCurrentUser] = useState(undefined);
    useEffect(() => {
        const user = AuthService.getCurrentUser();
        if (user) {
            setCurrentUser(user);
        }
    }, []);
    const logOut = () => {
        AuthService.logout();
        window.location.reload();
    };





    return (
        <aside
            id='account-nav__wrapper'
        >
            {currentUser ? (
                <>
                    Hello {currentUser.username}
                    <button className="nav-link" onClick={logOut}>
                        LogOut
                    </button>

                    <Profile/>
                </>
            ) : (
                <>
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
                            <Login/>
                        }
                        {accountActiveTab === 'register' &&
                            <Register/>
                        }
                    </div>
                </>
            )}




        </aside>
    );
}

export default AccountNav;