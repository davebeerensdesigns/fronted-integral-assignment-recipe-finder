import axios from "axios";
import authHeader from "./auth-header";

const API_URL = 'https://frontend-educational-backend.herokuapp.com/api/';

const getUserBoard = () => {
    return axios.get(API_URL + "user", { headers: authHeader() });
};

const UserService = {
    getUserBoard,
};
export default UserService;