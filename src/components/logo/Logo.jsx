import React from 'react';
import '../../components/logo/Logo.css';
import { ReactComponent as AppLogo } from '../../assets/logo/logo.svg';

function Logo(props) {
    return (
        <AppLogo
            id='app-logo__img'
        />
    );
}

export default Logo;