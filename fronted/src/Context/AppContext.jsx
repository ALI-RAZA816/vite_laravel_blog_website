import { createContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { apiUrl } from "../Http/Http";

export const AppContext = createContext();

const AppContextProvider = ({children})=>{
    const [authorized, setAuthorized] = useState('');
    const [statuCode, setStatusCode] = useState(0);
    const [deletId, setDeleteId] = useState(null);
    const [loader, setLoader] = useState(true);
    const [deleteModel, setDeleteModel] = useState(false);

    const [sidebarOpen, setSidebarOpen] = useState(false);
    const toggleSidebar = () => setSidebarOpen((prev) => !prev);
    const closeSidebar = () => setSidebarOpen(false);

    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const toggleMobileMenu = () => setMobileMenuOpen((prev) => !prev);
    const closeMobileMenu = () => setMobileMenuOpen(false);

    const location = useLocation();
    const isAdmin = location.pathname === '/register' || location.pathname === '/login' || location.pathname.startsWith('/admin-panel') || location.pathname.startsWith('/admin-login');

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
        const loaderHandler = ()=>{
            setTimeout(()=>setLoader(false), 2000);
        }

        if(document.readyState === 'complete'){
            loaderHandler();
        }else{
            window.addEventListener('load',loaderHandler);
        }
        const token = localStorage.getItem('token');
        const user = JSON.parse(localStorage.getItem('UserInfo'));
        if(token && user.role !== 'user'){
            fetchCategory();
        }
        
        return () => {
            window.removeEventListener('load', loaderHandler);
        };

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
            loader,
            authorized,
            statuCode,
            setStatusCode,
            setAuthorized
        }}>
            {children}
        </AppContext.Provider>
    )

}

export default AppContextProvider;