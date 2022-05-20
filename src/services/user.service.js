import axios from "axios";
import authHeader from "./auth-header";

const API_URL = 'https://frontend-educational-backend.herokuapp.com/api/';

const verifyUser = () => {
    return axios.get(API_URL + "test/user", {
        headers: authHeader()
    });
};

const setUserImage = (image) => {
    return axios.post(API_URL + "user/image", {
        "base64Image": image,
    }, {
        headers: authHeader()
    });
};

const getUserDetails = () => {
    return axios.get(API_URL + "user", {
        headers: authHeader()
    });
};

const UserService = {
    verifyUser,
    setUserImage,
    getUserDetails
};
export default UserService;