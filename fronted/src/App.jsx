import { BrowserRouter, Route,Routes} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import { lazy, useContext , Suspense} from "react";
import {AppContext} from "./Context/AppContext";

// import Header from "./components/Header";
const Header = lazy(() => import("./components/Header"));
// import Home from "./Pages/Home";
const Home = lazy(() => import("./Pages/Home"));
// import Footer from "./components/Footer";
const Footer = lazy(() => import("./components/Footer"));
// import BlogPost from "./Pages/BlogPost";
const BlogPost = lazy(() => import("./Pages/BlogPost"));
// import About from "./Pages/About";
const About = lazy(() => import("./Pages/About"));
// import Contact from "./Pages/Contact";
const Contact = lazy(() => import("./Pages/Contact"));
// import Login from "./Pages/Login";
const Login = lazy(() => import("./Pages/Login"));
// import Register from "./Pages/Register";
const Register = lazy(() => import("./Pages/Register"));
// import AdminLogin from "./Pages/AdminLogin";
const AdminLogin = lazy(() => import("./Pages/AdminLogin"));
// import Sidebar from "./components/Sidebar";
const Sidebar = lazy(() => import("./components/Sidebar"));
// import AdminHeader from "./components/AdminHeader";
const AdminHeader = lazy(() => import("./components/AdminHeader"));
// import DashboardContent from "./Pages/DashboardContent";
const DashboardContent = lazy(() => import("./Pages/DashboardContent"));
// import AdminPosts from "./Pages/AdminPosts";
const AdminPosts = lazy(() => import("./Pages/AdminPosts"));
// import AddAdminPost from "./Pages/AddAdminPost";
const AddAdminPost = lazy(() => import("./Pages/AddAdminPost"));
// import AdminCategories from "./Pages/AdminCategories";
const AdminCategories = lazy(() => import("./Pages/AdminCategories"));
// import ManageComments from "./Pages/ManageComments";
const ManageComments = lazy(() => import("./Pages/ManageComments"));
// import ManageUsers from "./Pages/ManageUsers";
const ManageUsers = lazy(() => import("./Pages/ManageUsers"));
// import AdminSetting from "./Pages/AdminSetting";
const AdminSetting = lazy(() => import("./Pages/AdminSetting"));
// import EditUser from "./Pages/EditUser";
const EditUser = lazy(() => import("./Pages/EditUser"));
// import AddNewUser from "./Pages/AddNewUser";
const AddNewUser = lazy(() => import("./Pages/AddNewUser"));
// import AdminEditPost from "./Pages/AdminEditPost";
const AdminEditPost = lazy(() => import("./Pages/AdminEditPost"));
// import ScrollToTop from "./components/ScrollToTop";
const ScrollToTop = lazy(() => import("./components/ScrollToTop"));
// import AdminPostPreview from "./Pages/AdminPostPreview";
const AdminPostPreview = lazy(() => import("./Pages/AdminPostPreview"));
// import Loader from "./components/Loader";
const Loader = lazy(() => import("./components/Loader"));
// import AuthDashboard from "./Auth/AuthDashboard";
const AuthDashboard = lazy(() => import("./Auth/AuthDashboard"));
// import NotFound from "./components/NotFound";  
const NotFound = lazy(() => import("./components/NotFound"));
// import Unauthorized from "./components/Unauthorized";
const Unauthorized = lazy(() => import("./components/Unauthorized"));
// import RouteProtected from "./Auth/RouteProtected";
const RouteProtected = lazy(() => import("./Auth/RouteProtected"));


function App() {

  const {isAdmin, loader} = useContext(AppContext);

  return (
      <>
      <Suspense fallback={<Loader/>}>
        {!isAdmin && <Header />}
            <ScrollToTop/>
            {/* {loader && <Loader/>} */}
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
                        <Route element={<RouteProtected allowRoles={["admin"]}/>}>
                          <Route path="add-new-user" element={<AddNewUser/>}/>
                        </Route>
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
      </Suspense>
      </>
  );
}

export default App;
