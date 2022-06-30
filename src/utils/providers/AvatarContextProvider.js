import React, {createContext, useEffect, useState} from "react";
import defaultAvatar from "../../assets/avatar/avatar.jpg";
import {isBase64Image} from "../../helpers/isBase64Image";
import authService from "../../services/auth.service";

export const AvatarContext = createContext(null);

const {Provider} = AvatarContext;

const AvatarContextProvider = ({children}) => {

    let currentAvatar = authService.getCurrentAvatar();
    let currentAvatarData = defaultAvatar;
    if (currentAvatar) {
        if (isBase64Image(currentAvatar)) {
            currentAvatarData = currentAvatar;
        } else {
            currentAvatarData = defaultAvatar;
            authService.removeCurrentAvatar();
        }
    }

    const [avatarValue, setAvatarValue] = useState(currentAvatarData);

    useEffect(() => {
        setAvatarValue(currentAvatarData);
    }, [currentAvatar, currentAvatarData]);

    return <Provider value={[avatarValue, setAvatarValue]}>{children}</Provider>;
};

AvatarContextProvider.context = AvatarContext;

export default AvatarContextProvider;