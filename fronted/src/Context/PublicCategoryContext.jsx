import { createContext, useContext, useEffect, useState } from "react";
import { apiGet } from "../services/apiClient.js";
import { StatusCode } from "../services/apiStatusCode.js";
import { useNavigate } from "react-router-dom";

export const PublicCategoryContext = createContext();

const PublicCategoryContextProvider = ({ children }) => {

  const [publicCategories, setPublicCategories] = useState([]);

  const navigate = useNavigate();
  const fetchPublicCategories = async () => {
    try {

      const {ok, data} = await apiGet('public-category');

      if (ok) {
        setPublicCategories(data.allCategories);
      }else{
        navigate(StatusCode(status));
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

export const usePublicCategory = () => {
  const ctx = useContext(PublicCategoryContext);
  if (!ctx) throw new Error(" Use the usePublicCategory in <PublicCategoryContextProvider>");
  return ctx;
};

export default PublicCategoryContextProvider;