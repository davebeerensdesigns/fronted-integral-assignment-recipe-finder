import React, {createContext, useEffect, useState} from "react";
import defaultAvatar from "../assets/avatar/avatar.jpg";

export const AvatarContext = createContext(null);

const { Provider } = AvatarContext;

const AvatarProvider = ({ children }) => {

    let currentAvatar = localStorage.getItem('image');
    let currentAvatarData = (currentAvatar ? currentAvatar : defaultAvatar);

    const [avatarValue, setAvatarValue] = useState(currentAvatarData);

    useEffect(() => {
        setAvatarValue(currentAvatar ? currentAvatar : defaultAvatar);
    }, [currentAvatar]);

    return <Provider value={[avatarValue, setAvatarValue]}>{children}</Provider>;
};

AvatarProvider.context = AvatarContext;

export default AvatarProvider;