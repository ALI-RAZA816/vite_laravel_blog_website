import { createContext, useContext, useEffect, useState } from "react";
import { apiUrl } from "../Http/Http";
import {apiGet, apiSend, emptyPagination, toPagination} from '../services/apiClient.js'

export const UserContext = createContext();

const UserContextProvider = ({ children }) => {
  // apna khud ka refresh signal - sirf users data hi dobara fetch hota hai
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

  const [currentPage, setCurrentPage] = useState(1);
  const [pagination, setPagination] = useState(emptyPagination);

  // fetch all users
  const fetchUsers = async () => {
    setSpinnerLoader(true);
    try {
      const {ok, data} = await apiGet(`users?page=${currentPage}`);
      
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
    const token = localStorage.getItem('token');
    try {
      const {ok, data} = await apiSend(`search?query=${searchTerm}&page=${currentPage}`,'POST');
      
      if (ok) {
        setAllUsers(data.users.data);
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

// chhota hook taake har page me useContext likhna na pade
export const useUser = () => {
  const ctx = useContext(UserContext);
  if (!ctx) throw new Error("useUser ko <UserContextProvider> ke andar use karein.");
  return ctx;
};

export default UserContextProvider;