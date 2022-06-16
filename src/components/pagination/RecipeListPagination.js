import React from 'react';
import {Link} from "react-router-dom";

function RecipeListPagination({offset, number, totalResults, previousLink, previousLabel, nextLink, nextLabel}) {
    return (
        <div className='recipe-list__pagination'>
            {((offset > 0) && (offset - number) >= 0) &&
                <Link to={previousLink}>{previousLabel}</Link>
            }
            {((offset + number) < totalResults) &&
                <Link to={nextLink}>{nextLabel}</Link>
            }
        </div>
    );
}

export default RecipeListPagination;