import React, { createContext, useState } from 'react';

export const AppContext = createContext();

const AppProvider = ({ children }) => {
    const [isShow, setisShow] = useState(false);
   
    return (
        <AppContext.Provider value={{ isShow, setisShow }}>
            {children}
        </AppContext.Provider>
    );
}

export default AppProvider;
