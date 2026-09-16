import { createContext, useContext, useEffect, useState } from "react";
import { apiUrl } from "../Http/Http";

export const PublicPostContext = createContext();

const PublicPostContextProvider = ({ children }) => {

  // =======================
  //   PUBLIC POSTS LIST (Home.jsx)
  // =======================
  const [publicPosts, setPublicPosts] = useState([]);
  const [popularPosts, setPopularPosts] = useState([]);

  const fetchPublicPosts = async () => {
    try {
      const response = await fetch(`${apiUrl}/public-posts`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
      });

      const data = await response.json();

      if (response.ok) {
        setPopularPosts(data.popularPost);
        setPublicPosts(data.allPost);
      }
    } catch (error) {
      console.log("fetchPublicPosts:", error);
    }
  };

  useEffect(() => {
    fetchPublicPosts();
  }, []);

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
    const token = localStorage.getItem('token');
    try {
      const response = await fetch(`${apiUrl}/post-view/${id}`, {
        method: 'GET',
        headers: {
          'Content-type': 'application/json',
          'Accept': 'application/json',
          ...(token ? { 'Authorization': `Bearer ${token}` } : {})
        }
      });

      const data = await response.json();
      if (response.ok) {
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

      postView,
      fetchPostView,
    }}>
      {children}
    </PublicPostContext.Provider>
  );
};

// chhota hook taake har page me useContext likhna na pade
export const usePublicPost = () => {
  const ctx = useContext(PublicPostContext);
  if (!ctx) throw new Error("usePublicPost ko <PublicPostContextProvider> ke andar use karein.");
  return ctx;
};

export default PublicPostContextProvider;