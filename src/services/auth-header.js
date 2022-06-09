import AuthService from "./auth.service";

export default function authHeader() {
    const user = AuthService.getCurrentUser();
    return user && {"Content-Type": "application/json", "Authorization": "Bearer " + user};
}