import React from 'react';
import {useParams} from "react-router-dom";
import cuisines from '../../../config/cuisines';
import BackButton from "../../../components/buttons/back/BackButton";
import RecipeList from "../../../components/list/RecipeList";

function CuisinesRecipes(props) {
    let { cuisineId } = useParams();
    const cuisine = cuisines.find( ({ slug }) => slug === cuisineId );

    return (
        <div id='page-cuisines__recipes'>
            <BackButton path={-1} label='All cuisines' />
            <div className='page-title'>
                <h1>{cuisine.name} cuisine</h1>
            </div>
            <RecipeList recipesFor={`${cuisine.name} cuisine`}/>
        </div>
    );
}

export default CuisinesRecipes;