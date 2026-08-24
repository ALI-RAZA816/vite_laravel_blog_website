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
} from "react-icons/bs";
import { Link, Outlet, useLocation } from "react-router-dom";
import { AppContext } from "../Context/AppContext";

const navItems = [
  { icon: <BsGrid1X2Fill />, label: "dashboard", active: true },
  { icon: <BsFileEarmarkTextFill />, label: "posts" },
  { icon: <BsDiagram3Fill />, label: "categories" },
  { icon: <BsChatSquareTextFill />, label: "comments" },
  { icon: <BsPeopleFill />, label: "users" },
//   { icon: <BsImages />, label: "media" },
  { icon: <BsGearFill />, label: "settings" },
];

const Sidebar = () => {

    const location = useLocation();
    const {deleteModel} = useContext(AppContext);

  return (
    <>
        {deleteModel && <DeleteModel/>}
        <div className="container-fluid p-0">
            <div className="row p-0">
                <div className={`col-2 d-flex flex-column ${styles.sidebar} ${styles.sticky}`}>
                {/* Brand */}
                <div className={styles.brand}>
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
                <div className={styles.logoutWrapper}>
                    <a href="#" className={`d-flex align-items-center ${styles.logoutLink}`}>
                    <span className={styles.icon}>
                        <BsBoxArrowRight />
                    </span>
                    <span>Logout</span>
                    </a>
                </div>
                </div>
                <div className="col-10 p-0">
                    <Outlet/>
                </div>
            </div>
        </div>
    </>
  );
};

export default Sidebar;