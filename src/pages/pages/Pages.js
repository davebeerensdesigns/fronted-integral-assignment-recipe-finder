import React from 'react';
import './/Pages.scss';
import {Route, Routes} from "react-router-dom";
import routes from "../../config/routes";

function Pages() {

    const routeComponents = routes.map(({path, element}) => <Route exact path={path} element={element} key={path} />);

    return (
        <main id='page__wrapper'>
            <Routes>
                {routeComponents}
            </Routes>
        </main>
    );
}

export default Pages;