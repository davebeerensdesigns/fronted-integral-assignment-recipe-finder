import React from 'react';

function RecipeListPagination({children}) {
    return (
        <div className='recipe-list__pagination'>
            {children}
        </div>
    );
}

export default RecipeListPagination;