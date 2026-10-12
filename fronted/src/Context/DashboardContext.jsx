import { createContext, useContext, useEffect, useState } from "react";
import { apiGet} from "../services/apiClient.js";
import { UserContext } from "./UserContext.jsx";
import { StatusCode } from "../services/apiStatusCode.js";
import { useNavigate } from "react-router-dom";

export const DashboardContext = createContext();

const DashboardContextProvider = ({ children }) => {

    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    const {loggedUser} = useContext(UserContext);
    const [totalPosts, setTotalPosts] = useState([]);
    const [allComments, setAllComments] = useState([]);
    const [totalUsers, setTotalUsers] = useState(0);
    const [totalViews, setTotalViews] = useState(0);

    const fetchDashboardData = async ()=>{
        
        try{
            const {ok, status, data} = await apiGet('dashboard');

            if(ok){
                setTotalPosts(data.total);
                setAllComments(data.allComments);
                setTotalUsers(data.totalUser);
                setTotalViews(data.views);
            }else{
                navigate(StatusCode(status));
            }
        }catch(error){
            console.log(error);
        }

    }

    useEffect(()=>{
        if(token && loggedUser.role !== 'user'){
            fetchDashboardData();
        }
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

export const useDashboard = () => {
  const ctx = useContext(DashboardContext);
  if (!ctx) throw new Error(" Use the useDashboard in <DashboardContextProvider>");
  return ctx;
};

export default DashboardContextProvider;