import { createContext, useContext, useEffect, useState } from "react";
import {apiGet, apiSend, emptyPagination, toPagination} from '../services/apiClient.js'
import { useNavigate } from "react-router-dom";
import { AppContext } from "./AppContext.jsx";

export const UserContext = createContext();

const UserContextProvider = ({ children }) => {
  const [userRefresh, setUserRefresh] = useState(0);
  const [spinnerLoader, setSpinnerLoader] = useState(false);
  const triggerUserRefresh = () => setUserRefresh((prev) => prev + 1);

  // =======================
  //     LIST + STATS
  // =======================
  const [loggedUser, setLoggedUser] = useState(() => {
        const stored = localStorage.getItem('UserInfo');
        return stored ? JSON.parse(stored) : null; 
    });
  const [totalUsers, setTotalUsers] = useState(0);
  const [allUsers, setAllUsers] = useState([]);
  const [Blocked, setBlocked] = useState([]);
  const [thisWeek, setThisWeek] = useState([]);
  const [allEditors, setAllEditors] = useState([]);
  const {setStatusCode} = useContext(AppContext);
  const {navigate} = useNavigate();

  const [currentPage, setCurrentPage] = useState(1);
  const [pagination, setPagination] = useState(emptyPagination);

  // fetch all users
  const fetchUsers = async () => {
    setSpinnerLoader(true);
    try {
      const {ok, status, data} = await apiGet(`users?page=${currentPage}`);
      
      if (ok) {
        if (data.status === true) {
          setLoggedUser(data.loggedUser);
          setTotalUsers(data.total);
          setAllUsers(data.users.data);
          setAllEditors(data.editor);
          setThisWeek(data.this_week);
          setBlocked(data.blocked);
          setPagination(toPagination(data.users));
          setSpinnerLoader(false);
        }
      }else{
        setStatusCode(status);
        setSpinnerLoader(false);
        navigate('/aunauthorized');
      }
    } catch (error) {
      console.log("fetchUsers:", error);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('UserInfo'));
    if(token && user.role !== 'user'){
      fetchUsers();
    }
  }, [currentPage, userRefresh]);

  // =======================
  //     SEARCH / FILTER
  // =======================
  const searchUsers = async (searchTerm) => {
    try {
      const {ok, status, data} = await apiSend(`search?query=${searchTerm}&page=${currentPage}`,'POST');
      
      if (ok) {
        setAllUsers(data.users.data);
      }else{
        setStatusCode(status);
        // setSpinnerLoader(false);
        navigate('/aunauthorized');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <UserContext.Provider value={{
      loggedUser,
      totalUsers,
      allUsers,
      setLoggedUser,
      setAllUsers,
      Blocked,
      thisWeek,
      allEditors,
      currentPage,
      setCurrentPage,
      pagination,
      fetchUsers,
      triggerUserRefresh,
      spinnerLoader,

      searchUsers,
    }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const ctx = useContext(UserContext);
  if (!ctx) throw new Error(" Use the useUser in <UserContextProvider>");
  return ctx;
};

export default UserContextProvider;