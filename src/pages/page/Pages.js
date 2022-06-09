import React, {useContext} from 'react';
import './/Pages.scss';
import {Navigate, Route, Routes} from "react-router-dom";
import routes from "../../config/routes";
import {UserContext} from "../../utils/providers/UserContextProvider";
import PageHeader from "../../components/headers/PageHeader";
import Container from "../../components/container/Container";

function Pages() {

    const [userValue] = useContext(UserContext);

    const routeComponents = routes.map(
        ({path, element, isPrivate}) => <Route exact
                                               path={path}
                                               element={isPrivate && !userValue ? (<Navigate to='/'
                                                                                             replace/>) : (element)}
                                               key={path}/>
    );

    return (
        <main id='page__wrapper'>
            <PageHeader/>
            <div id='page-content'>
                <Container>
                    <Routes>
                        {routeComponents}
                    </Routes>
                </Container>
            </div>
        </main>
    );
}

export default Pages;