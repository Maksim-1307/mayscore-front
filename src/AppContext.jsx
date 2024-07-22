import { createContext, useContext, useState } from "react";

const AppContext = createContext();

const useAppContext= () => {
    return useContext(AppContext);
};

const AppContextProvider = ({ children }) => {
    const [showMenu, setShowMenu] = useState(false);

    const toggleMenu = () => {
        setShowMenu(!showMenu);
    };

    return (
        <AppContext.Provider value={{ showMenu, toggleMenu }}>
            {children}
        </AppContext.Provider>
    );
};

export {AppContextProvider, useAppContext}