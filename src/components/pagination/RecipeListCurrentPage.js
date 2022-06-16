import React from 'react';

function RecipeListCurrentPage({offset, number, totalResults}) {
    const currentPage = offset / number + 1;
    const totalPages = totalResults > 0 ? Math.ceil(totalResults / number) : 1;
    
    return (
        <div className='recipe-list__current-page'>
            Page {currentPage} of {totalPages}
        </div>
    );
}

export default RecipeListCurrentPage;