import React from "react";
import { BsSearch, BsBell } from "react-icons/bs";
import styles from "../assets/AdminHeader.module.css";
import { Outlet } from "react-router-dom";

const AdminHeader = () => {
  return (
    <>
    <div className="container-fluid">
        <div className="row">
            <div className="col-12">
                <div
                className={`d-flex align-items-center justify-content-between ${styles.header} ${styles.sticky}`}
                >
                {/* Search */}
                <div className={styles.searchWrapper}>
                    <BsSearch className={styles.searchIcon} />
                    <input
                    type="text"
                    className={`form-control ${styles.searchInput}`}
                    placeholder="Search data, posts, users..."
                    />
                </div>

                {/* Right side */}
                <div className={`d-flex align-items-center ${styles.rightSection}`}>
                    <div className={styles.bellWrapper}>
                    <BsBell className={styles.bellIcon} />
                    <span className={styles.notificationDot}></span>
                    </div>

                    <div className={`d-flex align-items-center ${styles.userSection}`}>
                    <div className={styles.userInfo}>
                        <p className={styles.userName}>Alex Rivera</p>
                        <p className={styles.userRole}>Editor in Chief</p>
                    </div>
                    <img
                        src="https://i.pravatar.cc/100?img=47"
                        alt="Alex Rivera"
                        className={styles.avatar}
                    />
                    </div>
                </div>
                </div>
                <Outlet/>
            </div>
        </div>
    </div>
    </>
  );
};

export default AdminHeader;