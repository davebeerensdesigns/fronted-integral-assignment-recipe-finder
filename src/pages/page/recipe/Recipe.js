import React, {useState, useEffect, useRef} from 'react';
import BackButton from "../../../components/buttons/back/BackButton";
import {useParams} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPrint, faStar} from "@fortawesome/pro-solid-svg-icons";
import {calculateRating} from "../../../helpers/calculateRating";
import {faClock} from "@fortawesome/pro-regular-svg-icons";
import RecipeMeta from "../../../components/meta/recipe/RecipeMeta";
import {calculateServingPrice} from "../../../helpers/calculateServingPrice";
import './Recipe.scss';
import Button from "../../../components/buttons/button/Button";
import spoonacularService from "../../../services/spoonacular.service";
import cacheService from "../../../services/cache.service";
import axios from "axios";
import notifyToast from "../../../utils/hooks/notifyToast";
import AddRecipeToFavorites from "../../../components/favorites/AddRecipeToFavorites";
import ReactToPrint from 'react-to-print';
import {pluralize} from "../../../helpers/pluralize";
import Loader from "../../../components/loader/Loader";
import {calculateIngredientsMetrics} from "../../../helpers/calculateIngredientsMetrics";

function Recipe() {
    let {recipeId} = useParams();

    const location = {
        pathname: 'recipe='+recipeId
    }
    const cacheKey = cacheService.CreateKey(location, {});

    const api = spoonacularService.GetRecipeAPI(recipeId);
    const [data, setData] = useState({});
    const [loading, setLoading] = useState(true);
    const [recipeMetrics, setRecipeMetrics] = useState(true);
    const [recipeServings, setRecipeServings] = useState();
    const [printing, setPrinting] = useState(false);


    useEffect(() => {
        const fetchData = async () => {

            setLoading(true);

            let getNewData = true;

            const cachedData = cacheService.GetCachedData(cacheKey);

            if (cachedData) {
                const parsedCacheData = JSON.parse(cachedData);
                const timeNow = Date.now();
                if ((timeNow - parsedCacheData.timeStamp) < (15 * 60 * 1000)) {
                    setData(parsedCacheData.response)
                    setRecipeServings(parsedCacheData.response.servings)
                    getNewData = false;
                    setLoading(false);
                } else {
                    cacheService.DeleteCachedData(cacheKey);
                    getNewData = true;
                }
            }


            if (getNewData === true) {
                await axios.get(api).then(
                    (response) => {
                        const data = {
                            timeStamp: Date.now().toString(),
                            response: {
                                id: response.data.id,
                                sourceUrl: response.data.sourceUrl,
                                image: response.data.image,
                                title: response.data.title,
                                healthScore: response.data.healthScore,
                                readyInMinutes: response.data.readyInMinutes,
                                summary: response.data.summary,
                                servings: response.data.servings,
                                pricePerServing: response.data.pricePerServing,
                                dishTypes: response.data.dishTypes,
                                cuisines: response.data.cuisines,
                                diets: response.data.diets,
                                winePairingText: response.data.winePairing.pairingText,
                                extendedIngredients: response.data.extendedIngredients,
                                analyzedInstructions: response.data.analyzedInstructions
                            }
                        }
                        if (response.status === 200) {
                            cacheService.StoreCacheData(cacheKey, data);
                        }
                        setData(data.response);
                        setRecipeServings(response.data.servings)
                        setLoading(false);
                    }
                ).catch(
                    (error) => {
                        notifyToast.notifyError(error.message);
                    }
                )
            }
        };
        fetchData()
    }, [api, cacheKey])

    const componentToPrint = useRef(null);

    return (
        <>
            <div className='single-recipe__header'>
                <BackButton path={-1}
                            label='Back to recipes'/>
                {!loading && (
                    <div className='single-recipe__tools'>
                        <AddRecipeToFavorites recipeId={data.id}/>
                        <ReactToPrint
                            trigger={() => (
                                <button className='btn btn-print'>
                                    {!printing && <FontAwesomeIcon icon={faPrint}/>}
                                    {printing && <Loader hideText={true}/>}
                                </button>
                            )}
                            content={() => componentToPrint.current}
                            onPrintError={() => {
                                setPrinting(false)
                                notifyToast.notifyError('Oops! Something went wrong. The recipe could not be printed.');
                            }}
                            onBeforePrint={() => {setPrinting(true)}}
                            onAfterPrint={() => {setPrinting(false)}}
                            pageStyle='
                                @page{
                                    margin:50px !important;
                                }
                                .ingredients__servings{
                                    display:block !important;
                                }
                                .ingredients__servings > div{
                                    display: inline;
                                }
                                .single-recipe__content, .single-recipe__wine, .ingredients__wrapper, .instructions__wrapper{
                                    padding: 0 !important;
                                }
                                .single-recipe__tags li{
                                    color: var(--recipe-gray-dark) !important;
                                    padding:0 !important;
                                    margin-right:6px !important;
                                }
                                .ingredients__servings .buttons button,
                                .ingredients__metrics{
                                    display:none !important;
                                }
                                .ingredients__list li {
                                    margin:0 !important;
                                }
                                .ingredients__list li span.measure{
                                    width:100px !important;
                                }
                                .ingredients__list li span{
                                    display:inline-block !important;
                                    margin-right: 6px !important;
                                }
                            '
                        />
                    </div>
                )}
            </div>

            {!loading && (
                <div className='single-recipe__wrapper'
                     ref={(el) => (componentToPrint.current = el)}>
                    <div className='single-recipe__intro'>
                        {data.image && (
                            <figure className='single_recipe__image'>
                                <img
                                    width="556"
                                    height="370"
                                    src={data.image}
                                    alt={data.title}
                                    crossOrigin="anonymous"
                                    referrerPolicy="no-referrer"
                                />
                                <p className='single_recipe__image-source'><small>Image © <a rel="nofollow noreferrer"
                                                                                             href={data.sourceUrl}
                                                                                             target='_blank'>{new URL(data.sourceUrl).hostname.replace('www.', '')}</a></small>
                                </p>
                            </figure>
                        )}
                        <div className='single-recipe__content'>
                            {data.title && (
                                <h1>{data.title}</h1>
                            )}
                            {(data.healthScore || data.readyInMinutes || data.servings || data.pricePerServing) && (
                                <RecipeMeta>
                                    {data.healthScore > 0 && (
                                        <span className='recipe-card__rating'>
                                            <FontAwesomeIcon icon={faStar}/> {calculateRating(data.healthScore)} Health score
                                        </span>
                                    )}
                                    {data.readyInMinutes > 0 && (
                                        <span className='recipe-card__time'>
                                    <FontAwesomeIcon icon={faClock}/> {data.readyInMinutes} min.
                                </span>
                                    )}
                                    {data.servings > 0 && (
                                        <span className='recipe-card__servings'>
                                        {pluralize(data.servings, 'serving')}
                                </span>
                                    )}
                                    {data.pricePerServing > 0 && (
                                        <span className='recipe-card__price'>
                                    ${calculateServingPrice(data.pricePerServing)} per serving
                                </span>
                                    )}
                                </RecipeMeta>
                            )}
                            {data.summary && (
                                <p className='single-recipe__summary'>{data.summary.replace(/(<([^>]+)>)/gi, "")}</p>
                            )}
                            {(data.dishTypes || data.cuisines || data.diets) && (
                                <ul className='single-recipe__tags'>
                                    {data.dishTypes.map((type, index) => {
                                        return <li key={'type' + index}>{type}</li>
                                    })}
                                    {data.cuisines.map((cuisine, index) => {
                                        return <li key={'cuisine' + index}>{cuisine}</li>
                                    })}
                                    {data.diets.map((diet, index) => {
                                        return <li key={'diet' + index}>{diet}</li>
                                    })}
                                </ul>
                            )}
                            {data.winePairingText && (
                                <div className='single-recipe__wine'>
                                    <p className='single-recipe__wine'>{data.winePairingText}</p>
                                </div>
                            )}
                            {data.sourceUrl && (
                                <p className='single-recipe__source'><small>Original
                                    source: <a rel="nofollow noreferrer"
                                               href={data.sourceUrl}
                                               target='_blank'>{data.sourceUrl}</a></small>
                                </p>
                            )}
                        </div>
                    </div>
                    <div className='single-recipe__widgets'>
                        {data.extendedIngredients.length > 0 && (
                            <div className='single-recipe__ingredients'>
                                <h3>Ingredients</h3>
                                <div className='ingredients__wrapper'>
                                    <div className='ingredients__meta'>
                                        <div className='ingredients__metrics'>
                                            <div className='btn-switch'
                                                 onClick={() => {
                                                     setRecipeMetrics(!recipeMetrics)
                                                 }}>
                                                <span className={recipeMetrics ? 'active' : ''}>US</span>
                                                <span className={!recipeMetrics ? 'active' : ''}>Metric</span>
                                            </div>
                                        </div>
                                        {data.servings && (
                                            <div className='ingredients__servings'>
                                                <div className='servings'>Servings:</div>
                                                <div className='buttons'>
                                                    <Button size='btn-sm'
                                                            customClick={() => {
                                                                if (recipeServings > 1) {
                                                                    setRecipeServings(recipeServings - 1)
                                                                }
                                                            }}>-</Button>
                                                    <span>{recipeServings}</span>
                                                    <Button size='btn-sm'
                                                            customClick={() => {
                                                                setRecipeServings(recipeServings + 1)
                                                            }}>+
                                                    </Button>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                    <ul className='ingredients__list'>
                                        {data.extendedIngredients.map((ingredient, index) => {
                                            return <li key={'ingredient' + ingredient.id + index}>
                                            <span className='measure'>
                                                {
                                                    (recipeMetrics && ingredient.measures.us.amount && data.servings) && calculateIngredientsMetrics(recipeServings, ingredient.measures.us.amount, data.servings, ingredient.measures.us.unitShort)
                                                }
                                                {
                                                    (!recipeMetrics && ingredient.measures.metric.amount && data.servings) && calculateIngredientsMetrics(recipeServings, ingredient.measures.metric.amount, data.servings, ingredient.measures.metric.unitShort)
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
                        {data.analyzedInstructions.length > 0 && (
                            <div className='single-recipe__instructions'>
                                <h3>Instructions</h3>
                                <div className='instructions__wrapper'>
                                    {data.analyzedInstructions.map((instruction, index) => {
                                        return (
                                            <div key={'instructions' + index}
                                                 className='instructions__group'>
                                                {instruction.name && <h4>{instruction.name}</h4>}
                                                {instruction.steps && (
                                                    <ul>
                                                        {instruction.steps.map((step, index) => {
                                                            return (
                                                                <li key={'steps' + index}
                                                                    className='instructions__step'>
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
                </div>
            )}
        </>
    );
}

export default Recipe;