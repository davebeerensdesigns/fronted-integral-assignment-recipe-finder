import React from 'react';
import PageTitle from "../../../components/titles/PageTitle";
import PantryFilterBar from "../../../components/forms/form/pantry-search/PantryFilterBar";

function SearchPantry() {

    return (
            <div id='page-pantry__recipes'>

                <PageTitle title='Search Pantry'/>
                <p>You can include ingredients to find the recipes you are looking for. You can also select a dish type and
                    time limit to further specify the results.</p>
                <PantryFilterBar />
            </div>
    );
}

export default SearchPantry;