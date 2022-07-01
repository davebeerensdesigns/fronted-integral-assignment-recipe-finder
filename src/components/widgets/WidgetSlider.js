import React, {useEffect, useState} from 'react';
import cacheService from "../../services/cache.service";
import axios from "axios";
import notifyToast from "../../utils/hooks/notifyToast";
import Loader from "../loader/Loader";
import RecipeSlider from "../slider/RecipeSlider";

function WidgetSlider({slidesFor, title, api}) {


    const location = {
        pathname: slidesFor+'Slides'
    }
    const cacheKey = cacheService.CreateKey(location, {});

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

    return (
        <>
            {loading && (
                <Loader label='recipes'/>
            )}
            {!loading && (
                <div className='recipe-list__wrapper'>

                    <RecipeSlider recipesObject={data}
                                  baseLink={'/'+slidesFor} title={title} />
                </div>
            )}
        </>
    );
}

export default WidgetSlider;