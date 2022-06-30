import React, {useEffect, useState, useContext} from 'react';
import RecipeFilterBar from "../filter/RecipeFilterBar";
import RecipeListCurrentPage from "../pagination/RecipeListCurrentPage";
import RecipeList from "../list/RecipeList";
import RecipeListPagination from "../pagination/RecipeListPagination";
import {useLocation} from "react-router-dom";
import getQuery from "../../helpers/getQuery";
import createPagination from "../../helpers/createPagination";
import axios from "axios";
import notifyToast from "../../utils/hooks/notifyToast";
import Loader from "../loader/Loader";
import spoonacularService from "../../services/spoonacular.service";
import userService from "../../services/user.service";
import {FavoriteRecipesContext} from "../../utils/providers/FavoriteRecipesContextProvider";
import Button from "../buttons/button/Button";
import {faTrash} from "@fortawesome/pro-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import Modal from "../modal/Modal";
import cacheService from "../../services/cache.service";
import {pluralize} from "../../helpers/pluralize";

function RecipeFavoritesArchive({title, baseLink}) {
    let location = useLocation();

    const [data, setData] = useState({});
    const [loading, setLoading] = useState(true);
    const [noRecipes, setNoRecipes] = useState(false);

    const [removeAllWindow, setRemoveAllWindow] = useState(false)

    const [favoriteRecipes, setFavoriteRecipes] = useContext(FavoriteRecipesContext);

    const query = getQuery.Params(location.search);
    const page = getQuery.PageNumber(query);

    const cacheKey = cacheService.CreateKey(location, {
        page: query.get('page')
    });

    const number = 12;

    const offset = createPagination.Offset(page, number);
    const nextPage = createPagination.NextPage(page);
    const previousPage = createPagination.PreviousPage(page);

    const previousParameters = [];
    previousPage > 1 && previousParameters.push('page=' + previousPage);

    const nextParameters = [];
    nextPage && nextParameters.push('page=' + nextPage);

    const previousLink = createPagination.PreviousPageURL(previousParameters, baseLink);
    const nextLink = createPagination.NextPageURL(nextParameters, baseLink);

    let idsToArray = favoriteRecipes !== '' ? favoriteRecipes.split(',') : favoriteRecipes;
    let slicedIds = idsToArray.slice(offset, (number * page))
    let api = spoonacularService.GetFavoritesAPI(slicedIds.toString());

    const removeAllRecipes = () => {
        setRemoveAllWindow(true)
    }

    const reallyRemoveAllRecipes = async () => {
        const data = {
            'info': ''
        }
        await userService.updateUserDetails(JSON.stringify(data)).then(
            () => {
                localStorage.removeItem('favorites');
                notifyToast.notifyInfo('All your favorite recipes are removed.')
                setFavoriteRecipes('');
                setRemoveAllWindow(false)
            }
        ).catch(
            () => {
                notifyToast.notifyError('Oops! Could not remove the recipe from your favorites.')
                setRemoveAllWindow(false)
            }
        )
    }

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
                                    number: number,
                                    offset: offset,
                                    totalResults: idsToArray.length,
                                    recipes: response.data.map((recipe) => ({
                                        id: recipe.id,
                                        image: recipe.image,
                                        title: recipe.title,
                                        healthScore: recipe.healthScore,
                                        readyInMinutes: recipe.readyInMinutes,
                                        summary: recipe.summary
                                    }))
                                }
                            }
                            if (response.data.length > 0) {
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
        if (favoriteRecipes !== '') {
            fetchData(api)
        } else {
            setLoading(false)
            setNoRecipes(true)

            cacheService.DeleteCachedData(cacheKey);
        }
    }, [api, favoriteRecipes])

    return (
        <>
            {loading && (
                <Loader label='recipes'/>
            )}
            {!loading && noRecipes && (
                <div className='no-favorites'>
                    You have no favorite recipes
                </div>
            )}
            {!loading && !noRecipes && (
                <div className='recipe-list__wrapper'>
                    <h2>{pluralize(data.totalResults, 'recipe')} for {title}</h2>

                    <RecipeFilterBar>
                        <RecipeListCurrentPage offset={data.offset}
                                               number={data.number}
                                               totalResults={data.totalResults}/>
                        <Button customClass='btn-danger'
                                type='button'
                                size='btn-sm'
                                customClick={removeAllRecipes}>
                            <FontAwesomeIcon icon={faTrash}/> Remove all
                        </Button>
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
            {removeAllWindow && (
                <Modal>
                    <p>Are you sure you want to remove all your favorite recipes?</p>
                    <div className='button-group'>
                        <Button customClass='btn-danger'
                                size='btn-sm'
                                type='button'
                                customClick={reallyRemoveAllRecipes}>yes</Button>
                        <Button customClass='btn-success'
                                size='btn-sm'
                                type='button'
                                customClick={() => {
                                    setRemoveAllWindow(false)
                                }}>no</Button>
                    </div>
                </Modal>
            )}
        </>
    );
}

export default RecipeFavoritesArchive;