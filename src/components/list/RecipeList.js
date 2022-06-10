import React from 'react';
import recipes from "../../config/italianRecipes.json";
import RecipeCard from "../cards/recipe/RecipeCard";
import './RecipeList.scss';

function RecipeList({recipesFor}) {
    const recipeList = recipes.results.map(
        ({id, image, title, healthScore, readyInMinutes, summary}) => <RecipeCard key={id} id={id} image={image} title={title} readyInMinutes={readyInMinutes} healthScore={healthScore} summary={summary}/>
    );
    return (
        <div>
            <h3>{recipes.totalResults} recipes for {recipesFor}</h3>
            <div className='recipe-list'>
                {recipeList}
            </div>
        </div>
    );
}

export default RecipeList;