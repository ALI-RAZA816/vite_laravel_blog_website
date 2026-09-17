import { createContext, useContext, useEffect, useState } from "react";
import { apiUrl } from "../Http/Http";
import { apiGet, apiSend, emptyPagination, toPagination } from "../services/apiClient.js";

export const PostContext = createContext();

const PostContextProvider = ({ children }) => {
  // apna khud ka refresh signal - sirf posts data hi dobara fetch hota hai
  const [postRefresh, setPostRefresh] = useState(0);
  const triggerPostRefresh = () => setPostRefresh((prev) => prev + 1);

  // =======================
  //     LIST + STATS
  // =======================
  const [posts, setPosts] = useState([]); // current page wali list
  const [spinnerLoader, setSpinnerLoader] = useState(false);
  const [totalPosts, setTotalPosts] = useState([]); // poori list (dashboard count ke liye)
  const [totalViews, setTotalViews] = useState(0);
  const [avgViews, setAvgViews] = useState(0);
  const [velocity, setVelocity] = useState(0);
  const [lastMonthViews, setLastMonthViews] = useState([]);

  const [currentPostPage, setCurrentPostPage] = useState(1);
  const [postPagination, setPostPagination] = useState(emptyPagination);

  const fetchPosts = async () => {
    setSpinnerLoader(true);
    try {
      const {ok, data} = await apiGet(`posts?page=${currentPostPage}`);
      if (ok) {
        setAvgViews(data.averageViews);
        setTotalPosts(data.total);
        setTotalViews(data.views);
        setVelocity(data.velocity);
        setPosts(data.posts.data);
        setPostPagination(toPagination(data.posts));

        // { year, month, monthly_views } ko chart-friendly { month, total } me badalna
        const formatted = (data?.last_month ?? []).map((item) => {
          const date = new Date(item.year, item.month - 1);
          return {
            month: date.toLocaleString('en-US', { month: 'short' }) + ` ${item.year}`,
            total: Number(item.monthly_views)
          };
        });
        setLastMonthViews(formatted);
        setSpinnerLoader(false);
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

    try {

      const {ok, data} = await apiSend(`posts/${id}`,'DELETE');
      if (ok) {
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
      const {ok, data} = await apiSend(`multi-delete-post`,'POST', {ids});
      if (ok) {
        triggerPostRefresh();
      }
      return ok;
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  // =======================
  //     SEARCH / FILTER
  // =======================
  const searchPosts = async (searchTerm) => {
    
    try {
      const {ok, data} = await apiSend(`search-post?query=${searchTerm}&page=${currentPostPage}`,'POST');
      if (ok) {
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
      setSpinnerLoader,
      spinnerLoader,
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