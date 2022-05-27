import React, {useContext} from 'react';
import './/Pages.scss';
import {Navigate, Route, Routes} from "react-router-dom";
import routes from "../../config/routes";
import {UserContext} from "../../providers/UserProvider";
import PageHeader from "../../components/page-header/PageHeader";
import {MainNavContext} from "../../providers/MainNavProvider";

function Pages() {

    const [mainNav, setMainNav] = useContext(MainNavContext);
    const [userValue, setUserValue] = useContext(UserContext);

    const routeComponents = routes.map(
        ({path, element, isPrivate}) => <Route exact path={path} element={isPrivate && !userValue ? (<Navigate to='/' replace />) : (element)} key={path} />
    );

    return (
        <main id='page__wrapper' className={(mainNav['show']) ? 'main-show' : 'main-hidden'}>
            <PageHeader />
            <div id='page-content'>
                <Routes>
                    {routeComponents}
                </Routes>
            </div>
        </main>
    );
}

export default Pages;