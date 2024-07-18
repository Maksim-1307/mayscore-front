import React from "react";
import { createContext, useContext, useState } from 'react';

const ClosingListContext = createContext();

const useClosingList = () => {
    return useContext(ClosingListContext);
};

const ClosingListProvider = ({ children }) => {
    const [isHidden, setIsHidden] = useState(false);

    const toggleVisibility = () => {
        setIsHidden(!isHidden);
    };

    return (
        <ClosingListContext.Provider value={{ isHidden, toggleVisibility }}>
            {children}
        </ClosingListContext.Provider>
    );
};


const ClosingList = ({ children }) => {
    const [isHidden, setIsHidden] = useState(false);

    const toggleVisibility = () => {
        console.log(isHidden);
        setIsHidden(!isHidden);
    };
 
    return (
        <ClosingListProvider>
            <div className="closing-list">
                {children}
            </div>
        </ClosingListProvider>
    );
};

const ClosingListButton = ({ children }) => {
    const { isHidden, toggleVisibility } = useClosingList();

    const rotation = () => {
        if (isHidden) return {"transform": "rotate(0deg)"};
        return { "transform": "rotate(180deg)" };
    }

    return (
        <button className="closing-list__button" style={rotation()} onClick={toggleVisibility}> 
            {children} 
        </button>
    );
};

const ClosingListBody = ({ children }) => {
    const { isHidden } = useClosingList();
    return (
        <div className="closing-list__body">
            {!isHidden && children}
        </div>
    );
};

export { ClosingList, ClosingListButton, ClosingListBody, ClosingListProvider, useClosingList };





