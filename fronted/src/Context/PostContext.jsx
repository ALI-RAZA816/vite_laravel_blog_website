import { createContext, useContext, useEffect, useState } from "react";
import { apiGet, apiSend, emptyPagination, showToast, toPagination } from "../services/apiClient.js";

export const PostContext = createContext();

const PostContextProvider = ({ children }) => {
  const [postRefresh, setPostRefresh] = useState(0);
  const triggerPostRefresh = () => setPostRefresh((prev) => prev + 1);

  // =======================
  //     LIST + STATS
  // =======================
  const [posts, setPosts] = useState([]);
  const [spinnerLoader, setSpinnerLoader] = useState(false);
  const [totalViews, setTotalViews] = useState(0);
  const [avgViews, setAvgViews] = useState(0);
  const [velocity, setVelocity] = useState(0);
  const [lastMonthViews, setLastMonthViews] = useState([]);

  const [searchTerm, setSearchTerm] = useState({
    searchTerm:'',
    fieldName:''
  });
  const [currentPostPage, setCurrentPostPage] = useState(1);
  const [postPagination, setPostPagination] = useState(emptyPagination);

  const fetchPosts = async () => {
    setSpinnerLoader(true);
    try {
      let response ;
      if(!searchTerm.searchTerm && searchTerm.searchTerm == null){
        response = await apiGet(`posts?page=${currentPostPage}`);
      }else{
        response = await apiGet(`posts?field=${searchTerm.fieldName}&query=${searchTerm.searchTerm}&page=${currentPostPage}`);
      }
      const {ok, data} = response;
      if (ok) {
        setAvgViews(data.averageViews);
        setTotalViews(data.views);
        setVelocity(data.velocity);
        setPosts(data.posts.data);
        setPostPagination(toPagination(data.posts));

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
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('UserInfo'));
    if(token && user.role !== 'user'){
      fetchPosts();
    }
  }, [currentPostPage, postRefresh, searchTerm]);

  // =======================
  //        DELETE
  // =======================
  const deletePost = async (event, id) => {
    event.preventDefault();

    try {

      const {ok, data} = await apiSend(`posts/${id}`,'DELETE');
      if (ok) {
        showToast(data.message, 'Success','success');
        triggerPostRefresh();
      }else{
        showToast(data.message, 'Error','error');
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
    try {
      const {ok, data} = await apiSend(`multi-delete-post`,'POST', {ids});
      if (ok) {
        showToast(data.message, 'Success','success');
        triggerPostRefresh();
      }else{
        showToast(data.message, 'Error','danger');
      }
      return ok;
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  return (
    <PostContext.Provider value={{
      posts,
      setPosts,
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
      setSearchTerm
    }}>
      {children}
    </PostContext.Provider>
  );
};

export const usePost = () => {
  const ctx = useContext(PostContext);
  if (!ctx) throw new Error(" Use the usePost in <PostContextProvider>");
  return ctx;
};

export default PostContextProvider;