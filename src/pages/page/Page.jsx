import React from 'react';
import '../../pages/page/Page.css';
import Dashboard from "../dashboard/Dashboard";

function Page(props) {
    return (
        <main
            id='page__wrapper'
        >
            <Dashboard/>
        </main>
    );
}

export default Page;