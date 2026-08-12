import { Routes, Route } from "react-router-dom";

import Home from "./components/Home/Home.jsx";
import AllPosts from "./components/AllPosts/AllPosts.jsx";
import CategoryArchive from "./components/CategoryArchive/CategoryArchive.jsx";
import BlogPost from "./components/BlogPost/BlogPost.jsx";
import About from "./components/About/About.jsx";
import Contact from "./components/Contact/Contact.jsx";
import Login from "./components/Login/Login.jsx";
import UserProfile from "./components/UserProfile/UserProfile.jsx";
import AdminLogin from "./components/AdminLogin/AdminLogin.jsx";
import AdminDashboard from "./components/AdminDashboard/AdminDashboard.jsx";
import AdminPosts from "./components/AdminPosts/AdminPosts.jsx";
import AdminAddPost from "./components/AdminAddPost/AdminAddPost.jsx";
import AdminCategories from "./components/AdminCategories/AdminCategories.jsx";
import AdminComments from "./components/AdminComments/AdminComments.jsx";
import AdminUsers from "./components/AdminUsers/AdminUsers.jsx";
import AdminMedia from "./components/AdminMedia/AdminMedia.jsx";
import AdminSettings from "./components/AdminSettings/AdminSettings.jsx";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/all-posts" element={<AllPosts />} />
      <Route path="/category/minimalism" element={<CategoryArchive />} />
      <Route path="/post/:slug" element={<BlogPost />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/login" element={<Login />} />
      <Route path="/profile" element={<UserProfile />} />

      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/admin/dashboard" element={<AdminDashboard />} />
      <Route path="/admin/posts" element={<AdminPosts />} />
      <Route path="/admin/posts/new" element={<AdminAddPost />} />
      <Route path="/admin/categories" element={<AdminCategories />} />
      <Route path="/admin/comments" element={<AdminComments />} />
      <Route path="/admin/users" element={<AdminUsers />} />
      <Route path="/admin/media" element={<AdminMedia />} />
      <Route path="/admin/settings" element={<AdminSettings />} />
    </Routes>
  );
}

export default App;
