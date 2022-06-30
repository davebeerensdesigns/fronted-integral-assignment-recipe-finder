import React, {createContext, useEffect, useState} from "react";
import cacheService from "../../services/cache.service";
import authService from "../../services/auth.service";

export const FavoriteRecipesContext = createContext(null);

const {Provider} = FavoriteRecipesContext;

const FavoriteRecipesContextProvider = ({children}) => {

    let currentFavorites = authService.getCurrentFavorites();

    const [favoriteRecipes, setFavoriteRecipes] = useState(currentFavorites ? currentFavorites : '');

    useEffect(() => {
        setFavoriteRecipes(currentFavorites ? currentFavorites : '');
        cacheService.DeleteCachedData('/favorites');
    }, [currentFavorites]);

    return <Provider value={[favoriteRecipes, setFavoriteRecipes]}>{children}</Provider>;
};

FavoriteRecipesContextProvider.context = FavoriteRecipesContext;

export default FavoriteRecipesContextProvider;