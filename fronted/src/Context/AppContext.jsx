import { createContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { apiUrl } from "../Http/Http";

export const AppContext = createContext();

const AppContextProvider = ({children})=>{

    // all users data 
    const [deleteModel, setDeleteModel] = useState(false);
    const [deletId, setDeleteId] = useState(null);
    const [totalUsers, setTotalUsers] = useState(0);
    const [totalPosts, setTotalPosts] = useState(0);
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

    const [currentPage, setCurrentPage] = useState(1);
    const [pagination, setPagination] = useState({
        currentPage:'',
        from:'',
        lastPage:'',
        to:'',
        total:'',
        perPage:''
    });
    const [currentPostPage, setCurrentPostPage] = useState(1);
    const [postPagination, setPostPagination] = useState({
        currentPage:'',
        from:'',
        lastPage:'',
        to:'',
        total:'',
        perPage:''
    });
    const [currentCatPage, setCurrentCatPage] = useState(1);
    const [catPagination, setCatPagination] = useState({
        currentPage:'',
        from:'',
        lastPage:'',
        to:'',
        total:'',
        perPage:''
    });
    
    // fetch all users
    const fetchUsers = async ()=>{
        try{
            const token = localStorage.getItem('token');
            const response = await fetch(`${apiUrl}/users?page=${currentPage}`,{
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
                    setTotalUsers(data.total);
                    setAllUsers(data.users.data);
                    setAllEditors(data.editor);
                    setThisWeek(data.this_week);
                    setBlocked(data.blocked);
                    setPagination({
                        currentPage:data.users.current_page,
                        from:data.users.from,
                        lastPage:data.users.last_page,
                        to:data.users.to,
                        total:data.users.total,
                        perPage:data.users.per_page
                    });
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
            const response = await fetch(`${apiUrl}/categories?page=${currentCatPage}`,{
                method:'GET',
                headers:{
                    'Content-type':'application/json',
                    'Accept':'application/json',
                    'Authorization':`Bearer ${token}`
                }
            });
            const data = await response.json();
            if(response.ok){
                setCategories(data.category.data);
                setCatPagination({
                    currentPage:data.category.current_page,
                    from:data.category.from,
                    lastPage:data.category.last_page,
                    to:data.category.to,
                    total:data.category.total,
                    perPage:data.category.per_page
                });
                
            }
        }catch(error){
            console.log(error);
        }
    }
    // fetch posts
    const fetchPosts = async ()=>{
        try{
            const token = localStorage.getItem('token');
            const response = await fetch(`${apiUrl}/posts?page=${currentPostPage}`,{
                method:'GET',
                headers:{
                    'Content-type':'application/json',
                    'Accept':'application/json',
                    'Authorization':`Bearer ${token}`
                }
            });
            const data = await response.json();
            if(response.ok){
                setTotalPosts(data.total);
                setVelocity(data.velocity);
                setPosts(data.posts.data);
                setPostPagination({
                    currentPage:data.posts.current_page,
                    from:data.posts.from,
                    lastPage:data.posts.last_page,
                    to:data.posts.to,
                    total:data.posts.total,
                    perPage:data.posts.per_page
                });
                
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
    },[refresh, currentPage, currentPostPage, currentCatPage]);

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
            totalUsers,
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
            pagination,
            setCurrentPage,
            currentPage,
            currentPostPage,
            setCurrentPostPage,
            currentCatPage,
            setCurrentCatPage,
            postPagination,
            setPostPagination,
            catPagination,
            setCatPagination,
            totalPosts,
            setShowEditCategoryModel
        }}>
            {children}
        </AppContext.Provider>
    )

}

export default AppContextProvider;