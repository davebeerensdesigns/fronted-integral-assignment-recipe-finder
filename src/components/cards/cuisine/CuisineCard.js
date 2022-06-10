import React from 'react';
import {Link} from "react-router-dom";
import './CuisineCard.scss';

function CuisineCard({name, slug}) {
    return (
        <Link className='cuisine-card' to={'/cuisines/'+slug}>
            <span className='letter'>{name.charAt(0)}</span>
            <span className='name'>{name}</span>
        </Link>
    );
}

export default CuisineCard;