import React, {useContext, useState} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faHeart} from "@fortawesome/pro-regular-svg-icons";
import {faHeart as faSolidHeart} from "@fortawesome/pro-solid-svg-icons";
import {UserContext} from "../../utils/providers/UserContextProvider";
import {AccountTabContext} from "../../utils/providers/AccountTabContextProvider";
import notifyToast from "../../utils/hooks/notifyToast";
import {FavoriteRecipesContext} from "../../utils/providers/FavoriteRecipesContextProvider";
import {classNames} from "../../helpers/classNames";
import './AddRecipeToFavorites.scss';

function AddRecipeToFavorites({recipeId}) {
    const [user] = useContext(UserContext);
    const [, setAccountTab] = useContext(AccountTabContext);
    const [favoriteRecipes, setFavoriteRecipes] = useContext(FavoriteRecipesContext);

    const favoritesArray = favoriteRecipes.split(',');
    const match = favoritesArray.includes(recipeId.toString());
    const active = match === true ? 'active' : '';

    const addRecipe = (e) => {
        if(user){
            e.preventDefault()
            //TODO: Create a context that holds all favorite recipe ids. these should also be stored on localstorage. then whenever a recipecard is loaded and the recipe id matches one of the favorite recipe ids it should mark the add to favorite button as active. keep in mind that these ids are also needed in the user favorites page and load an api get request for all these recipe IDs.
        } else {
            e.preventDefault()
            setAccountTab(arr => ({show: true, guest: 'register'}))
            notifyToast.notifyInfo('Create an account to save your favorite recipes.');
        }
    }

    return (
        <button onClick={addRecipe} className={classNames('btn btn-favorites', active)}>
            {match ? <FontAwesomeIcon icon={faSolidHeart}/> : <FontAwesomeIcon icon={faHeart}/>}
        </button>
    );
}

export default AddRecipeToFavorites;