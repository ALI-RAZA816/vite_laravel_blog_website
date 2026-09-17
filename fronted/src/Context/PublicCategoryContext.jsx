import { createContext, useContext, useEffect, useState } from "react";
import { apiUrl } from "../Http/Http";
import { apiGet } from "../services/apiClient.js";

export const PublicCategoryContext = createContext();

const PublicCategoryContextProvider = ({ children }) => {

  // public site (Home.jsx sidebar) ke liye categories list
  const [publicCategories, setPublicCategories] = useState([]);

  const fetchPublicCategories = async () => {
    try {

      const {ok, data} = await apiGet('public-category');

      if (ok) {
        setPublicCategories(data.allCategories);
      }
    } catch (error) {
      console.log("fetchPublicCategories:", error);
    }
  };

  useEffect(() => {
    fetchPublicCategories();
  }, []);

  return (
    <PublicCategoryContext.Provider value={{
      publicCategories,
      fetchPublicCategories,
    }}>
      {children}
    </PublicCategoryContext.Provider>
  );
};

// chhota hook taake har page me useContext likhna na pade
export const usePublicCategory = () => {
  const ctx = useContext(PublicCategoryContext);
  if (!ctx) throw new Error("usePublicCategory ko <PublicCategoryContextProvider> ke andar use karein.");
  return ctx;
};

export default PublicCategoryContextProvider;