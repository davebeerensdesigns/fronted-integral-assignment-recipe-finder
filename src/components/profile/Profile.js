import React from 'react';
import Logout from "../logout/Logout";
import './Profile.scss';
import ProfileUpdate from "../profile-update/ProfileUpdate";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowRightFromBracket} from "@fortawesome/pro-regular-svg-icons";

function Profile() {

    return (
        <div className="profile">
            <header id='profile__header'>
                <h3>
                    Profile
                </h3>

                <Logout buttonClass='btn btn-sm'>
                    <FontAwesomeIcon icon={faArrowRightFromBracket}/> Logout
                </Logout>
            </header>

            <ProfileUpdate/>
        </div>
    );
}

export default Profile;