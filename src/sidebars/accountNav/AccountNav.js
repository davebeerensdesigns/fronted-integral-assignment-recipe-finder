import React, {useState} from 'react';
import '../../sidebars/accountNav/AccountNav.css';
import {faUserPlus, faArrowRightToBracket} from "@fortawesome/pro-regular-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

function AccountNav(props) {

    const [accountActiveTab, setAccountActiveTab] = useState('login');

    return (
        <aside
            id='account-nav__wrapper'
        >
            {/* GUEST USER */}
            <nav>
                <button onClick={() => {setAccountActiveTab('register')}}>
                    <FontAwesomeIcon icon={ faUserPlus } />
                </button>
                <button onClick={() => {setAccountActiveTab('login')}}>
                    <FontAwesomeIcon icon={ faArrowRightToBracket } />
                </button>
            </nav>
            <div className='tabs'>
                {accountActiveTab === 'login' &&
                    'show login'
                }
                {accountActiveTab === 'register' &&
                    'show register'
                }
            </div>
        </aside>
    );
}

export default AccountNav;