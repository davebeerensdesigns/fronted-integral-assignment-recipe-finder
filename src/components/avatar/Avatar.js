import React, {useContext, useEffect, useState} from 'react';
import {AvatarContext} from "../../providers/AvatarProvider";

function Avatar() {
    const [avatarContext, setAvatarContext] = useContext(AvatarContext);

    return (
        <img className='img-avatar' src={avatarContext} alt='User avatar' />
    );
}

export default Avatar;