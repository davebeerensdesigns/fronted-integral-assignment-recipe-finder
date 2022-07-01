import React, {useState, useContext} from "react";
import AuthService from "../../../../services/auth.service";
import {FormProvider, useForm} from "react-hook-form";
import Input from "../../inputs/input/Input";
import Password from "../../inputs/password/Password";
import {UserContext} from "../../../../utils/providers/UserContextProvider";
import notifyToast from "../../../../utils/hooks/notifyToast";
import Button from "../../../buttons/button/Button";
import Alert from "../../../alert/Alert";
import {AccountTabContext} from "../../../../utils/providers/AccountTabContextProvider";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSpinner} from "@fortawesome/pro-regular-svg-icons";
import './Login.scss';
import UserService from "../../../../services/user.service";
import {AvatarContext} from "../../../../utils/providers/AvatarContextProvider";
import {FavoriteRecipesContext} from "../../../../utils/providers/FavoriteRecipesContextProvider";
import FormNotice from "../../elements/notice/FormNotice";
import FieldGroup from "../../elements/group/FieldGroup";
import authService from "../../../../services/auth.service";

function Login() {

    const [, setAvatarValue] = useContext(AvatarContext);
    const [loading, toggleLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const [, setUser] = useContext(UserContext);
    const [, setAccountTab] = useContext(AccountTabContext);
    const [, setFavoriteRecipes] = useContext(FavoriteRecipesContext);

    const methods = useForm({mode: 'onBlur'});
    const {handleSubmit} = methods;
    const onSubmitLogin = async (data) => {
        toggleLoading(true);
        setErrorMessage('');
        AuthService.login(data.usernameLogin, data.passwordLogin)
            .then(
                (response) => {
                    if (response.data.accessToken) {
                        notifyToast.notifySuccess('You are successfully logged in!');
                        setUser(true);
                        authService.setCurrentUser(response.data.accessToken);
                        UserService.getUserDetails().then(
                            (response) => {
                                if (response.data.profilePicture) {
                                    authService.setCurrentAvatar(response.data.profilePicture);
                                    setAvatarValue(response.data.profilePicture);
                                }
                                if (response.data.info) {
                                    authService.setCurrentFavorites(response.data.info);
                                    setFavoriteRecipes(response.data.info);
                                }
                            }
                        )
                        methods.reset();
                        setAccountTab(arr => ({...arr, show: false}))
                    } else {
                        setErrorMessage('Something went wrong');
                        methods.reset();
                    }
                    toggleLoading(false);
                })
            .catch(
                (error) => {
                    const errorMessage =
                        (error.response.data.error && (error.response.data.status === 401 ? 'Wrong username and/or password' : error.response.data.error)) ||
                        error.response.data.message ||
                        error.message ||
                        error.toString();
                    setErrorMessage(errorMessage);
                    methods.reset();
                    toggleLoading(false);
                }
            )
    };

    return (
        <>
            <header id='login__header'>
                <h3>
                    Login
                </h3>
            </header>
            <FormProvider {...methods}>
                <form id='loginAccount'
                      className='form'
                      onSubmit={handleSubmit(onSubmitLogin)}>
                    <FieldGroup>
                        <Input
                            id='usernameLogin'
                            label='Username'
                            placeholder='username'
                            validation={{
                                required: 'Username is required.',
                            }}
                        />
                    </FieldGroup>
                    <FieldGroup>
                        <Password
                            id='passwordLogin'
                            label='Password'
                            placeholder='password'
                            validation={{
                                required: 'Password is required',
                            }}
                        />
                    </FieldGroup>

                    <Button type='submit'
                            customClass='btn-primary'>Login {loading && <FontAwesomeIcon icon={faSpinner}
                                                                                   spin={true}/>}</Button>

                    {errorMessage && (
                        <FormNotice>
                            <Alert type='danger'>
                                {errorMessage}
                            </Alert>
                        </FormNotice>
                    )}
                </form>
            </FormProvider>
        </>
    );
}

export default Login;