import React, {useState} from 'react';
import './AccountNav.scss';
import {faUserPlus, faArrowRightToBracket} from "@fortawesome/pro-regular-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import axios from "axios";

function AccountNav(props) {

    const [accountActiveTab, setAccountActiveTab] = useState('login');

    const [jwtToken, setJwtToken] = useState('');

    function register(){
        axios.post('https://frontend-educational-backend.herokuapp.com/api/auth/signup', {
            "username": "jan",
            "email" : "jan@novi.nl",
            "password" : "123456",
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

    function login(){
        axios.post('https://frontend-educational-backend.herokuapp.com/api/auth/signin', {
            "username": "jan",
            "password" : "123456",
        })
            .then(function (response) {
                console.log(response);
                setJwtToken(response.data.accessToken);
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    function getProfile(){
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



    function setProfilePicture(){
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
                    <button onClick={login}
                    >login</button>
                }
                {accountActiveTab === 'register' &&
                    <button onClick={register}
                    >register</button>
                }
                <button onClick={getProfile}
                >getProfile</button>
                <button onClick={setProfilePicture}
                >setProfileImage</button>
            </div>
        </aside>
    );
}

export default AccountNav;