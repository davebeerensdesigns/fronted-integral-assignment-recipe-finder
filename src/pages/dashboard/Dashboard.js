import React, {useContext} from "react";
import { UserContext } from "../../providers/UserProvider";

function Dashboard(props) {

    const [context, setContext] = useContext(UserContext);

    const {loggedIn} = context;

    return (
        <>
            <div>Dashboard</div>
            <ul>
                <li>loggedIn: {loggedIn ? 'true': 'false'}</li>
            </ul>
        </>
    );
}

export default Dashboard;