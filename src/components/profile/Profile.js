import React from 'react';
import AuthService from "../../services/auth.service";
import UserService from "../../services/user.service";
import userService from "../../services/user.service";

function Profile(props) {

    const currentUser = AuthService.getCurrentUser();

    const setUserImage = () => {
        UserService.setUserImage("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg==").then(
            (response) => {

                const base64Image = response.data.base64Image;
                const updatedUser = Object.assign({
                    base64Image
                }, currentUser);

                localStorage.setItem('user', JSON.stringify(updatedUser));
                //TODO: use async instead of reloading the app
                window.location.reload();
            },
            (error) => {
                const resMessage =
                    (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                    error.message ||
                    error.toString();
            }
        );
    }

    return (
        <div className="container">
            <header className="jumbotron">
                {currentUser.base64Image &&
                    <img src={currentUser.base64Image} />
                }
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
            <div>
                <button onClick={setUserImage}>set image</button>
            </div>
        </div>
    );
}

export default Profile;