import React from 'react';
import './/Pages.css';
import Dashboard from "../dashboard/Dashboard";
import {Route, Routes} from "react-router-dom";
import About from "../about/About";

function Pages(props) {
    return (
        <main
            id='page__wrapper'
        >
            <Routes>
                <Route path="/" exact
                       element={<Dashboard />}/>
                <Route path="/about" exact
                       element={<About />}/>
            </Routes>
        </main>
    );
}

export default Pages;