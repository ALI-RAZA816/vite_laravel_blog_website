import { createContext, useContext, useEffect, useState } from "react";
import { apiUrl } from "../Http/Http";

export const UserContext = createContext();

const UserContextProvider = ({ children }) => {
  // apna khud ka refresh signal - sirf users data hi dobara fetch hota hai
  const [userRefresh, setUserRefresh] = useState(0);
  const triggerUserRefresh = () => setUserRefresh((prev) => prev + 1);

  // =======================
  //     LIST + STATS
  // =======================
  const [loggedUser, setLoggedUser] = useState([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [allUsers, setAllUsers] = useState([]);
  const [Blocked, setBlocked] = useState([]);
  const [thisWeek, setThisWeek] = useState([]);
  const [allEditors, setAllEditors] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [pagination, setPagination] = useState({
    currentPage: '',
    from: '',
    lastPage: '',
    to: '',
    total: '',
    perPage: ''
  });

  // fetch all users
  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${apiUrl}/users?page=${currentPage}`, {
        method: 'GET',
        headers: {
          'Content-type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await response.json();
      if (response.ok) {
        if (data.status === true) {
          setLoggedUser(data.loggedUser);
          setTotalUsers(data.total);
          setAllUsers(data.users.data);
          setAllEditors(data.editor);
          setThisWeek(data.this_week);
          setBlocked(data.blocked);
          setPagination({
            currentPage: data.users.current_page,
            from: data.users.from,
            lastPage: data.users.last_page,
            to: data.users.to,
            total: data.users.total,
            perPage: data.users.per_page
          });
        }
      }
    } catch (error) {
      console.log("fetchUsers:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [currentPage, userRefresh]);

  // =======================
  //     SEARCH / FILTER
  // =======================
  const searchUsers = async (searchTerm) => {
    const token = localStorage.getItem('token');
    try {
      const response = await fetch(`${apiUrl}/search?query=${searchTerm}&page=${currentPage}`, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Bearer ${token}`,
        }
      });
      const data = await response.json();
      if (response.ok) {
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