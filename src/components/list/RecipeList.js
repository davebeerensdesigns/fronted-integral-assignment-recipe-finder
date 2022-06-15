import React from 'react';
import RecipeCard from "../cards/recipe/RecipeCard";
import './RecipeList.scss';

function RecipeList({recipesObject, recipesFor}) {
    const recipeList = recipesObject.recipes.map(
        ({id, image, title, healthScore, readyInMinutes, summary}) => <RecipeCard key={id} id={id} image={image} title={title} readyInMinutes={readyInMinutes} healthScore={healthScore} summary={summary} />
    );
    return (
        <div className='recipe-list-wrapper'>
            <div className='recipe-page-info'>
                Page {recipesObject.offset / recipesObject.number + 1} of {Math.ceil(recipesObject.totalResults / recipesObject.number)}
            </div>
            <div className='recipe-list'>
                {recipeList}
            </div>
        </div>
    );
}

export default RecipeList;