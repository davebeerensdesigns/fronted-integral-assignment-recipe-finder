import React from 'react';
import PageTitle from "../../../components/titles/PageTitle";
import RecipeArchive from "../../../components/archive/RecipeArchive";

function Latest() {
    const baseLink = '/latest';

    return (
        <div id='page-cuisines__recipes'>

            <PageTitle title='Latest recipes'/>

            <RecipeArchive title='latest' baseLink={baseLink} apiFor='latest' />

        </div>
    );
}

export default Latest;