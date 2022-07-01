import React, {useContext} from 'react';
import {AvatarContext} from "../../utils/providers/AvatarContextProvider";
import defaultAvatar from "../../assets/avatar/avatar.jpg";
import authService from "../../services/auth.service";

function Avatar() {
    const [avatarContext, setAvatarContext] = useContext(AvatarContext);

    let img = new Image();
    img.onerror = function(){
        authService.removeCurrentAvatar();
        setAvatarContext(defaultAvatar);
    }
    img.src = avatarContext;

    return (
        <img className='img-avatar'
             src={img.src}
             alt='User avatar'
        />
    );
}

export default Avatar;