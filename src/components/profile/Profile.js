import React, {useEffect, useState} from 'react';
import UserService from "../../services/user.service";

function Profile(props) {


    const [profileData, setProfileData] = useState({
        username: '',
        email: ''
    });

    // TODO: Get available userdata from jwt token or store neccesary data on login. then build the profile with that.
    // TODO: Add profile image
    // TODO: Create form to update profile

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
                (error) => {
                    setProfileData({
                        username: 'undefined',
                        email: 'undefined'
                    })
                });
    }, []);


    return (
        <div className="profile">
            <header>
                <h3>
                    Profile
                </h3>
            </header>

            <p>
                <strong>username:</strong> {profileData.username}
            </p>
            <p>
                <strong>Email:</strong> {profileData.email}
            </p>
        </div>
    );
}

export default Profile;