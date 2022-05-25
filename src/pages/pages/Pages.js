import React, {useContext} from 'react';
import './/Pages.scss';
import {Navigate, Route, Routes} from "react-router-dom";
import routes from "../../config/routes";
import {UserContext} from "../../providers/UserProvider";
import PageHeader from "../../components/page-header/PageHeader";

function Pages() {

    const [userValue, setUserValue] = useContext(UserContext);

    const routeComponents = routes.map(
        ({path, element, isPrivate}) => <Route exact path={path} element={isPrivate && !userValue ? (<Navigate to='/' replace />) : (element)} key={path} />
    );

    return (
        <main id='page__wrapper'>
            <PageHeader />
            <Routes>
                {routeComponents}
            </Routes>
        </main>
    );
}

export default Pages;