import { createContext, useContext, useEffect, useState } from "react";
import { apiUrl } from "../Http/Http";

export const PostContext = createContext();

const PostContextProvider = ({ children }) => {
  // apna khud ka refresh signal - sirf posts data hi dobara fetch hota hai
  const [postRefresh, setPostRefresh] = useState(0);
  const triggerPostRefresh = () => setPostRefresh((prev) => prev + 1);

  // =======================
  //     LIST + STATS
  // =======================
  const [posts, setPosts] = useState([]); // current page wali list
  const [totalPosts, setTotalPosts] = useState([]); // poori list (dashboard count ke liye)
  const [totalViews, setTotalViews] = useState(0);
  const [avgViews, setAvgViews] = useState(0);
  const [velocity, setVelocity] = useState(0);
  const [lastMonthViews, setLastMonthViews] = useState([]);

  const [currentPostPage, setCurrentPostPage] = useState(1);
  const [postPagination, setPostPagination] = useState({
    currentPage: '',
    from: '',
    lastPage: '',
    to: '',
    total: '',
    perPage: ''
  });

  const fetchPosts = async () => {
    const token = localStorage.getItem('token');
    try {
      const response = await fetch(`${apiUrl}/posts?page=${currentPostPage}`, {
        method: 'GET',
        headers: {
          'Content-type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Bearer ${token}`,
        }
      });

      const data = await response.json();

      if (response.ok) {
        setAvgViews(data.averageViews);
        setTotalPosts(data.total);
        setTotalViews(data.views);
        setVelocity(data.velocity);
        setPosts(data.posts.data);
        setPostPagination({
          currentPage: data.posts.current_page,
          from: data.posts.from,
          lastPage: data.posts.last_page,
          to: data.posts.to,
          total: data.posts.total,
          perPage: data.posts.per_page
        });

        // { year, month, monthly_views } ko chart-friendly { month, total } me badalna
        const formatted = (data?.last_month ?? []).map((item) => {
          const date = new Date(item.year, item.month - 1);
          return {
            month: date.toLocaleString('en-US', { month: 'short' }) + ` ${item.year}`,
            total: Number(item.monthly_views)
          };
        });
        setLastMonthViews(formatted);
      }
    } catch (error) {
      console.log("fetchPosts:", error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [currentPostPage, postRefresh]);

  // =======================
  //        DELETE
  // =======================
  const deletePost = async (event, id) => {
    event.preventDefault();
    const token = localStorage.getItem('token');
    try {
      const response = await fetch(`${apiUrl}/posts/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await response.json();
      if (response.ok) {
        triggerPostRefresh();
      }
    } catch (error) {
      console.log(error);
    }
  };

  // =======================
  //     MULTI DELETE
  // =======================
  const multiDeletePost = async (event, ids) => {
    event.preventDefault();
    const token = localStorage.getItem('token');
    try {
      const response = await fetch(`${apiUrl}/multi-delete-post`, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ ids })
      });
      const data = await response.json();
      if (response.ok) {
        triggerPostRefresh();
      }
      return response.ok;
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  // =======================
  //     SEARCH / FILTER
  // =======================
  const searchPosts = async (searchTerm) => {
    const token = localStorage.getItem('token');
    try {
      const response = await fetch(`${apiUrl}/search-post?query=${searchTerm}&page=${currentPostPage}`, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Bearer ${token}`,
        }
      });
      const data = await response.json();
      if (response.ok) {
        setPosts(data.posts.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <PostContext.Provider value={{
      posts,
      setPosts,
      totalPosts,
      totalViews,
      avgViews,
      velocity,
      lastMonthViews,
      currentPostPage,
      setCurrentPostPage,
      postPagination,
      fetchPosts,

      deletePost,
      multiDeletePost,
      searchPosts,
    }}>
      {children}
    </PostContext.Provider>
  );
};

// chhota hook taake har page me useContext likhna na pade
export const usePost = () => {
  const ctx = useContext(PostContext);
  if (!ctx) throw new Error("usePost ko <PostContextProvider> ke andar use karein.");
  return ctx;
};

export default PostContextProvider;