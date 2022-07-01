import React from 'react';
import PageTitle from "../../../components/titles/PageTitle";
import Image from '../../../assets/images/not-found-404.svg';
import './NoutFound.scss';

function NotFound() {
    return (
        <div id='page-not-found__recipes'>

            <PageTitle title='404 - Page not found'/>

            <img className='page-not-found' src={Image} alt='404 - not found' />

        </div>
    );
}

export default NotFound;