import React, {useEffect, useState} from 'react';
import {useParams, useLocation} from "react-router-dom";
import cuisines from '../../../config/cuisines';
import BackButton from "../../../components/buttons/back/BackButton";
import RecipeList from "../../../components/list/RecipeList";
import axios from "axios";
import RecipeListPagination from "../../../components/pagination/RecipeListPagination";
import notifyToast from "../../../utils/hooks/notifyToast";
import getQuery from "../../../helpers/getQuery";
import cacheService from "../../../services/cache.service";
import createPagination from "../../../helpers/createPagination";
import spoonacularService from "../../../services/spoonacular.service";
import RecipeListCurrentPage from "../../../components/pagination/RecipeListCurrentPage";
import FilterType from "../../../components/forms/filters/FilterType";
import PageTitle from "../../../components/titles/PageTitle";
import RecipeFilterBar from "../../../components/filter/RecipeFilterBar";
import {faSpinner, faUserPlus} from "@fortawesome/pro-regular-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import Loader from "../../../components/loader/Loader";

function CuisinesRecipes() {

    let {cuisineId} = useParams();
    let location = useLocation();

    const query = getQuery.Params(location.search);
    const page = getQuery.PageNumber(query);
    const type = getQuery.Type(query);

    const cacheKey = cacheService.CreateKey(location, {
        page: query.get('page'),
        type: query.get('type')
    });


    const cuisine = cuisines.find(({slug}) => slug === cuisineId);
    const baseLink = '/cuisines/' + cuisineId;

    const number = 12;

    const offset = createPagination.Offset(page, number);
    const nextPage = createPagination.NextPage(page);
    const previousPage = createPagination.PreviousPage(page);

    const previousParameters = [];
    previousPage > 1 && previousParameters.push('page=' + previousPage);
    type && previousParameters.push('type=' + type);

    const nextParameters = [];
    nextPage && nextParameters.push('page=' + nextPage);
    type && nextParameters.push('type=' + type);

    const previousLink = createPagination.PreviousPageURL(previousParameters, baseLink);
    const nextLink = createPagination.NextPageURL(nextParameters, baseLink);

    const API = spoonacularService.GetCuisineAPI(cuisineId, type, number, offset);

    const [data, setData] = useState({});
    const [loading, setLoading] = useState(true);

    const fetchData = async (API) => {

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
            await axios.get(API).then(
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
    };

    useEffect(() => {
        fetchData(API)
    }, [API])

    return (
        <div id='page-cuisines__recipes'>
            <BackButton path={'/cuisines'}
                        label='All cuisines'/>
            <PageTitle title={cuisine.name + ' cuisine'}/>
            {loading && (
                <Loader label='recipes' />
            )}
            {!loading && (
                <div className='recipe-list__wrapper'>

                    <h2>{data.totalResults} recipes for {cuisine.name} cuisine {type ? ' - ' + type : ''}</h2>
                    <RecipeFilterBar>
                        <RecipeListCurrentPage offset={data.offset}
                                               number={data.number}
                                               totalResults={data.totalResults}/>

                        <FilterType navigateOnChange={location.pathname}
                                    currentType={type}/>
                    </RecipeFilterBar>

                    <RecipeList recipesObject={data}/>

                    <RecipeListPagination offset={data.offset}
                                          number={data.number}
                                          totalResults={data.totalResults}
                                          previousLink={previousLink}
                                          previousLabel='PREVIOUS'
                                          nextLink={nextLink}
                                          nextLabel='NEXT'/>
                </div>
            )}

        </div>
    );
}

export default CuisinesRecipes;