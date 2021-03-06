import React, {useEffect, useState} from 'react';
import RecipeFilterBar from "../filter/RecipeFilterBar";
import RecipeListCurrentPage from "../pagination/RecipeListCurrentPage";
import FilterType from "../forms/select/filter-type/FilterType";
import RecipeList from "../list/RecipeList";
import RecipeListPagination from "../pagination/RecipeListPagination";
import {useLocation} from "react-router-dom";
import getQuery from "../../helpers/getQuery";
import cacheService from "../../services/cache.service";
import createPagination from "../../helpers/createPagination";
import axios from "axios";
import notifyToast from "../../utils/hooks/notifyToast";
import Loader from "../loader/Loader";
import spoonacularService from "../../services/spoonacular.service";
import {pluralize} from "../../helpers/pluralize";

function RecipeArchive({title, baseLink, apiFor, useParams}) {
    let location = useLocation();

    const query = getQuery.Params(location.search);
    const page = getQuery.PageNumber(query);
    const type = getQuery.Type(query);
    const time = getQuery.Time(query);
    const ingredients = getQuery.Ingredients(query);

    const cacheKey = cacheService.CreateKey(location, {
        page: query.get('page'),
        type: query.get('type'),
        time: query.get('maxReadyTime'),
        ingredients: query.get('includeIngredients')
    });

    const number = 12;

    const offset = createPagination.Offset(page, number);
    const nextPage = createPagination.NextPage(page);
    const previousPage = createPagination.PreviousPage(page);

    const previousParameters = [];
    previousPage > 1 && previousParameters.push('page=' + previousPage);
    type && previousParameters.push('type=' + type);
    time && previousParameters.push('maxReadyTime=' + time);
    ingredients && previousParameters.push('includeIngredients=' + ingredients);

    const nextParameters = [];
    nextPage && nextParameters.push('page=' + nextPage);
    type && nextParameters.push('type=' + type);
    time && nextParameters.push('maxReadyTime=' + time);
    ingredients && nextParameters.push('includeIngredients=' + ingredients);

    const previousLink = createPagination.PreviousPageURL(previousParameters, baseLink);
    const nextLink = createPagination.NextPageURL(nextParameters, baseLink);

    let api = '';

    switch (apiFor) {
        case 'cuisines':
            api = spoonacularService.GetCuisineAPI(useParams, type, number, offset);
            break;
        case 'latest':
            api = spoonacularService.GetLatestAPI(type, number, offset);
            break;
        case 'popular':
            api = spoonacularService.GetPopularAPI(type, number, offset);
            break;
        case 'search-pantry':
            api = spoonacularService.GetSearchPantryAPI(type, time, ingredients, number, offset);
            break;
        default:
            api = '';
            break;
    }


    const [data, setData] = useState({});
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        const fetchData = async (api) => {
            if (api !== '') {

                setLoading(true);

                let getNewData = true;

                const cachedData = cacheService.GetCachedData(cacheKey);

                if (cachedData) {
                    const parsedCacheData = JSON.parse(cachedData);
                    const timeNow = Date.now();
                    if ((timeNow - parsedCacheData.timeStamp) < (15 * 60 * 1000)) {
                        setData(parsedCacheData.response)
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
                                    number: response.data.number,
                                    offset: response.data.offset,
                                    totalResults: response.data.totalResults,
                                    recipes: response.data.results.map((recipe) => ({
                                        id: recipe.id,
                                        image: recipe.image,
                                        title: recipe.title,
                                        healthScore: recipe.healthScore,
                                        readyInMinutes: recipe.readyInMinutes,
                                        summary: recipe.summary
                                    }))
                                }
                            }
                            if (response.data.totalResults > 0) {
                                cacheService.StoreCacheData(cacheKey, data);
                            }
                            setData(data.response);
                            setLoading(false);
                        }
                    ).catch(
                        (error) => {
                            notifyToast.notifyError(error.response.data.message);
                        }
                    )
                }
            } else {
                notifyToast.notifyError('Something went wrong. API is not responding.');
            }
        };
        fetchData(api)
    }, [api, cacheKey])

    const formatIngredients = (items) => {
        const itemArray = items.split(',');
        return [itemArray.slice(0, -1).join(', '), itemArray.slice(-1)[0]].join(itemArray.length < 2 ? '' : ' and ');
    }
    return (
        <>
            {loading && (
                <Loader label='recipes'/>
            )}
            {!loading && (
                <div className='recipe-list__wrapper'>

                    {apiFor !== 'search-pantry' && (
                        <h2>{pluralize(data.totalResults, 'recipe')} {(title || type) && 'for'} {title} {type ? ' - ' + type : ''}</h2>
                    )}

                    {apiFor === 'search-pantry' && (
                        <h2>{pluralize(data.totalResults, 'recipe')} {(ingredients || time || type) && 'for'} {ingredients ? formatIngredients(ingredients) : ''} {time ? ' - ' + time + ' minutes' : ''} {type ? ' - ' + type : ''}</h2>
                    )}

                    <RecipeFilterBar>
                        <RecipeListCurrentPage offset={data.offset}
                                               number={data.number}
                                               totalResults={data.totalResults}/>

                        {apiFor !== 'search-pantry' && (<FilterType navigateOnChange={location.pathname}
                                    currentType={type}/>)}
                    </RecipeFilterBar>

                    <RecipeList recipesObject={data}
                                baseLink={baseLink}/>

                    <RecipeListPagination offset={data.offset}
                                          number={data.number}
                                          totalResults={data.totalResults}
                                          previousLink={previousLink}
                                          previousLabel='PREVIOUS'
                                          nextLink={nextLink}
                                          nextLabel='NEXT'/>
                </div>
            )}
        </>
    );
}

export default RecipeArchive;