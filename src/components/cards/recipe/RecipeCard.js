import React from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faStar} from "@fortawesome/pro-solid-svg-icons";
import {faClock} from "@fortawesome/pro-regular-svg-icons";
import {Link, useParams} from "react-router-dom";
import './RecipeCard.scss';
import {calculateRating} from "../../../helpers/calculateRating";
import RecipeMeta from "../../meta/recipe/RecipeMeta";
import {stripHTML} from "../../../helpers/stripHTML";
import {trimText} from "../../../helpers/trimText";

function RecipeCard({id, image, title, readyInMinutes, healthScore, summary}) {

    let params = useParams();
    const strippedSummary = stripHTML(summary);
    const trimmedSummary = trimText(strippedSummary, 100);

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
                    <h3>{title}</h3>
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