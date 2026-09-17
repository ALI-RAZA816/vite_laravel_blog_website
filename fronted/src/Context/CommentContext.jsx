import { createContext, useContext, useEffect, useState } from "react";
import { apiUrl } from "../Http/Http";
import { apiGet , apiSend, emptyPagination, toPagination } from "../services/apiClient.js";

export const CommentContext = createContext();

const CommentContextProvider = ({ children }) => {
  // apna khud ka refresh signal - sirf comment data hi dobara fetch hota hai
  const [commentRefresh, setCommentRefresh] = useState(0);
  const triggerCommentRefresh = () => setCommentRefresh((prev) => prev + 1);

  // =======================
  //     LIST + PAGINATION
  // =======================
  const [comments, setComments] = useState([]); // current page wali list
  const [allComments, setAllComments] = useState([]); // poori list (stats + tab counts ke liye)
  const [commentAvg, setCommentAvg] = useState(0);
  const [currentComments, setCurrentComments] = useState(1);
  const [commentsPagination, setCommentsPagination] = useState(emptyPagination);

  const fetchcomments = async () => {

    try {

      const {ok, data} = await apiGet(`comments?page=${currentComments}`);

      if (ok) {
        setCommentAvg(data.average);
        setAllComments(data.allComments);
        setComments(data.comments.data);
        setCommentsPagination(toPagination(data.comments));
      }
    } catch (error) {
      console.log("fetchcomments:", error);
    }
  };

  useEffect(() => {
    fetchcomments();
  }, [currentComments, commentRefresh]);

  // status ke hisaab se derived lists - stat cards aur tab counts ke liye
  const pendingComments = allComments.filter((comment) => comment.status === "pending");
  console.log(pendingComments);
  const approvedComments = allComments.filter((comment) => comment.status === "approved");
  const spamComments = allComments.filter((comment) => comment.status === "spam");

  // =======================
  //     STATUS CHANGE
  // =======================
  const commentStatus = async (name, id) => {
    const token = localStorage.getItem('token');
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
    const token = localStorage.getItem('token');
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
  const [activeFilter, setActiveFilter] = useState('all');

  const Searchcomment = async (search_term) => {
    setActiveFilter(search_term);
    try {
      const {ok, data} = await apiGet(`filter-comments?page=${currentComments}&query=${search_term}`);

      if (ok) {
        setComments(data.searchComments.data);
      }
    } catch (error) {
      console.log(error);
    }
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
    }}>
      {children}
    </CommentContext.Provider>
  );
};

// chhota hook taake har page me useContext likhna na pade
export const useComment = () => {
  const ctx = useContext(CommentContext);
  if (!ctx) throw new Error("useComment ko <CommentContextProvider> ke andar use karein.");
  return ctx;
};

export default CommentContextProvider;