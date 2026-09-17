import { createContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { apiUrl } from "../Http/Http";

export const AppContext = createContext();

const AppContextProvider = ({children})=>{

    const [deleteModel, setDeleteModel] = useState(false);
    const [deletId, setDeleteId] = useState(null);

    const [sidebarOpen, setSidebarOpen] = useState(false);
    const toggleSidebar = () => setSidebarOpen((prev) => !prev);
    const closeSidebar = () => setSidebarOpen(false);

    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const toggleMobileMenu = () => setMobileMenuOpen((prev) => !prev);
    const closeMobileMenu = () => setMobileMenuOpen(false);

    const location = useLocation();
    const isAdmin = location.pathname === '/register' || location.pathname === '/login' || location.pathname === '/admin-login' || location.pathname === '/admin-panel' || location.pathname === '/admin-panel/dashboard' || location.pathname === '/admin-panel/posts' || location.pathname === '/admin-panel/posts/add-post' || location.pathname === '/admin-panel/categories' || location.pathname === '/admin-panel/comments' || location.pathname === '/admin-panel/users' || location.pathname === '/admin-panel/settings' || location.pathname.startsWith('/admin-panel');

    const DeleteModelHandler = (deleteId)=>{
        setDeleteModel(!deleteModel);
        setDeleteId(deleteId);
    }

    const [refresh, setRefresh] = useState(0);

    const [allCat, setAllCat] = useState([]);

    const fetchCategory = async ()=>{
        try{
            const token = localStorage.getItem('token');
            const response = await fetch(`${apiUrl}/categories?page=1`,{
                method:'GET',
                headers:{
                    'Content-type':'application/json',
                    'Accept':'application/json',
                    'Authorization':`Bearer ${token}`
                }
            });
            const data = await response.json();
            if(response.ok){
                setAllCat(data.allCat);
            }
        }catch(error){
            console.log(error);
        }
    }

    useEffect(()=>{
        fetchCategory();
    },[refresh]);

    return (
        <AppContext.Provider value={{
            isAdmin,
            sidebarOpen,
            toggleSidebar,
            closeSidebar,
            mobileMenuOpen,
            toggleMobileMenu,
            closeMobileMenu,
            deleteModel,
            setDeleteModel,
            deletId,
            DeleteModelHandler,
            refresh,
            setRefresh,
            allCat,
        }}>
            {children}
        </AppContext.Provider>
    )

}

export default AppContextProvider;