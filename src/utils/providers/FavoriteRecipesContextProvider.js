import React, {createContext, useEffect, useState} from "react";
import authService from "../../services/auth.service";

export const FavoriteRecipesContext = createContext(null);

const {Provider} = FavoriteRecipesContext;

const FavoriteRecipesContextProvider = ({children}) => {

    let currentFavorites = authService.getCurrentFavorites();

    const [favoriteRecipes, setFavoriteRecipes] = useState(currentFavorites ? currentFavorites : '');

    useEffect(() => {
        setFavoriteRecipes(currentFavorites ? currentFavorites : '');
    }, [currentFavorites]);

    return <Provider value={[favoriteRecipes, setFavoriteRecipes]}>{children}</Provider>;
};

FavoriteRecipesContextProvider.context = FavoriteRecipesContext;

export default FavoriteRecipesContextProvider;