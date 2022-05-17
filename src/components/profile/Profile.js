import React from 'react';
import AuthService from "../../services/auth.service";

function Profile(props) {

    const currentUser = AuthService.getCurrentUser();

    return (
        <div className="container">
            <header className="jumbotron">
                <h3>
                    <strong>{currentUser.username}</strong> Profile
                </h3>
            </header>
            <p>
                <strong>Token:</strong> {currentUser.accessToken.substring(0, 20)} ...{" "}
                {currentUser.accessToken.substring(currentUser.accessToken.length - 20)}
            </p>
            <p>
                <strong>Id:</strong> {currentUser.id}
            </p>
            <p>
                <strong>Email:</strong> {currentUser.email}
            </p>
            <strong>Authorities:</strong>
            <div>
                {currentUser.roles &&
                    currentUser.roles.map((role, index) => <p key={index}>{role}</p>)}
            </div>
        </div>
    );
}

export default Profile;