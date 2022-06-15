import React from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faStar} from "@fortawesome/pro-solid-svg-icons";
import {faClock} from "@fortawesome/pro-regular-svg-icons";
import {Link, useParams} from "react-router-dom";
import './RecipeCard.scss';
import {calculateRating} from "../../../helpers/calculateRating";
import RecipeMeta from "../../meta/recipe/RecipeMeta";

function RecipeCard({id, image, title, readyInMinutes, healthScore, summary}) {
    let params = useParams();
    const strippedSummary = summary.replace(/(<([^>]+)>)/gi, "");
    const trimmedSummary = strippedSummary.length > 100 ? strippedSummary.substring(0, 100 - 3) + "..." : strippedSummary.substring(0, 100);

    return (
        <Link to={`/cuisines/${params.cuisineId}/${id}`}
              className='recipe-card'>
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
                    <h4>{title}</h4>
                    <RecipeMeta>
                        {healthScore > 0 && (
                            <span className='recipe-card__rating'>
                            <FontAwesomeIcon icon={faStar}/> {calculateRating(healthScore)} Health score
                        </span>
                        )}
                        {readyInMinutes && (
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