import './RecipeFilterBar.scss';

function RecipeFilterBar({children}) {

    return (
        <div className='recipe-list__filter-bar'>
            {children}
        </div>
    );
}

export default RecipeFilterBar;