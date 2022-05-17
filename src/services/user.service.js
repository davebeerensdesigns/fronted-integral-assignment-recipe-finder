import axios from "axios";
import authHeader from "./auth-header";

const API_URL = 'https://frontend-educational-backend.herokuapp.com/api/';

const setUserImage = (image) => {
    return axios.post(API_URL + "user/image", {
        "base64Image": image,
    }, {
        headers: authHeader()
    });
};

const UserService = {
    setUserImage
};
export default UserService;