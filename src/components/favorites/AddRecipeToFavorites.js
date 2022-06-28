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
import userService from "../../services/user.service";

function AddRecipeToFavorites({recipeId}) {
    const [user] = useContext(UserContext);
    const [, setAccountTab] = useContext(AccountTabContext);
    const [favoriteRecipes, setFavoriteRecipes] = useContext(FavoriteRecipesContext);

    const favoritesArray = favoriteRecipes.split(',');
    const match = favoritesArray.includes(recipeId.toString());
    const active = match ? 'active' : '';

    const addRecipe = async (e) => {
        if(user){
            e.preventDefault()
            if(match){
                const currentFavorites = favoritesArray;
                for( var i = 0; i < currentFavorites.length; i++){

                    if ( currentFavorites[i] === recipeId.toString()) {

                        currentFavorites.splice(i, 1);
                    }

                }
                const data = {
                    'info': currentFavorites.toString()
                }
                await userService.updateUserDetails(JSON.stringify(data)).then(
                    (response) => {
                        localStorage.setItem('favorites', response.data.info);
                        setFavoriteRecipes(response.data.info);
                    }
                ).catch(
                    (error) => {
                        notifyToast.notifyError('Oops! Could not remove the recipe from your favorites.')
                    }
                )
            } else {
                const data = {
                    'info': favoriteRecipes+','+recipeId
                }
                await userService.updateUserDetails(JSON.stringify(data)).then(
                    (response) => {
                        localStorage.setItem('favorites', response.data.info);
                        setFavoriteRecipes(response.data.info);
                    }
                ).catch(
                    (error) => {
                        notifyToast.notifyError('Oops! Could not add the recipe to your favorites.')
                    }
                )
            }
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