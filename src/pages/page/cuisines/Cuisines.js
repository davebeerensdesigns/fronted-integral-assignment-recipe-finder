import React from 'react';
import cuisines from '../../../config/cuisines';
import CuisineCard from "../../../components/cards/cuisine/CuisineCard";
import './Cuisines.scss';
import PageTitle from "../../../components/titles/PageTitle";

function Cuisines() {
    const cuisineCardList = cuisines.map(
        ({name,slug}) => <CuisineCard key={slug} name={name} slug={slug} />
    );
    return (
        <div id='page-cuisines'>
            <PageTitle title='Cuisines' />
            <div className='cuisines-list__wrapper'>
                <h2>Choose a cuisine</h2>
                <div className='cuisines-list'>
                    {cuisineCardList}
                </div>
            </div>
        </div>
    );
}

export default Cuisines;