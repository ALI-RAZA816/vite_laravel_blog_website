import { createContext, useContext, useEffect, useState } from "react";
import { apiGet, emptyPagination, toPagination } from "../services/apiClient.js";

export const PublicPostContext = createContext();

const PublicPostContextProvider = ({ children }) => {

  // =======================
  //   PUBLIC POSTS LIST (Home.jsx)
  // =======================
  const [spinnerLoader, setSpinnerLoader] = useState(false);
  const [publicPosts, setPublicPosts] = useState([]);
  const [popularPosts, setPopularPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [publicPostPage, setPublicPostPage] = useState(emptyPagination);

  const fetchPublicPosts = async () => {
    setSpinnerLoader(true);
    try {
      const {ok, data} = await apiGet(`public-posts?page=${currentPage}`);
      if (ok) {
        setPopularPosts(data.popularPost);
        setPublicPosts(data.allPost.data);
        setPublicPostPage(toPagination(data.allPost));
        setSpinnerLoader(false);
      }
    } catch (error) {
      console.log("fetchPublicPosts:", error);
    }
  };

  useEffect(() => {
    fetchPublicPosts();
  }, [currentPage]);

  // =======================
  //   SINGLE POST VIEW (BlogPost.jsx)
  // =======================
  const [postView, setPostView] = useState({
    category: '',
    title: '',
    author_image: '',
    author_name: '',
    date: '',
    tags: [],
    published: '',
    post_image: '',
    description: ''
  });

  const fetchPostView = async (id) => {
    setSpinnerLoader(true);
    try {
      const {ok, data} = await apiGet(`post-view/${id}`);
      if (ok) {
        setPostView({
          category: data.post.category.name,
          title: data.post.title,
          author_image: data.post.author.image,
          author_name: data.post.author.name,
          date: data.post.date,
          published: data.post.published,
          post_image: data.post.image,
          tags: JSON.parse(data.post.tags),
          description: data.post.description
        });
        setSpinnerLoader(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <PublicPostContext.Provider value={{
      publicPosts,
      popularPosts,
      fetchPublicPosts,
      publicPostPage,
      setPublicPostPage,
      currentPage,   
      setCurrentPage,
      postView,
      spinnerLoader,
      fetchPostView,
    }}>
      {children}
    </PublicPostContext.Provider>
  );
};

export const usePublicPost = () => {
  const ctx = useContext(PublicPostContext);
  if (!ctx) throw new Error(" Use the usePublicPost in <PublicPostContextProvider>");
  return ctx;
};

export default PublicPostContextProvider;