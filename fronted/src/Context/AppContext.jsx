import { createContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { apiUrl } from "../Http/Http";

export const AppContext = createContext();

const AppContextProvider = ({children})=>{

    // all users data 
    const [refresh, setRefresh] = useState(0);
    const [allUsers, setAllUsers] = useState([]);
    const [Blocked, setBlocked] = useState([]);
    const [thisWeek, setThisWeek] = useState([]);
    const [allEditors, setAllEditors] = useState([]);
    // hide and show loading spinner 
    const[showLoadingSpinner, setShowLoadingSpinner] = useState(false); 
    // disabled field on request 
    const [disabledField, setDisabledField] = useState(false);
    const location = useLocation();
    const isAdmin = location.pathname === '/register' || location.pathname === '/login' || location.pathname === '/admin-login' || location.pathname === '/admin-panel' || location.pathname === '/admin-panel/dashboard' || location.pathname === '/admin-panel/posts' || location.pathname === '/admin-panel/posts/add-post' || location.pathname === '/admin-panel/categories' || location.pathname === '/admin-panel/comments' || location.pathname === '/admin-panel/users' || location.pathname === '/admin-panel/settings' || location.pathname.startsWith('/admin-panel');

    const [showCategoryModel, setShowCategoryModel] = useState(false);
    const CategoryModelHandler = ()=>{
        setShowCategoryModel(!showCategoryModel);
    }


    // fetch all users
    const fetchUsers = async ()=>{
        try{
            const token = localStorage.getItem('token');
            const response = await fetch(`${apiUrl}/users`,{
                method:'GET',
                headers:{
                    'Content-type':'application/json',
                    'Accept':'application/json',
                    'Authorization':`Bearer ${token}`
                }
            });
            const data = await response.json();
            console.log(data);
            if(response.ok){
                if(data.status === true){
                    setAllUsers(data.users);
                    setAllEditors(data.editor);
                    setThisWeek(data.this_week);
                    setBlocked(data.blocked);
                }
            }
        }catch(error){
            console.log(error);
        }
    }


    useEffect(()=>{
        fetchUsers();
    },[refresh]);

    return (
        <AppContext.Provider value={{
            isAdmin,
            showCategoryModel,
            CategoryModelHandler,
            showLoadingSpinner,
            setShowLoadingSpinner,
            disabledField,
            setDisabledField,
            allUsers,
            allEditors,
            thisWeek,
            Blocked,
            setRefresh
        }}>
            {children}
        </AppContext.Provider>
    )

}

export default AppContextProvider;