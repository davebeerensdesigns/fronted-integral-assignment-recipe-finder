import React, {useContext} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faStar} from "@fortawesome/pro-solid-svg-icons";
import {faClock} from "@fortawesome/pro-regular-svg-icons";
import {Link} from "react-router-dom";
import './RecipeCard.scss';
import {calculateRating} from "../../../helpers/calculateRating";
import RecipeMeta from "../../meta/recipe/RecipeMeta";
import {stripHTML} from "../../../helpers/stripHTML";
import {trimText} from "../../../helpers/trimText";
import AddRecipeToFavorites from "../../favorites/AddRecipeToFavorites";
import {UserContext} from "../../../utils/providers/UserContextProvider";
import {classNames} from "../../../helpers/classNames";

function RecipeCard({baseLink, id, image, title, readyInMinutes, healthScore, summary}) {

    const [user] = useContext(UserContext);

    const strippedSummary = stripHTML(summary);
    const trimmedSummary = trimText(strippedSummary, 100);
    return (
        <Link to={`${baseLink}/recipe/${id}`}
              className={classNames('recipe-card', user && 'logged-in')}>
            <AddRecipeToFavorites recipeId={id} />
            {image && (
                <figure className='recipe-card__image'>
                    <img width="312"
                         height="231"
                         src={image}
                         alt={title}
                         crossOrigin="anonymous"
                         referrerPolicy="no-referrer"/>
                </figure>
            )}
            {title && (
                <div className='recipe-card__content'>
                    <h3>{title}</h3>
                    <RecipeMeta>
                        {healthScore > 0 && (
                            <span className='recipe-card__rating'>
                            <FontAwesomeIcon icon={faStar}/> {calculateRating(healthScore)} Health score
                        </span>
                        )}
                        {readyInMinutes > 0 && (
                            <span className='recipe-card__time'>
                            <FontAwesomeIcon icon={faClock}/> {readyInMinutes} min.
                        </span>
                        )}
                    </RecipeMeta>
                    {trimmedSummary && (
                        <p>{trimmedSummary}</p>
                    )}
                </div>
            )}
        </Link>
    );
}

export default RecipeCard;