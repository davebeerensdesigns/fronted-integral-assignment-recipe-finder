import React from 'react';
import './/Pages.scss';
import Dashboard from "../dashboard/Dashboard";
import {Route, Routes} from "react-router-dom";
import About from "../about/About";
import SearchPantry from "../search-pantry/SearchPantry";
import Cuisines from "../cuisines/Cuisines";
import Popular from "../popular/Popular";
import Latest from "../latest/Latest";

function Pages(props) {
    return (
        <main
            id='page__wrapper'
        >
            <Routes>
                <Route path="/" exact
                       element={<Dashboard />}/>
                <Route path="/search-pantry" exact
                       element={<SearchPantry />}/>
                <Route path="/cuisines" exact
                       element={<Cuisines />}/>
                <Route path="/popular" exact
                       element={<Popular />}/>
                <Route path="/latest" exact
                       element={<Latest />}/>
                <Route path="/about" exact
                       element={<About />}/>
            </Routes>
        </main>
    );
}

export default Pages;