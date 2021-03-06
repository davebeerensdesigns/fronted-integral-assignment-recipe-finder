import React, {useEffect, useState, useContext} from 'react';
import Input from "../../inputs/input/Input";
import Password from "../../inputs/password/Password";
import Button from "../../../buttons/button/Button";
import {FormProvider, useForm} from "react-hook-form";
import UserService from "../../../../services/user.service";
import Alert from "../../../alert/Alert";
import ProfileImage from "../../inputs/image/ProfileImage";
import {AvatarContext} from "../../../../utils/providers/AvatarContextProvider";
import authService from "../../../../services/auth.service";
import Loader from "../../../loader/Loader";
import './ProfileUpdate.scss';
import FormNotice from "../../elements/notice/FormNotice";
import FieldGroup from "../../elements/group/FieldGroup";

function ProfileUpdate() {

    const [loading, toggleLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [, setAvatarValue] = useContext(AvatarContext);

    const [profileData, setProfileData] = useState({
        username: '',
        email: ''
    });

    const toBase64 = file => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });

    const methods = useForm({mode: 'onBlur'});
    const {handleSubmit, getValues} = methods;
    const onSubmitUpdate = async (data) => {
        toggleLoading(true);
        setErrorMessage('');
        setSuccessMessage('');
        const saveData = {};
        if (data.emailUpdate) {
            saveData.email = data.emailUpdate
        }
        if (data.passwordUpdate) {
            saveData.password = data.passwordUpdate
        }
        if (data.passwordUpdateConfirm) {
            saveData.repeatedPassword = data.passwordUpdateConfirm
        }
        if (data.avatarUpdate.length > 0) {
            saveData.base64Image = await toBase64(data.avatarUpdate[0])
        }

        if (Object.keys(saveData).length !== 0) {
            await UserService.updateUserDetails(JSON.stringify(saveData))
                .then(
                    (response) => {
                        setProfileData({
                            username: response.data.username,
                            email: response.data.email
                        });
                        authService.setCurrentAvatar(response.data.profilePicture)
                        setAvatarValue(response.data.profilePicture)
                        setSuccessMessage('You have successfully updated your account!');
                        methods.reset();
                        toggleLoading(false);
                    })
                .catch(
                    (error) => {
                        const errorMessage =
                            (error.response &&
                                error.response.data) ||
                            error.message ||
                            error.toString();
                        setErrorMessage(errorMessage);
                        methods.reset();
                        toggleLoading(false);
                    }
                )
        } else {
            setErrorMessage("All fields are empty!");
            methods.reset();
            toggleLoading(false);
        }
    };


    useEffect(() => {
        UserService.getUserDetails()
            .then(
                (response) => {
                    setProfileData({
                        username: response.data.username,
                        email: response.data.email
                    })
                })
            .catch(
                () => {
                    setProfileData({
                        username: 'undefined',
                        email: 'undefined'
                    })
                });
    }, []);


    return (
        <FormProvider {...methods}>
            <form id='updateAccount'
                  className='form'
                  onSubmit={handleSubmit(onSubmitUpdate)}>
                <FieldGroup>
                    <ProfileImage
                        type='file'
                        id='avatarUpdate'
                        label='Avatar'
                    />
                </FieldGroup>
                <FieldGroup>
                    <Input
                        id='usernameUpdate'
                        label='Username'
                        placeholder={profileData.username}
                        readOnly={true}
                        value={profileData.username}
                    />
                </FieldGroup>
                <FieldGroup>
                    <Input
                        type='email'
                        id='emailUpdate'
                        label='Email'
                        placeholder={profileData.email}
                        validation={{
                            pattern: {
                                value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                                message: 'This is not a valid email.'
                            }
                        }}
                    />
                </FieldGroup>
                <FieldGroup>
                    <Password
                        id='passwordUpdate'
                        label='New password'
                        placeholder='password'
                        validation={{
                            minLength: {
                                value: 6,
                                message: 'The password must be between 6 and 40 characters.'
                            },
                            maxLength: {
                                value: 40,
                                message: 'The password must be between 6 and 40 characters.'
                            }
                        }}
                    />
                </FieldGroup>
                <FieldGroup>
                    <Password
                        id='passwordUpdateConfirm'
                        label='Confirm password'
                        placeholder='password'

                        validation={{
                            validate: (value) => {
                                const {passwordUpdate} = getValues();
                                return passwordUpdate === value || "Password doesn't match!";
                            }
                        }}
                    />
                </FieldGroup>

                <Button type='submit'
                        customClass='btn-primary'>Save settings {loading && <Loader hideText={true} />}</Button>

                {errorMessage && (
                    <FormNotice>
                        <Alert type='danger'>
                            {errorMessage}
                        </Alert>
                    </FormNotice>
                )}

                {successMessage && (
                    <FormNotice>
                        <Alert type='success'>
                            {successMessage}
                        </Alert>
                    </FormNotice>
                )}
            </form>
        </FormProvider>
    );
}

export default ProfileUpdate;