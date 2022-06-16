import React from 'react';

function RecipeListCurrentPage({offset, number, totalResults}) {
    const currentPage = offset / number + 1;
    const totalPages = Math.ceil(totalResults / number);
    
    return (
        <div className='recipe-list__current-page'>
            Page {currentPage} of {totalPages}
        </div>
    );
}

export default RecipeListCurrentPage;