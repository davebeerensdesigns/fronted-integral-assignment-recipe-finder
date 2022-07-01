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
    removeCurrentUser()
    removeCurrentAvatar()
    removeCurrentFavorites()
}

const getCurrentUser = () => {
    return localStorage.getItem('token');
}

const setCurrentUser = (data) => {
    localStorage.setItem('token', data);
}

const removeCurrentUser = () => {
    localStorage.removeItem('token');
}

const getCurrentAvatar = () => {
    return localStorage.getItem('image');
}

const setCurrentAvatar = (data) => {
    localStorage.setItem('image', data);
}

const removeCurrentAvatar = () => {
    localStorage.removeItem('image');
}

const getCurrentFavorites = () => {
    return localStorage.getItem('favorites');
}

const setCurrentFavorites = (data) => {
    localStorage.setItem('favorites', data);
}

const removeCurrentFavorites = () => {
    localStorage.removeItem('favorites');
}

const AuthService = {
    register,
    login,
    logout,
    getCurrentUser,
    setCurrentUser,
    removeCurrentUser,
    getCurrentAvatar,
    setCurrentAvatar,
    removeCurrentAvatar,
    getCurrentFavorites,
    setCurrentFavorites,
    removeCurrentFavorites
};

export default AuthService;