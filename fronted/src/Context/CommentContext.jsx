import { createContext, useContext, useEffect, useState } from "react";
import { apiUrl } from "../Http/Http";

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
  const [commentsPagination, setCommentsPagination] = useState({
    currentPage: '',
    from: '',
    lastPage: '',
    to: '',
    total: '',
    perPage: ''
  });

  const fetchcomments = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(`${apiUrl}/comments?page=${currentComments}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (response.ok) {
        setCommentAvg(data.average);
        setAllComments(data.allComments);
        setComments(data.comments.data);
        setCommentsPagination({
          currentPage: data.comments.current_page,
          from: data.comments.from,
          lastPage: data.comments.last_page,
          to: data.comments.to,
          total: data.comments.total,
          perPage: data.comments.per_page
        });
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
  const approvedComments = allComments.filter((comment) => comment.status === "approved");
  const spamComments = allComments.filter((comment) => comment.status === "spam");

  // =======================
  //     STATUS CHANGE
  // =======================
  const commentStatus = async (name, id) => {
    const token = localStorage.getItem('token');
    try {
      const response = await fetch(`${apiUrl}/comments/${id}`, {
        method: 'PUT',
        headers: {
          'Content-type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ status: name })
      });
      const data = await response.json();
      if (response.ok) {
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
      const response = await fetch(`${apiUrl}/comments/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });
      const data = await response.json();
      if (response.ok) {
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
    const token = localStorage.getItem('token');
    setActiveFilter(search_term);
    try {
      const response = await fetch(`${apiUrl}/filter-comments?page=${currentComments}&query=${search_term}`, {
        method: 'GET',
        headers: {
          'Content-type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });
      const data = await response.json();
      if (response.ok) {
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