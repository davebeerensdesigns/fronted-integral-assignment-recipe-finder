import React, {useContext} from "react";
import { TestContext } from "../../providers/TestProvider";

function Dashboard(props) {

    const [context, setContext] = useContext(TestContext);

    const {testString, testInteger, testBoolean} = context;

    return (
        <>
            <div>Dashboard</div>
            <ul>
                <li>testString: {testString}</li>
                <li>testInteger: {testInteger}</li>
                <li>testBoolean: {testBoolean ? 'true': 'false'}</li>
            </ul>
        </>
    );
}

export default Dashboard;