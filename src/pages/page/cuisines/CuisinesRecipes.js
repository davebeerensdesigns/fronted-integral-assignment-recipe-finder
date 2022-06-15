import React, {useEffect, useState} from 'react';
import {Link, useParams, useLocation, useNavigate} from "react-router-dom";
import cuisines from '../../../config/cuisines';
import types from '../../../config/types';
import BackButton from "../../../components/buttons/back/BackButton";
import RecipeList from "../../../components/list/RecipeList";
import axios from "axios";
import RecipeListPagination from "../../../components/pagination/RecipeListPagination";

function CuisinesRecipes(props) {

    let {cuisineId} = useParams();
    let location = useLocation();
    let navigate = useNavigate();
    function useQuery() {
        return React.useMemo(() => new URLSearchParams(location.search), [location.search]);
    }

    let query = useQuery();
    const page = query.get("page") !== null ? query.get("page") : 1;
    const cacheKey = location.pathname + location.search;

    const cuisine = cuisines.find(({slug}) => slug === cuisineId);
    const number = 12;

    const offset = (parseInt(page) * number) - number;
    const nextPage = parseInt(page) + 1;
    const previousPage = parseInt(page) - 1;

    const type = query.get('type');
    const typeFilter = type ? type : '';

    const url = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.REACT_APP_API_KEY}&cuisine=${cuisineId}&type=${typeFilter}&addRecipeInformation=true&sort=latest&number=${number}&offset=${offset}`;

    const [data, setData] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const handleTypeSelect = (event) => {
        const target = event.target.value !== '' ? '?type=' + event.target.value : '';
        navigate(location.pathname + target)
    };

    const fetchData = async (url) => {
        let getNewData = true;
        setLoading(true)
        const cachedData = sessionStorage.getItem(cacheKey);
        if(cachedData){
            const parsedCacheData = JSON.parse(cachedData);
            const timeNow = Date.now();
            if ((timeNow - parsedCacheData.timeStamp) < (15 * 60 * 1000)){
                setData(parsedCacheData.response)
                getNewData = false;
                setLoading(false);
            } else {
                sessionStorage.removeItem(cacheKey);
                getNewData = true;
            }
        }
        if(getNewData === true){
            await axios.get(url).then(
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
                    sessionStorage.setItem(cacheKey, JSON.stringify(data));
                    setData(data.response);
                }
            ).catch(
                (error) => {
                    setError(error.response.data.message);
                }
            )
        }
    };

    useEffect(() => {
        fetchData(url)
    }, [url])


    return (
        <div id='page-cuisines__recipes'>
            <BackButton path={'/cuisines'}
                        label='All cuisines'/>
            <div className='page-title'>
                <h1>{cuisine.name} cuisine</h1>
            </div>
            {error !== '' && <div className='error'>{error}</div> }
            {!loading && (<>
                    <h3>{data.totalResults} recipes for {cuisine.name} cuisine {type ? ' - ' + type : ''}</h3>
                    <div className='type-filter'>
                        <select value={typeFilter}
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