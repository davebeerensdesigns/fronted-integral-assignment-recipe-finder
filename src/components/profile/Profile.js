import React, {useEffect, useState} from 'react';
import UserService from "../../services/user.service";

function Profile(props) {


    const [currentUser, setCurrentUser] = useState({
        username: '',
        email: ''
    });

    useEffect( () => {
        UserService.getUserDetails().then(
            (success) => {
                setCurrentUser({
                    username: success.data.username,
                    email: success.data.email
                })
            }
        );
    }, []);


    return (
        <div className="profile">
            <header>
                <h3>
                    Settings
                </h3>
            </header>

            <p>
                <strong>username:</strong> {currentUser.username}
            </p>
            <p>
                <strong>Email:</strong> {currentUser.email}
            </p>
        </div>
    );
}

export default Profile;