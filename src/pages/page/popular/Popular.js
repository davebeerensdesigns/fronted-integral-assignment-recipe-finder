import React from 'react';
import PageTitle from "../../../components/titles/PageTitle";
import RecipeArchive from "../../../components/archive/RecipeArchive";

function Popular() {
    const baseLink = '/popular';

    return (
        <div id='page-popular__recipes'>

            <PageTitle title='Popular recipes'/>

            <RecipeArchive title='popular' baseLink={baseLink} apiFor='popular' />

        </div>
    );
}

export default Popular;