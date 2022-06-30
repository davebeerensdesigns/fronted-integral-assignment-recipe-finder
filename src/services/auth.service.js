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
    localStorage.removeItem('favorites');
}

const getCurrentUser = () => {
    return localStorage.getItem('token');
}

const getCurrentAvatar = () => {
    return localStorage.getItem('image');
}

const removeCurrentAvatar = () => {
    return localStorage.removeItem('image');
}

const getCurrentFavorites = () => {
    return localStorage.getItem('favorites');
}

const AuthService = {
    register,
    login,
    logout,
    getCurrentUser,
    getCurrentAvatar,
    removeCurrentAvatar,
    getCurrentFavorites
};

export default AuthService;