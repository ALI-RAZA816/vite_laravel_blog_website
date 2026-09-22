import { createContext, useContext, useEffect, useState } from "react";
import { apiUrl } from "../Http/Http";
import { apiGet, apiSend, emptyPagination, toPagination } from "../services/apiClient.js";

export const DashboardContext = createContext();

const DashboardContextProvider = ({ children }) => {

    const [totalPosts, setTotalPosts] = useState([]); // poori list (dashboard count ke liye)
    const [allComments, setAllComments] = useState([]); // poori list (stats + tab counts ke liye)
    const [totalUsers, setTotalUsers] = useState(0);
    const [totalViews, setTotalViews] = useState(0);

    const fetchDashboardData = async ()=>{
        
        try{
            const {ok, data} = await apiGet('dashboard');

            if(ok){
                setTotalPosts(data.total);
                setAllComments(data.allComments);
                setTotalUsers(data.totalUser);
                setTotalViews(data.views);
            }
        }catch(error){
            console.log(error);
        }

    }

    useEffect(()=>{
        fetchDashboardData();
    },[]);


  return (
    <DashboardContext.Provider value={{
        totalPosts,
        allComments,
        totalUsers,
        totalViews
    }}>
      {children}
    </DashboardContext.Provider>
  );
};

// chhota hook taake har page me useContext likhna na pade
export const useDashboard = () => {
  const ctx = useContext(DashboardContext);
  if (!ctx) throw new Error("useDashboard ko <DashboardContextProvider> ke andar use karein.");
  return ctx;
};

export default DashboardContextProvider;