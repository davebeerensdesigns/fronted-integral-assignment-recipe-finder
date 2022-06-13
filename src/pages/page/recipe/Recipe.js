import React, {useState} from 'react';
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
    let domain = (new URL(demoRecipe.sourceUrl));

    const [recipeMetrics, setRecipeMetrics] = useState(true);
    const [recipeServings, setRecipeServings] = useState(demoRecipe.servings);
    console.log(demoRecipe)
    return (
        <>
            <BackButton path={-1} label={`${cuisine.name} cuisine`} />
            <div className='single-recipe__intro'>
                <figure className='single_recipe__image'>
                    <img className='single_recipe__image'
                         width="556"
                         height="370"
                         src={demoRecipe.image}
                         alt={demoRecipe.title}
                         crossOrigin="anonymous"
                         referrerPolicy="no-referrer"
                    />
                    <p className='single_recipe__image-source'>Image © <a href={demoRecipe.sourceUrl} target='_blank'>{domain.hostname.replace('www.','')}</a></p>
                </figure>
                <div className='single-recipe__content'>
                    {demoRecipe.title && (
                        <h1>{demoRecipe.title}</h1>
                    )}
                    {(demoRecipe.healthScore || demoRecipe.readyInMinutes || demoRecipe.servings || demoRecipe.pricePerServing) && (
                        <RecipeMeta>
                            {demoRecipe.healthScore && (
                                <span className='recipe-card__rating'>
                                <FontAwesomeIcon icon={faStar}/> {calculateRating(demoRecipe.healthScore)} Health score
                            </span>
                            )}
                            {demoRecipe.readyInMinutes && (
                                <span className='recipe-card__time'>
                                <FontAwesomeIcon icon={faClock}/> {demoRecipe.readyInMinutes} min.
                            </span>
                            )}
                            {demoRecipe.servings && (
                                <span className='recipe-card__servings'>
                                {demoRecipe.servings} servings
                            </span>
                            )}
                            {demoRecipe.pricePerServing && (
                                <span className='recipe-card__price'>
                                ${calculateServingPrice(demoRecipe.pricePerServing)} per serving
                            </span>
                            )}
                        </RecipeMeta>
                    )}
                    {demoRecipe.summary && (
                        <p className='single-recipe__summary'>{demoRecipe.summary.replace(/(<([^>]+)>)/gi, "")}</p>
                    )}
                    {(demoRecipe.dishTypes || demoRecipe.cuisines || demoRecipe.diets) && (
                        <ul className='single-recipe__tags'>
                            {demoRecipe.dishTypes.map((type, index)=>{
                                return <li key={index}>{type}</li>
                            })}
                            {demoRecipe.cuisines.map((cuisine, index)=>{
                                return <li key={index}>{cuisine}</li>
                            })}
                            {demoRecipe.diets.map((diet, index)=>{
                                return <li key={index}>{diet}</li>
                            })}
                        </ul>
                    )}
                    {demoRecipe.winePairing.pairingText && (
                        <div className='single-recipe__wine'>
                            <p className='single-recipe__wine'>{demoRecipe.winePairing.pairingText}</p>
                        </div>
                    )}
                    {demoRecipe.sourceUrl && (
                        <p className='single-recipe__source'>Original source: <a href={demoRecipe.sourceUrl} target='_blank'>{demoRecipe.sourceUrl}</a></p>
                    )}
                </div>
            </div>
            <div className='single-recipe__content'>
                {demoRecipe.extendedIngredients && (
                    <div className='single-recipe__ingredients'>
                        <h3>Ingredients</h3>
                        <div className='ingredients__wrapper'>
                            <div className='ingredients__meta'>
                                <div className='ingredients__metrics'>
                                    <button onClick={()=>{
                                        setRecipeMetrics(!recipeMetrics)
                                    }}>
                                        <span className={recipeMetrics ? 'active' : ''}>US</span>
                                        <span className={!recipeMetrics ? 'active' : ''}>metrics</span>
                                    </button>
                                </div>
                                {demoRecipe.servings && (
                                    <div className='ingredients__servings'>
                                        <p>servings: <button onClick={()=>{
                                            if(recipeServings > 1){
                                                setRecipeServings(recipeServings-1)
                                            }
                                        }}>-</button> {recipeServings} <button onClick={()=>{
                                            setRecipeServings(recipeServings+1)
                                        }}>+</button></p>
                                    </div>
                                )}
                            </div>
                            <ul>
                                {demoRecipe.extendedIngredients.map((ingredient)=>{
                                    return <li key={ingredient.id}>
                                        <span className='measure'>
                                            {
                                                (recipeMetrics && ingredient.measures.us.amount && demoRecipe.servings) && (Math.round((ingredient.measures.us.amount / demoRecipe.servings * recipeServings + Number.EPSILON) * 100) / 100) + ' ' + (ingredient.measures.us.unitShort ? ingredient.measures.us.unitShort : '')
                                            }
                                            {
                                                (!recipeMetrics && ingredient.measures.metric.amount && demoRecipe.servings) && (Math.round((ingredient.measures.metric.amount / demoRecipe.servings * recipeServings + Number.EPSILON) * 100) / 100) + ' ' + (ingredient.measures.metric.unitShort ? ingredient.measures.metric.unitShort : '')
                                            }
                                        </span>
                                        <span className='name'>
                                        {
                                            (ingredient.originalName && ingredient.name) && ingredient.originalName ? ingredient.originalName : ingredient.name
                                        }
                                    </span>
                                    </li>
                                })}
                            </ul>
                        </div>
                    </div>
                )}
                {demoRecipe.analyzedInstructions && (
                    <div className='single-recipe__instructions'>
                        <h3>Instructions</h3>
                        <div className='instructions__wrapper'>
                            {demoRecipe.analyzedInstructions.map((instruction, index)=>{
                                return (
                                    <div key={index} className='instructions__group'>
                                        {instruction.name && <h4>{instruction.name}</h4>}
                                        {instruction.steps && (
                                            <ul>
                                                {instruction.steps.map((step, index)=>{
                                                    return (
                                                        <li key={index} className='instructions__step'>
                                                            <h5>Step {step.number}</h5>
                                                            <p>{step.step}</p>
                                                        </li>
                                                    )
                                                })}
                                            </ul>
                                        )}
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}

export default Recipe;