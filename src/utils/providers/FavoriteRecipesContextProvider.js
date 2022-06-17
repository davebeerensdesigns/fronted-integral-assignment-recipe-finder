import React, {createContext, useEffect, useState} from "react";

export const FavoriteRecipesContext = createContext(null);

const {Provider} = FavoriteRecipesContext;

const FavoriteRecipesContextProvider = ({children}) => {

    let currentFavorites = localStorage.getItem('favorites');

    //TODO: favorites are added with comma on front to local storage
    //TODO: when storage gets cleared the recipes should be reloaded somehow

    const [favoriteRecipes, setFavoriteRecipes] = useState(currentFavorites ? currentFavorites : '');

    useEffect(() => {
        setFavoriteRecipes(currentFavorites ? currentFavorites : '');
    }, [currentFavorites]);

    return <Provider value={[favoriteRecipes, setFavoriteRecipes]}>{children}</Provider>;
};

FavoriteRecipesContextProvider.context = FavoriteRecipesContext;

export default FavoriteRecipesContextProvider;