import axios from "axios";

const API_URL = 'https://frontend-educational-backend.herokuapp.com/api/auth/';

const register = (username, email, password) => {
    return axios.post(API_URL + 'signup', {
        "username": username,
        "email": email,
        "password": password,
        "role": ["user"]
    });
};

const login = (username, password) => {
    return axios.post(API_URL + 'signin', {
        username,
        password,
    });
}

const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('image');
}

const getCurrentUser = () => {
    return localStorage.getItem('token');
}

const AuthService = {
    register,
    login,
    logout,
    getCurrentUser
};

export default AuthService;