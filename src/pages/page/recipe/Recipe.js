import React from 'react';
import BackButton from "../../../components/buttons/back/BackButton";
import {useParams} from "react-router-dom";
import cuisines from "../../../config/cuisines";
import demoRecipe from "../../../config/demoRecipe.json";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faStar} from "@fortawesome/pro-solid-svg-icons";
import {calculateRating} from "../../../helpers/calculateRating";
import {faClock} from "@fortawesome/pro-regular-svg-icons";
import RecipeMeta from "../../../components/meta/recipe/RecipeMeta";
import {calculateServingPrice} from "../../../helpers/calculateServingPrice";
import './Recipe.scss';

function Recipe() {
    let { cuisineId } = useParams();
    const cuisine = cuisines.find( ({ slug }) => slug === cuisineId );
    return (
        <>
            <BackButton path={-1} label={`${cuisine.name} cuisine`} />
            <div className='single-recipe__wrapper'>
                <img className='single_recipe__image'
                     width="556"
                     height="370"
                     src={demoRecipe.image}
                     alt={demoRecipe.title}
                     crossOrigin="anonymous"
                     referrerPolicy="no-referrer"
                />
                <div className='single-recipe__content'>
                    <h1>{demoRecipe.title}</h1>
                    <RecipeMeta>
                            <span className='recipe-card__rating'>
                                <FontAwesomeIcon icon={faStar}/> {calculateRating(demoRecipe.healthScore)} Health score
                            </span>
                        <span className='recipe-card__time'>
                                <FontAwesomeIcon icon={faClock}/> {demoRecipe.readyInMinutes} min.
                            </span>
                        <span className='recipe-card__servings'>
                                {demoRecipe.servings} servings
                            </span>
                        <span className='recipe-card__price'>
                                ${calculateServingPrice(demoRecipe.pricePerServing)} per serving
                            </span>
                    </RecipeMeta>
                </div>
            </div>
        </>
    );
}

export default Recipe;