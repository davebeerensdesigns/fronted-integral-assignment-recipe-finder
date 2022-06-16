import React from 'react';
import RecipeCard from "../cards/recipe/RecipeCard";
import './RecipeList.scss';

function RecipeList({recipesObject}) {
    const recipeList = recipesObject.recipes.map(
        ({id, image, title, healthScore, readyInMinutes, summary}) => <RecipeCard key={id}
                                                                                  id={id}
                                                                                  image={image}
                                                                                  title={title}
                                                                                  readyInMinutes={readyInMinutes}
                                                                                  healthScore={healthScore}
                                                                                  summary={summary}/>
    );
    return (
        <div className='recipe-list'>
            {recipeList}
        </div>
    );
}

export default RecipeList;