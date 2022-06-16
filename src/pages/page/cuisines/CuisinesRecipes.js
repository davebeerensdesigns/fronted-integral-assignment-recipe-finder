import React from 'react';
import {useParams} from "react-router-dom";
import cuisines from '../../../config/cuisines';
import BackButton from "../../../components/buttons/back/BackButton";
import PageTitle from "../../../components/titles/PageTitle";
import RecipeArchive from "../../../components/archive/RecipeArchive";

function CuisinesRecipes() {

    let {cuisineId} = useParams();

    const cuisine = cuisines.find(({slug}) => slug === cuisineId);

    const baseLink = '/cuisines/' + cuisineId;

    return (
        <div id='page-cuisines__recipes'>
            <BackButton path={'/cuisines'}
                        label='All cuisines'/>

            <PageTitle title={cuisine.name + ' cuisine'}/>

            <RecipeArchive title={cuisine.name} baseLink={baseLink} apiFor='cuisines' useParams={cuisineId}/>

        </div>
    );
}

export default CuisinesRecipes;