import React, {useContext} from 'react';
import {AvatarContext} from "../../utils/providers/AvatarContextProvider";
import defaultAvatar from "../../assets/avatar/avatar.jpg";

function Avatar() {
    const [avatarContext, setAvatarContext] = useContext(AvatarContext);

    let img = new Image();
    img.onerror = function(){
        localStorage.removeItem('image');
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