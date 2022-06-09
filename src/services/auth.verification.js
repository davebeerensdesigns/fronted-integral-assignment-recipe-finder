import jwt_decode from "jwt-decode";
import AuthService from "./auth.service";
import notifyToast from "../utils/hooks/notifyToast";
import UserService from "./user.service";


export const authVerification = ([userValue, setUserValue], token) => {
    try {
        const decodedJwt = jwt_decode(token)
        const expiresAt = decodedJwt.exp * 1000
        const currentDate = Date.now()
        if (currentDate >= expiresAt) {
            // token is expired
            AuthService.logout()
            setUserValue(false);
            notifyToast.notifyError('Your token has expired. Log in again.');
        } else {
            UserService.verifyUser().then(() => {
                setUserValue(true);
            }).catch(() => {
                // token not verified
                AuthService.logout()
                setUserValue(false);
                notifyToast.notifyError('Something went wrong. Log in again.');
            })
        }
    } catch (e) {
        // token not verified
        AuthService.logout()
        setUserValue(false);
        notifyToast.notifyError('Something went wrong. Log in again.');
    }
}