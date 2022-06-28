import React from 'react';
import RecipeCard from "../cards/recipe/RecipeCard";
import './RecipeSlider.scss';
import {Splide, SplideSlide, SplideTrack} from "@splidejs/react-splide";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faAngleLeft, faAngleRight} from "@fortawesome/pro-regular-svg-icons";

function RecipeSlider({recipesObject, baseLink, title}) {
    const recipeSlider = recipesObject.recipes.map(
        ({id, image, title, healthScore, readyInMinutes, summary}) => <SplideSlide key={id}><RecipeCard
            baseLink={baseLink}
            id={id}
            image={image}
            title={title}
            readyInMinutes={readyInMinutes}
            healthScore={healthScore}
            summary={summary}/></SplideSlide>
    );
    return (
        <Splide hasTrack={false}
                aria-label="..."
                tag="section"
                options={{
                    perPage: 4,
                    perMove: 1,
                    rewind: true,
                    pagination: false,
                    gap: '1rem',
                    breakpoints: {
                        1400: {
                            perPage: 3
                        },
                        1200: {
                            perPage: 2
                        },
                        768: {
                            perPage: 1
                        }
                    }
                }}>
            <div className="recipe-slider__wrapper">
                <div className='splide__header'>
                    {title && (<h2 className='splide__title'>{title}</h2>)}
                    <div className="splide__arrows">
                        <button className="splide__arrow splide__arrow--prev btn btn-icon">
                            <FontAwesomeIcon icon={faAngleLeft}/>
                        </button>
                        <button className="splide__arrow splide__arrow--next btn btn-icon">
                            <FontAwesomeIcon icon={faAngleRight}/>
                        </button>
                    </div>
                </div>
                <SplideTrack>
                    {recipeSlider}
                </SplideTrack>
            </div>
        </Splide>
    );
}

export default RecipeSlider;