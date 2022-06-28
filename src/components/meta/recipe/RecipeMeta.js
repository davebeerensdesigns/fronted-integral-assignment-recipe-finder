import React from 'react';
import './RecipeMeta.scss';

function RecipeMeta({children}) {
    return (
        <div className='recipe-card__meta'>{children}</div>
    );
}

export default RecipeMeta;