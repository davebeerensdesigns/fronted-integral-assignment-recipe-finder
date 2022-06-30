import React, {createContext, useEffect, useState} from "react";

export const PantryFilterContext = createContext(null);

const {Provider} = PantryFilterContext;

const PantryFilterContextProvider = ({children}) => {

    const [pantryFilter, setPantryFilter] = useState({
        time:'',
        type:'',
        ingredients:[]
    });

    return <Provider value={[pantryFilter, setPantryFilter]}>{children}</Provider>;
};

PantryFilterContextProvider.context = PantryFilterContext;

export default PantryFilterContextProvider;