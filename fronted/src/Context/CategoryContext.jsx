import { createContext, useContext, useEffect, useState } from "react";
import { apiUrl } from "../Http/Http";

export const CategoryContext = createContext();

const CategoryContextProvider = ({ children }) => {
  // apna khud ka refresh signal - sirf category data hi dobara fetch hota hai
  const [catRefresh, setCatRefresh] = useState(0);
  const triggerCatRefresh = () => setCatRefresh((prev) => prev + 1);

  // =======================
  //     LIST + PAGINATION
  // =======================
  const [categories, setCategories] = useState([]); // current page wali list
  const [allCat, setAllCat] = useState([]); // dropdowns ke liye poori list
  const [currentCatPage, setCurrentCatPage] = useState(1);
  const [catPagination, setCatPagination] = useState({
    currentPage: '',
    from: '',
    lastPage: '',
    to: '',
    total: '',
    perPage: ''
  });

  const fetchCategory = async () => {
    const token = localStorage.getItem('token');
    try {
      const response = await fetch(`${apiUrl}/categories?page=${currentCatPage}`, {
        method: 'GET',
        headers: {
          'Content-type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await response.json();
      if (response.ok) {
        setAllCat(data.allCat);
        setCategories(data.category.data);
        setCatPagination({
          currentPage: data.category.current_page,
          from: data.category.from,
          lastPage: data.category.last_page,
          to: data.category.to,
          total: data.category.total,
          perPage: data.category.per_page
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCategory();
  }, [currentCatPage, catRefresh]);

  // =======================
  //     ADD CATEGORY MODAL
  // =======================
  const [showCategoryModel, setShowCategoryModel] = useState(false);
  const CategoryModelHandler = () => setShowCategoryModel(!showCategoryModel);

  const [newIcon, setNewIcon] = useState("sprout");

  const emptyNewCat = { cat_name: '', slug: '', description: '', icon_name: '' };
  const [newCatData, setNewCatData] = useState(emptyNewCat);

  const emptyNewCatErr = { cat_nameErr: '', slugErr: '', descriptionErr: '', icon_nameErr: '' };
  const [newCatErr, setNewCatErr] = useState(emptyNewCatErr);

  const newCatFormHandler = (event) => {
    const { name, value } = event.target;
    setNewCatData((prev) => ({ ...prev, [name]: value }));
  };

  const addCategory = async (event) => {
    event.preventDefault();
    setNewCatErr(emptyNewCatErr);

    if (!newCatData.cat_name) {
      setNewCatErr({ ...emptyNewCatErr, cat_nameErr: 'The category name is required' });
      return;
    }
    if (!newCatData.slug) {
      setNewCatErr({ ...emptyNewCatErr, slugErr: 'The slug-name is required' });
      return;
    }
    if (!newIcon) {
      setNewCatErr({ ...emptyNewCatErr, slugErr: 'The icon-name is required' });
      return;
    }

    const payload = { ...newCatData, icon_name: newIcon };
    const token = localStorage.getItem('token');

    try {
      const response = await fetch(`${apiUrl}/categories`, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });

      const data = await response.json();

      if (!response.ok) {
        if (data?.errors?.cat_name) {
          setNewCatErr({ ...emptyNewCatErr, cat_nameErr: data.errors.cat_name[0] });
        } else if (data?.errors?.slug) {
          setNewCatErr({ ...emptyNewCatErr, slugErr: data.errors.slug[0] });
        }
        return;
      }

      setNewCatData(emptyNewCat);
      setNewCatErr(emptyNewCatErr);
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

  // ek category ko edit modal me load karna
  const viewCategory = async (cat_id) => {
    const token = localStorage.getItem('token');
    try {
      const response = await fetch(`${apiUrl}/categories/${cat_id}`, {
        method: 'GET',
        headers: {
          'Content-type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Bearer ${token}`,
        }
      });

      const data = await response.json();
      if (response.ok) {
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
    const token = localStorage.getItem('token');
    const payload = { ...editCategory, icon: selectedIcon };

    try {
      const response = await fetch(`${apiUrl}/categories/${editCategory.id}`, {
        method: 'PUT',
        headers: {
          'Content-type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });

      const data = await response.json();
      if (response.ok) {
        triggerCatRefresh();
        setShowEditCategoryModel(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // =======================
  //     DELETE CATEGORY
  // =======================
  const deleteCategory = async (delete_id) => {
    const token = localStorage.getItem('token');
    try {
      const response = await fetch(`${apiUrl}/categories/${delete_id}`, {
        method: 'DELETE',
        headers: {
          'Content-type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Bearer ${token}`,
        }
      });
      const data = await response.json();
      if (response.ok) {
        triggerCatRefresh();
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

      // add modal
      showCategoryModel,
      CategoryModelHandler,
      newIcon,
      setNewIcon,
      newCatData,
      newCatErr,
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
  if (!ctx) throw new Error("useCategory ko <CategoryContextProvider> ke andar use karein.");
  return ctx;
};

export default CategoryContextProvider;