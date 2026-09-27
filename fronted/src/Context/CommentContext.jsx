import { createContext, useContext, useEffect, useState } from "react";
import { apiGet , apiSend, emptyPagination, toPagination } from "../services/apiClient.js";

export const CommentContext = createContext();

const CommentContextProvider = ({ children }) => {
  const [commentRefresh, setCommentRefresh] = useState(0);
  const [spinnerLoader, setSpinnerLoader] = useState(false);
  const triggerCommentRefresh = () => setCommentRefresh((prev) => prev + 1);

  // =======================
  //     LIST + PAGINATION
  // =======================
  const [comments, setComments] = useState([]); // current page wali list
  const [allComments, setAllComments] = useState([]); // poori list (stats + tab counts ke liye)
  const [commentAvg, setCommentAvg] = useState(0);
  const [currentComments, setCurrentComments] = useState(1);
  const [activeFilter, setActiveFilter] = useState('all');
  const [commentsPagination, setCommentsPagination] = useState(emptyPagination);

  const fetchcomments = async () => {
    setSpinnerLoader(true);
    try {
      let response;
      if(!activeFilter && activeFilter == null){
        response = await apiGet(`comments?page=${currentComments}`);
      }else{
        response = await apiGet(`comments?query=${activeFilter}&page=${currentComments}`);
      }
      const {ok, data} = response;
      
      if (ok) {
        setCommentAvg(data.average);
        setAllComments(data.allComments);
        setComments(data.comments.data);
        setCommentsPagination(toPagination(data.comments));
        setSpinnerLoader(false);
      }
    } catch (error) {
      console.log("fetchcomments:", error);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('UserInfo'));
    if(token && user.role !== 'user'){
      fetchcomments();
    }
  }, [currentComments,activeFilter, commentRefresh]);

  // status ke hisaab se derived lists - stat cards aur tab counts ke liye
  const pendingComments = allComments.filter((comment) => comment.status === "pending");
  const approvedComments = allComments.filter((comment) => comment.status === "approved");
  const spamComments = allComments.filter((comment) => comment.status === "spam");

  // =======================
  //     STATUS CHANGE
  // =======================
  const commentStatus = async (name, id) => {
    try {
      const {ok, data} = await apiSend(`comments/${id}`, 'PUT', {status:name});
      if (ok) {
        triggerCommentRefresh();
      }
    } catch (error) {
      console.log(error);
    }
  };

  // =======================
  //        DELETE
  // =======================
  const Deletecomment = async (id) => {
    try {
      const {ok, data} = await apiSend(`comments/${id}`,'DELETE');

      if (ok) {
        triggerCommentRefresh();
      }
    } catch (error) {
      console.log(error);
    }
  };

  // =======================
  //     SEARCH / FILTER
  // =======================

  const Searchcomment = async (search_term) => {
    setActiveFilter(search_term);
  };

  return (
    <CommentContext.Provider value={{
      comments,
      setComments,
      allComments,
      commentAvg,
      currentComments,
      setCurrentComments,
      commentsPagination,
      fetchcomments,

      pendingComments,
      approvedComments,
      spamComments,

      commentStatus,
      Deletecomment,

      activeFilter,
      Searchcomment,
      spinnerLoader
    }}>
      {children}
    </CommentContext.Provider>
  );
};

export const useComment = () => {
  const ctx = useContext(CommentContext);
  if (!ctx) throw new Error("useComment ko <CommentContextProvider> ke andar use karein.");
  return ctx;
};

export default CommentContextProvider;