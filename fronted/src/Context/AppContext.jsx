import { createContext, useState } from "react";
import { useLocation } from "react-router-dom";

export const AppContext = createContext();

const AppContextProvider = ({children})=>{

    // hide and show loading spinner 
    const[showLoadingSpinner, setShowLoadingSpinner] = useState(false); 
    // disabled field on request 
    const [disabledField, setDisabledField] = useState(false);
    const location = useLocation();
    const isAdmin = location.pathname === '/register' || location.pathname === '/login' || location.pathname === '/admin-login' || location.pathname === '/admin-panel' || location.pathname === '/admin-panel/dashboard' || location.pathname === '/admin-panel/posts' || location.pathname === '/admin-panel/posts/add-post' || location.pathname === '/admin-panel/categories' || location.pathname === '/admin-panel/comments' || location.pathname === '/admin-panel/users' || location.pathname === '/admin-panel/settings' ;

    const [showCategoryModel, setShowCategoryModel] = useState(false);
    const CategoryModelHandler = ()=>{
        setShowCategoryModel(!showCategoryModel);
    }

        return (
            <AppContext.Provider value={{
                isAdmin,
                showCategoryModel,
                CategoryModelHandler,
                showLoadingSpinner,
                setShowLoadingSpinner,
                disabledField,
                setDisabledField
            }}>
                {children}
            </AppContext.Provider>
        )

}

export default AppContextProvider;