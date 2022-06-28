import React from 'react';
import {Link} from "react-router-dom";
import  './Pagination.scss';

function RecipeListPagination({offset, number, totalResults, previousLink, previousLabel, nextLink, nextLabel}) {
    return (
        <div className='recipe-list__pagination'>
            {((offset > 0) && (offset - number) >= 0) &&
                <Link className='btn btn-sm previous' to={previousLink}>{previousLabel}</Link>
            }
            {((offset + number) < totalResults) &&
                <Link className='btn btn-sm next' to={nextLink}>{nextLabel}</Link>
            }
        </div>
    );
}

export default RecipeListPagination;