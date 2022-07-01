import React, {useContext} from 'react';
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
import Button from "../buttons/button/Button";
import cacheService from "../../services/cache.service";
import authService from "../../services/auth.service";

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
                for( let i = 0; i < currentFavorites.length; i++){

                    if ( currentFavorites[i] === recipeId.toString()) {

                        currentFavorites.splice(i, 1);
                    }

                }
                const data = {
                    'info': currentFavorites.toString()
                }
                await userService.updateUserDetails(JSON.stringify(data)).then(
                    (response) => {
                        authService.setCurrentFavorites(response.data.info);
                        setFavoriteRecipes(response.data.info);
                        cacheService.DeleteCachedData('/favorites');
                        window.location.reload()
                    }
                ).catch(
                    () => {
                        notifyToast.notifyError('Oops! Could not remove the recipe from your favorites.')
                    }
                )
            } else {
                const data = {
                    'info': favoriteRecipes ? favoriteRecipes+','+recipeId : recipeId
                }
                await userService.updateUserDetails(JSON.stringify(data)).then(
                    (response) => {
                        authService.setCurrentFavorites(response.data.info);
                        setFavoriteRecipes(response.data.info);
                        cacheService.DeleteCachedData('/favorites');
                        window.location.reload()
                    }
                ).catch(
                    () => {
                        notifyToast.notifyError('Oops! Could not add the recipe to your favorites.')
                    }
                )
            }
        } else {
            e.preventDefault()
            setAccountTab({show: true, guest: 'register'})
            notifyToast.notifyInfo('Create an account to save your favorite recipes.');
        }
    }

    return (
        <Button customClick={addRecipe} customClass={classNames('btn-favorites', active)}>
            {match ? <FontAwesomeIcon icon={faSolidHeart}/> : <FontAwesomeIcon icon={faHeart}/>}
        </Button>
    );
}

export default AddRecipeToFavorites;