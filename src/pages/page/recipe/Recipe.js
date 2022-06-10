import React from 'react';
import BackButton from "../../../components/buttons/back/BackButton";
import {useParams} from "react-router-dom";
import cuisines from "../../../config/cuisines";

function Recipe() {
    let { cuisineId } = useParams();
    const cuisine = cuisines.find( ({ slug }) => slug === cuisineId );
    return (
        <>
            <BackButton path={-1} label={`${cuisine.name} cuisine`} />
            <div>Single recipe</div>
        </>
    );
}

export default Recipe;