import Header from "./components/Header";
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from "./Pages/Home";
import Footer from "./components/Footer";
import { BrowserRouter, Route,Routes} from "react-router-dom";
import BlogPost from "./Pages/BlogPost";
import About from "./Pages/About";
import Contact from "./Pages/Contact";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import AdminLogin from "./Pages/AdminLogin";
import Sidebar from "./components/Sidebar";
import AdminHeader from "./components/AdminHeader";
import DashboardContent from "./Pages/DashboardContent";
import AdminPosts from "./Pages/AdminPosts";
import AddAdminPost from "./Pages/AddAdminPost";
import AdminCategories from "./Pages/AdminCategories";
import ManageComments from "./Pages/ManageComments";
import { useContext } from "react";
import {AppContext} from "./Context/AppContext";
import ManageUsers from "./Pages/ManageUsers";
import AdminSetting from "./Pages/AdminSetting";
import EditUser from "./Pages/EditUser";
import AddNewUser from "./Pages/AddNewUser";
import AdminEditPost from "./Pages/AdminEditPost";
import ScrollToTop from "./components/ScrollToTop";
import AdminPostPreview from "./Pages/AdminPostPreview";
import Loader from "./components/Loader";
import AuthDashboard from "./Auth/AuthDashboard";
import NotFound from "./components/NotFound";
import Unauthorized from "./components/Unauthorized";
import RouteProtected from "./Auth/RouteProtected";

function App() {

  const {isAdmin, loader} = useContext(AppContext);

  return (
      <>
        {!isAdmin && <Header />}
            <ScrollToTop/>
            {loader && <Loader/>}
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/blog-post/:id' element={<BlogPost/>}/>
              <Route path='/about' element={<About/>}/>
              <Route path='/contact' element={<Contact/>}/>
              <Route path='/login' element={<Login/>}/>
              <Route path='/register' element={<Register/>}/>
              <Route path='/admin-login' element={<AdminLogin/>}/>
                
              <Route element={<AuthDashboard/>}>
                <Route path="/admin-panel" element={<Sidebar/>}>
                  <Route element={<RouteProtected allowRoles={["admin", "editor", "author"]}/>}>
                    <Route path="dashboard" element={<AdminHeader/>}>
                      <Route index element={<DashboardContent/>}/>
                    </Route>
                  </Route>
                  <Route element={<RouteProtected allowRoles={["admin", "editor","author"]}/>}>
                    <Route path="posts" element={<AdminHeader/>}>
                      <Route index element={<AdminPosts/>}/>
                      <Route path="post-preview/:id" element={<AdminPostPreview/>} />
                      <Route path="add-post" element={<AddAdminPost/>}/>
                      <Route path="edit-post/:id" element={<AdminEditPost/>}/>
                      <Route element={<RouteProtected allowRoles={["admin", "editor"]}/>}>
                        <Route path="add-categories" element={<AdminCategories/>}/>
                      </Route>
                    </Route>
                  </Route>
                  <Route element={<RouteProtected allowRoles={["admin", "editor"]}/>}>
                    <Route path="categories" element={<AdminHeader/>}>
                      <Route index element={<AdminCategories/>}/>
                    </Route>
                  </Route>
                  <Route element={<RouteProtected allowRoles={["admin", "editor","author"]}/>}>
                    <Route path="comments" element={<AdminHeader/>}>
                      <Route index element={<ManageComments/>}/>
                    </Route>
                  </Route>
                    <Route element={<RouteProtected allowRoles={["admin", "editor"]}/>}>
                      <Route path="users" element={<AdminHeader/>}>
                      <Route index element={<ManageUsers/>}/>
                      <Route element={<RouteProtected allowRoles={["admin"]}/>}>
                        <Route path="edituser/:id" element={<EditUser/>}/>
                      </Route>
                    </Route>
                    <Route element={<RouteProtected allowRoles={["admin"]}/>}>
                      <Route path="add-new-user" element={<AddNewUser/>}/>
                    </Route>
                  </Route>
                    <Route element={<RouteProtected allowRoles={["admin"]}/>}>
                      <Route path="settings" element={<AdminHeader/>}>
                        <Route index element={<AdminSetting/>}/>
                      </Route>
                  </Route>
                </Route>
              </Route>
              <Route path="/aunauthorized" element={<Unauthorized/>}/>
              <Route path="*" element={<NotFound/>}/>
            </Routes>
        
        {!isAdmin && <Footer />}
      </>
  );
}

export default App;
