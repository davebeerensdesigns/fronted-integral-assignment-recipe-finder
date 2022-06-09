import React, {createContext, useEffect, useState} from "react";

export const MainNavContext = createContext(null);

const {Provider} = MainNavContext;

const MainNavContextProvider = ({children}) => {

    let mainNavObject = localStorage.getItem('mainNav');

    let mainNavData = true;

    if(mainNavObject){
        try {
            const parsed = JSON.parse(mainNavObject);
            mainNavData = !!parsed['show'];
        } catch (e) {
            mainNavData = true
        }
    }

    const [mainNav, setMainNav] = useState({
            show: mainNavData
    });


    useEffect(() => {
        localStorage.setItem('mainNav', JSON.stringify(mainNav));
    }, [mainNav]);

    return <Provider value={[mainNav, setMainNav]}>{children}</Provider>;
};

MainNavContextProvider.context = MainNavContext;

export default MainNavContextProvider;