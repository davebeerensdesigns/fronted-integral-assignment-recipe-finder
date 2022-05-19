import React, {createContext, useEffect, useState} from "react";

export const MainNavContext = createContext(null);

const { Provider } = MainNavContext;

const MainNavProvider = ({ children }) => {

    let mainNavObject = JSON.parse(localStorage.getItem('mainNav'));
    let mainNavData = (mainNavObject ? mainNavObject : {} )

    const [mainNav, setMainNav] = useState({
        show: (mainNavData['show'] ? mainNavData['show'] : true)
    });

    useEffect(() => {
        localStorage.setItem('mainNav', JSON.stringify(mainNav));
    }, [mainNav]);

    return <Provider value={[mainNav, setMainNav]}>{children}</Provider>;
};

MainNavProvider.context = MainNavContext;

export default MainNavProvider;