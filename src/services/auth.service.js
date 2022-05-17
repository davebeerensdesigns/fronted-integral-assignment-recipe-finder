import axios from "axios";

const API_URL = 'https://frontend-educational-backend.herokuapp.com/api/auth/';

const register = (username, email, password) => {
    return axios.post(API_URL + 'signup', {
        "username": username,
        "email" : email,
        "password" : password,
        "info" : "dit is het info veld",
        "role": ["user"]
    });
};

const login = (username, password) => {
    return axios.post(API_URL + 'signin', {
        username,
        password,
    })
        .then((response) => {
            if(response.data.accessToken){
                localStorage.setItem('user', JSON.stringify(response.data));
            }
            return response.data;
        });
}

const logout = () => {
    localStorage.removeItem('user');
}

const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem('user'));
}

const AuthService = {
    register,
    login,
    logout,
    getCurrentUser
};

export default AuthService;