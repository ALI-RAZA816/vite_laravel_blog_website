import React, { useContext } from "react";
import { BsBell, BsList } from "react-icons/bs";
import styles from "../assets/AdminHeader.module.css";
import { Outlet } from "react-router-dom";
import { AppContext } from "../Context/AppContext";
import { useLocation } from "react-router-dom";
import { useUser } from "../Context/UserContext";
import { baseUrl } from "../Http/Http";

const AdminHeader = () => {
  const { toggleSidebar } = useContext(AppContext);
  const location = useLocation();
  const {loggedUser} = useUser();
  const lastSegment = location.pathname.split('/').pop();
  return (
    <>
    <div className="container-fluid">
        <div className="row p-0">
            <div className="col-12">
                <div
                className={`d-flex align-items-center justify-content-between ${styles.header} ${styles.sticky}`}
                >
                {/* Sidebar toggle (tablet & mobile only) */}
                <button
                  type="button"
                  className={styles.menuBtn}
                  onClick={toggleSidebar}
                  aria-label="Toggle menu"
                >
                  <BsList />
                </button>
                {/* Search */}
                <h3 className='text-capitalize fw-bold'>{lastSegment}</h3>

                {/* Right side */}
                <div className={`d-flex align-items-center ${styles.rightSection}`}>
                    <div className={styles.bellWrapper}>
                    <BsBell className={styles.bellIcon} />
                    <span className={styles.notificationDot}></span>
                    </div>

                    <div className={`d-flex align-items-center ${styles.userSection}`}>
                    <div className={styles.userInfo}>
                        <p className={`${styles.userName} text-capitalize`}>{loggedUser?.name}</p>
                        <p className={`${styles.userRole} text-capitalize`}>{loggedUser?.role}</p>
                    </div>
                   {loggedUser.image ? <div className="rounded-5 text-center text-white" style={{lineHeight:'40px',height:'40px', width:'40px', backgroundColor: '#5b3fd9', overflow:'hidden'}}>
                      <img
                        src={`${baseUrl}/uploads/${loggedUser.image}`}
                        alt=""
                        className={styles.authorAvatar}
                      />
                    </div>: <div className="rounded-5 text-center text-white" style={{lineHeight:'40px',height:'40px', width:'40px', backgroundColor: '#5b3fd9', overflow:'hidden'}}>
                            {loggedUser?.name?.split(' ')[0].substr(0, 1)}
                            {loggedUser?.name?.split(' ')[1].substr(0, 1)}
                        </div>
                    }
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