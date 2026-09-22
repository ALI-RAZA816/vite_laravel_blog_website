import React, { useContext } from "react";
import styles from '../assets/Sidebar.module.css'
import DeleteModel from '../Pages/DeleteModel';
import {
  BsGrid1X2Fill,
  BsFileEarmarkTextFill,
  BsDiagram3Fill,
  BsChatSquareTextFill,
  BsPeopleFill,
  BsImages,
  BsGearFill,
  BsBoxArrowRight,
  BsXLg,
} from "react-icons/bs";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { AppContext } from "../Context/AppContext";
import { useUser } from "../Context/UserContext";
import { apiSend } from "../services/apiClient";

const navItems = [
  { icon: <BsGrid1X2Fill />, label: "dashboard", roles:['admin', 'editor', 'author'], active: true },
  { icon: <BsFileEarmarkTextFill />, label: "posts", roles:['admin', 'editor', 'author'] },
  { icon: <BsDiagram3Fill />, label: "categories", roles:['admin', 'editor'] },
  { icon: <BsChatSquareTextFill />, label: "comments" , roles:['admin', 'editor'] },
  { icon: <BsPeopleFill />, label: "users", roles:['admin', 'editor'] },
  { icon: <BsGearFill />, label: "settings", roles:['admin'] },
];

const Sidebar = () => {

    const location = useLocation();
    const navigate = useNavigate();
    const {deleteModel, sidebarOpen, closeSidebar} = useContext(AppContext);
    const logoutPanel = async (event)=>{
        event.preventDefault();
        try{
            const {ok, data} = await apiSend('logout','POST',null);
            if(ok){
                localStorage.removeItem('token');
                localStorage.removeItem('UserInfo');
                navigate('/');
            }
        }catch(error){
            console.log(error);
        }
    }
  return (
    <>
        {deleteModel && <DeleteModel/>}
        <div className="container-fluid p-0">
            <div className={`row p-0 g-0 ${styles.layoutRow}`}>
                {sidebarOpen && <div className={styles.overlay} onClick={closeSidebar}></div>}
                <div className={`col-2 d-flex flex-column ${styles.sidebar} ${styles.sticky} ${sidebarOpen ? styles.open : ''}`}>
                {/* Brand */}
                <div className={styles.brand}>
                    <button type="button" className={styles.closeBtn} onClick={closeSidebar} aria-label="Close sidebar">
                        <BsXLg />
                    </button>
                    <h5 className={styles.brandTitle}>
                    Admin
                    <br />
                    Workspace
                    </h5>
                    <p className={styles.brandSubtitle}>Management Portal</p>
                </div>

                {/* Nav */}
                <ul className={`nav flex-column ${styles.navList}`}>
                    {navItems.map((item, index) => (
                    <li className="nav-item" key={index}>
                        <Link
                            to={`/admin-panel/${item.label}`}
                            onClick={closeSidebar}
                            className={`nav-link text-capitalize d-flex align-items-center ${styles.navLink} ${
                                location.pathname === `/admin-panel/${item.label}` ? styles.active : ""
                            }`}
                            >
                            <span className={styles.icon}>{item.icon}</span>
                            <span>{item.label}</span>
                        </Link>
                    </li>
                    ))}
                </ul>

                {/* Logout */}
                <div onClick={logoutPanel} className={styles.logoutWrapper}>
                    <a href="#" className={`d-flex align-items-center ${styles.logoutLink}`}>
                    <span className={styles.icon}>
                        <BsBoxArrowRight />
                    </span>
                    <span>Logout</span>
                    </a>
                </div>
                </div>
                <div className={`col-10 p-0 ${styles.content}`}>
                    <Outlet/>
                </div>
            </div>
        </div>
    </>
  );
};

export default Sidebar;