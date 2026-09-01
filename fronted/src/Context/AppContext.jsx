import { createContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { apiUrl } from "../Http/Http";

export const AppContext = createContext();

const AppContextProvider = ({children})=>{

    // all users data 
    const [deleteModel, setDeleteModel] = useState(false);
    const [deletId, setDeleteId] = useState(null);
    const [refresh, setRefresh] = useState(0);
    const [allUsers, setAllUsers] = useState([]);
    const [velocity, setVelocity] = useState(null);
    const [categories, setCategories] = useState([]);
    const [posts, setPosts] = useState([]);
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
    const [showEditCategoryModel, setShowEditCategoryModel] = useState(false);
    const CategoryModelHandler = ()=>{
        setShowCategoryModel(!showCategoryModel);
    }
    const EditCategoryModelHandler = ()=>{
        setShowEditCategoryModel(!showEditCategoryModel);
    }

    // modelHandler 
    const DeleteModelHandler = (deleteId)=>{
        setDeleteModel(!deleteModel);
        setDeleteId(deleteId);
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

    // fetch category
    const fetchCategory = async ()=>{
        try{
            const token = localStorage.getItem('token');
            const response = await fetch(`${apiUrl}/categories`,{
                method:'GET',
                headers:{
                    'Content-type':'application/json',
                    'Accept':'application/json',
                    'Authorization':`Bearer ${token}`
                }
            });
            const data = await response.json();
            if(response.ok){
                setCategories(data.category);
                
            }
        }catch(error){
            console.log(error);
        }
    }
    // fetch posts
    const fetchPosts = async ()=>{
        try{
            const token = localStorage.getItem('token');
            const response = await fetch(`${apiUrl}/posts`,{
                method:'GET',
                headers:{
                    'Content-type':'application/json',
                    'Accept':'application/json',
                    'Authorization':`Bearer ${token}`
                }
            });
            const data = await response.json();
            if(response.ok){
                setVelocity(data.velocity);
                setPosts(data.posts);
                
            }
        }catch(error){
            console.log(error);
        }
    }


    // view category 
    const [selectedIcon, setSelectedIcon] = useState("sprout");
    const [editCategory, setEditCategory] = useState({
            id:'',
            cat_name:'',
            slug:'',
            description:'',
            icon_name:''
    });

    const formHandler = (event)=>{
        const {name, value} = event.target;
        setEditCategory((prev)=> ({
            ...prev,
            [name]:value
        }));
    }
    const viewCategory = async (cat_id)=>{
        const token = localStorage.getItem('token');
        try{
            const response = await fetch(`${apiUrl}/categories/${cat_id}`,{
                method:'GET',
                headers:{
                    'Content-type':'application/json',
                    'Accpet':'application/json',
                    'Authorization':`Bearer ${token}`,
                }
            });

            const data = await response.json();
            if(response.ok){
                setEditCategory({
                    id:data.category.id,
                    cat_name:data.category.name,
                    slug:data.category.slug,
                    description:data.category.description,
                });
                setSelectedIcon(data.category.icon);
            }
        }catch(error){
            console.log(error);
        }
    }


    useEffect(()=>{
        fetchUsers();
        fetchPosts();
        fetchCategory();
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
            setRefresh,
            deleteModel,
            setDeleteModel,
            deletId,
            setAllUsers,
            categories,
            DeleteModelHandler,
            showEditCategoryModel,
            EditCategoryModelHandler,
            viewCategory,
            editCategory,
            formHandler,
            selectedIcon,
            setSelectedIcon,
            posts,
            setPosts,
            velocity,
            setShowEditCategoryModel
        }}>
            {children}
        </AppContext.Provider>
    )

}

export default AppContextProvider;