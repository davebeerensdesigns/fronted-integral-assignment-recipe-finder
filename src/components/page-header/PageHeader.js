import React, {useContext} from 'react';
import {AccountTabContext} from "../../providers/AccountTabProvider";
import {MainNavContext} from "../../providers/MainNavProvider";
import {UserContext} from "../../providers/UserProvider";

function PageHeader(props) {


    const [accountTab, setAccountTab] = useContext(AccountTabContext);
    const [mainNav, setMainNav] = useContext(MainNavContext);
    const [user, setUser] = useContext(UserContext);

    return (
        <div>
            <button onClick={() => {
                {
                    setMainNav(arr => ({...arr, show: !arr.show}))
                }
            }}>
                MENU
            </button>
            <input type='text'
                   placeholder='search recipes'/>
            {user ? (
                <button onClick={() => {
                    {
                        setAccountTab(arr => ({...arr, show: !arr.show}))
                    }
                }}>
                    AVATAR
                </button>
            ) : (
                <>
                    <button onClick={() => {
                        {
                            setAccountTab(arr => ({...arr, show: true, guest: 'login'}))
                        }
                    }}>
                        Login
                    </button>
                    <button onClick={() => {
                        {
                            setAccountTab(arr => ({...arr, show: true, guest: 'register'}))
                        }
                    }}>
                        Register
                    </button>
                </>
            )}
        </div>
    );
}

export default PageHeader;