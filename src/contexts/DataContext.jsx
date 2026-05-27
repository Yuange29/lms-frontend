import { createContext } from "react";

const DataContext = createContext();

function DataProvider({ children }) {
    return <DataContext.Provider value={{}}>{children}</DataContext.Provider>;
}

export { DataContext, DataProvider };
