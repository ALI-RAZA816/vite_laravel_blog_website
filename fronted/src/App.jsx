import {Route,Routes} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import { lazy, useContext , Suspense} from "react";
import {AppContext} from "./Context/AppContext";

const Header = lazy(() => import("./components/Header"));
const Home = lazy(() => import("./Pages/Home"));
const Footer = lazy(() => import("./components/Footer"));
const BlogPost = lazy(() => import("./Pages/BlogPost"));
const About = lazy(() => import("./Pages/About"));
const Contact = lazy(() => import("./Pages/Contact"));
const Login = lazy(() => import("./Pages/Login"));
const Register = lazy(() => import("./Pages/Register"));
const AdminLogin = lazy(() => import("./Pages/AdminLogin"));
const Sidebar = lazy(() => import("./components/Sidebar"));
const AdminHeader = lazy(() => import("./components/AdminHeader"));
const DashboardContent = lazy(() => import("./Pages/DashboardContent"));
const AdminPosts = lazy(() => import("./Pages/AdminPosts"));
const AddAdminPost = lazy(() => import("./Pages/AddAdminPost"));
const AdminCategories = lazy(() => import("./Pages/AdminCategories"));
const ManageComments = lazy(() => import("./Pages/ManageComments"));
const ManageUsers = lazy(() => import("./Pages/ManageUsers"));
const AdminSetting = lazy(() => import("./Pages/AdminSetting"));
const EditUser = lazy(() => import("./Pages/EditUser"));
const AddNewUser = lazy(() => import("./Pages/AddNewUser"));
const AdminEditPost = lazy(() => import("./Pages/AdminEditPost"));
const ScrollToTop = lazy(() => import("./components/ScrollToTop"));
const AdminPostPreview = lazy(() => import("./Pages/AdminPostPreview"));
const Loader = lazy(() => import("./components/Loader"));
const AuthDashboard = lazy(() => import("./Auth/AuthDashboard"));
const NotFound = lazy(() => import("./components/NotFound"));
const Unauthorized = lazy(() => import("./components/Unauthorized"));
const RouteProtected = lazy(() => import("./Auth/RouteProtected"));
const AdminMessage = lazy(() => import("./Pages/AdminMessage"));
const ForgotPassword = lazy(() => import("./Pages/ForgotPassword"));
const VerifyOtp = lazy(() => import("./Pages/VerifyOtp"));
const ResetPassword = lazy(() => import("./Pages/ResetPassword"));


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
              <Route path='/forgot-password' element={<ForgotPassword/>}/>
              <Route path='/verify-otp' element={<VerifyOtp/>}/>
              <Route path='/reset-password' element={<ResetPassword/>}/>
                
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
                    <Route element={<RouteProtected allowRoles={["admin"]}/>}>
                      <Route path="messages" element={<AdminHeader/>}>
                        <Route index element={<AdminMessage/>}/>
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
