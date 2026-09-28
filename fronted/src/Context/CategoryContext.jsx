import { createContext, useContext, useEffect, useState } from "react";
import { apiGet, showToast } from "../services/apiClient.js";
import { apiSend, emptyPagination, toPagination } from "../services/apiClient.js";

export const CategoryContext = createContext();

const CategoryContextProvider = ({ children }) => {
  const [catRefresh, setCatRefresh] = useState(0);
  const [spinnerLoader, setSpinnerLoader] = useState(false);
  const triggerCatRefresh = () => setCatRefresh((prev) => prev + 1);

  // =======================
  //     LIST + PAGINATION
  // =======================
  const [categories, setCategories] = useState([]);
  const [allCat, setAllCat] = useState([]);
  const [currentCatPage, setCurrentCatPage] = useState(1);
  const [catPagination, setCatPagination] = useState(emptyPagination);

  const fetchCategory = async () => {
    setSpinnerLoader(true);
    try {
      const {ok, data} = await apiGet(`categories?page=${currentCatPage}`);
      
      if (ok) {
        setAllCat(data.allCat);
        setCategories(data.category.data);
        setCatPagination(toPagination(data.category));
        setSpinnerLoader(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('UserInfo'));
    if(token && user.role !== 'user'){
      fetchCategory();
    }
  }, [currentCatPage, catRefresh]);

  // =======================
  //     ADD CATEGORY MODAL
  // =======================
  const [showCategoryModel, setShowCategoryModel] = useState(false);
  const CategoryModelHandler = () => setShowCategoryModel(!showCategoryModel);

  const [newIcon, setNewIcon] = useState("sprout");

  const emptyNewCat = { cat_name: '', slug: '', description: '', icon_name: '' };
  const [newCatData, setNewCatData] = useState(emptyNewCat);


  const newCatFormHandler = (event) => {
    const { name, value } = event.target;
    setNewCatData((prev) => ({ ...prev, [name]: value }));
  };

  const addCategory = async (event) => {
    event.preventDefault();

    if (!newCatData.cat_name) {
      showToast('Category name required','Error','danger');
      return;
    }
    if (!newCatData.slug) {
      showToast('Slug is required','Error','danger');
      return;
    }
    if (!newIcon) {
      showToast('Ican is required','Error','danger');
      return;
    }

    const payload = { ...newCatData, icon_name: newIcon };

    try {

      const {ok, data} = await apiSend('categories','POST', payload);
      if (!ok) {
        if(error?.cat_name?.[0]){
          showToast(error?.cat_name?.[0], 'Error','danger');
          return;
        }
        if(error?.slug?.[0]){
          showToast(error?.slug?.[0], 'Error','danger');
          return;
        }
        return;
      }
      
      showToast(data.message, 'Success','success');
      setNewCatData(emptyNewCat);
      setNewIcon("sprout");
      triggerCatRefresh();
      setShowCategoryModel(false);
    } catch (error) {
      console.log(error);
    }

  };

  // =======================
  //    EDIT CATEGORY MODAL
  // =======================
  const [showEditCategoryModel, setShowEditCategoryModel] = useState(false);
  const EditCategoryModelHandler = () => setShowEditCategoryModel(!showEditCategoryModel);

  const [selectedIcon, setSelectedIcon] = useState("sprout");
  const [editCategory, setEditCategory] = useState({
    id: '',
    cat_name: '',
    slug: '',
    description: '',
    icon_name: ''
  });

  const formHandler = (event) => {
    const { name, value } = event.target;
    setEditCategory((prev) => ({ ...prev, [name]: value }));
  };

  const viewCategory = async (cat_id) => {
    try {
      const {ok, data} = await apiGet(`categories/${cat_id}`);

      if (ok) {
        setEditCategory({
          id: data.category.id,
          cat_name: data.category.name,
          slug: data.category.slug,
          description: data.category.description,
        });
        setSelectedIcon(data.category.icon);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const updateCategory = async (event) => {
    event.preventDefault();
    if (!editCategory.cat_name) {
      showToast('Category name required','Error','danger');
      return;
    }
    if (!editCategory.slug) {
      showToast('Slug is required','Error','danger');
      return;
    }
    if (!selectedIcon) {
      showToast('Ican is required','Error','danger');
      return;
    }

    const payload = { ...editCategory, icon: selectedIcon };

    try {
      const {ok, data} = await apiSend(`categories/${editCategory.id}`, 'PUT', payload);
      
      if (ok) {
        triggerCatRefresh();
        setShowEditCategoryModel(false);
        showToast('Category updated successfully', 'Success','success');
      }else{
        const error = data.errors;
        if(error?.cat_name?.[0]){
          showToast(error?.cat_name?.[0], 'Error','danger');
          return;
        }
        if(error?.slug?.[0]){
          showToast(error?.slug?.[0], 'Error','danger');
          return;
        }
        if(data.message){
          showToast(data.message, 'Error','danger');
          return;
        }
        return;
      }
    } catch (error) {
      console.log(error);
    }
  };

  // =======================
  //     DELETE CATEGORY
  // =======================
  const deleteCategory = async (delete_id) => {
    
    try {
      const {ok, data} = await apiSend(`categories/${delete_id}`,'DELETE');
      if (ok) {
        showToast(data.message, 'Success','success');
        triggerCatRefresh();
      }else{
        showToast(data.message, 'Error','danger');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <CategoryContext.Provider value={{
      // list + pagination
      categories,
      allCat,
      currentCatPage,
      setCurrentCatPage,
      catPagination,
      fetchCategory,
      spinnerLoader,

      // add modal
      showCategoryModel,
      CategoryModelHandler,
      newIcon,
      setNewIcon,
      newCatData,
      // newCatErr,
      newCatFormHandler,
      addCategory,

      // edit modal
      showEditCategoryModel,
      setShowEditCategoryModel,
      EditCategoryModelHandler,
      selectedIcon,
      setSelectedIcon,
      editCategory,
      formHandler,
      viewCategory,
      updateCategory,

      // delete
      deleteCategory,
    }}>
      {children}
    </CategoryContext.Provider>
  );
};

// chhota hook taake har page me useContext likhna na pade
export const useCategory = () => {
  const ctx = useContext(CategoryContext);
  if (!ctx) throw new Error("Use useCategory in <CategoryContextProvider>");
  return ctx;
};

export default CategoryContextProvider;