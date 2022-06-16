import React, {useEffect, useState, useMemo} from 'react';
import {Link, useParams, useLocation, useNavigate} from "react-router-dom";
import cuisines from '../../../config/cuisines';
import types from '../../../config/types';
import BackButton from "../../../components/buttons/back/BackButton";
import RecipeList from "../../../components/list/RecipeList";
import axios from "axios";
import RecipeListPagination from "../../../components/pagination/RecipeListPagination";
import notifyToast from "../../../utils/hooks/notifyToast";
import getQuery from "../../../helpers/getQuery";
import cacheService from "../../../services/cache.service";
import createPagination from "../../../helpers/createPagination";
import spoonacularService from "../../../services/spoonacular.service";

function CuisinesRecipes() {

    let {cuisineId} = useParams();
    let navigate = useNavigate();
    let location = useLocation();

    const cacheKey = cacheService.CreateKey(location);

    const query = getQuery.Params(location.search);
    const page = getQuery.PageNumber(query);
    const type = getQuery.Type(query);


    const cuisine = cuisines.find(({slug}) => slug === cuisineId);

    const number = 12;

    const offset = createPagination.Offset(page, number);
    const nextPage = createPagination.NextPage(page);
    const previousPage = createPagination.PreviousPage(page);

    const API = spoonacularService.GetCuisineAPI(cuisineId, type, number, offset);

    const [data, setData] = useState({});
    const [loading, setLoading] = useState(true);

    const handleTypeSelect = (event) => {
        const target = event.target.value !== '' ? '?type=' + event.target.value : '';
        navigate(location.pathname + target)
    };

    const fetchData = async (API) => {
        let getNewData = true;
        setLoading(true)
        const cachedData = cacheService.GetCachedData(cacheKey);
        if(cachedData){
            const parsedCacheData = JSON.parse(cachedData);
            const timeNow = Date.now();
            if ((timeNow - parsedCacheData.timeStamp) < (15 * 60 * 1000)){
                setData(parsedCacheData.response)
                getNewData = false;
                setLoading(false);
            } else {
                cacheService.DeleteCachedData(cacheKey);
                getNewData = true;
            }
        }
        if(getNewData === true){
            await axios.get(API).then(
                (response) => {
                    setLoading(false);
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
                    cacheService.StoreCacheData(cacheKey, data);
                    setData(data.response);
                }
            ).catch(
                (error) => {
                    notifyToast.notifyError(error.response.data.message);
                }
            )
        }
    };

    useEffect(() => {
        fetchData(API)
    }, [API])


    return (
        <div id='page-cuisines__recipes'>
            <BackButton path={'/cuisines'}
                        label='All cuisines'/>
            <div className='page-title'>
                <h1>{cuisine.name} cuisine</h1>
            </div>
            {!loading && (<>
                    <h3>{data.totalResults} recipes for {cuisine.name} cuisine {type ? ' - ' + type : ''}</h3>
                    <div className='type-filter'>
                        <select value={type}
                                onChange={handleTypeSelect}>
                            <option value=''>all types</option>
                            {
                                types.map((type, index) => {
                                    return (<option key={index}
                                                    value={type}>{type}</option>)
                                })
                            }
                        </select>
                    </div>
                    <RecipeList recipesObject={data} />

                    <RecipeListPagination>
                        {((data.offset > 0) && (data.offset - data.number) >= 0) &&
                            <Link to={`/cuisines/${cuisineId}?page=${previousPage}${type ? '&type='+type : ''}`}>PREVIOUS</Link>
                        }
                        {((data.offset + data.number) < data.totalResults) &&
                            <Link to={`/cuisines/${cuisineId}?page=${nextPage}${type ? '&type='+type : '' }`}>NEXT</Link>
                        }
                    </RecipeListPagination>
                </>
            )}

        </div>
    );
}

export default CuisinesRecipes;