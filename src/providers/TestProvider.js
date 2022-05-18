import React, { createContext, useState } from "react";

export const TestContext = createContext(null);

const { Provider } = TestContext;

const TestProvider = ({ children }) => {
    const [state, setState] = useState({
        testString: 'initial string',
        testInteger: 0,
        testBoolean: false,
    });

    return <Provider value={[state, setState]}>{children}</Provider>;
};

TestProvider.context = TestContext;

export default TestProvider;