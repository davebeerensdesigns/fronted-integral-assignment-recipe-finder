import React, {useContext} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faHeart} from "@fortawesome/pro-regular-svg-icons";
import Button from "../../buttons/button/Button";
import {AccountTabContext} from "../../../utils/providers/AccountTabContextProvider";
import './CardRegister.scss';

function CardRegister() {
    const [, setAccountTab] = useContext(AccountTabContext);
    return (
        <div className='card-register'>
            <FontAwesomeIcon className='card-register__icon' icon={faHeart}/>
            <div className='card-register__content'>
                <p>Create an account to save your favorite recipes!</p>
                <Button customClass='card-register__button' customClick={() => {
                    setAccountTab(arr => ({...arr, show: true, guest: 'register'}))
                }}>
                    Register
                </Button>
            </div>
            <span className='element1'/>
            <span className='element2'/>
            <span className='element3'/>
        </div>
    );
}

export default CardRegister;