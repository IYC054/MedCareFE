import React, { createContext, useEffect, useState } from 'react';

export const AppContext = createContext();

const AppProvider = ({ children }) => {
    const [isShow, setisShow] = useState(true);
    const [content, setContent] = useState();
    console.log(isShow, content);

    useEffect(() => {
        if (isShow) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "scroll";
        }
    }, [isShow]);

    return (
        <AppContext.Provider value={{ setisShow, setContent, content }}>
            {children}
            {isShow && (
                <div className="fixed inset-0 z-[100000]">
                    <div
                        className="absolute inset-0 flex items-center justify-center  bg-slate-600/60"
                        onClick={() => setisShow(false)}
                    >
                        <div className="z-[100002]" onClick={(e) => e.stopPropagation()}>
                            {content}
                        </div>
                    </div>
                </div>
            )}
        </AppContext.Provider>
    );
}

export default AppProvider;
