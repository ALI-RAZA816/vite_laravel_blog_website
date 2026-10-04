import React, { useContext } from "react";
import { BsBell, BsList } from "react-icons/bs";
import styles from "../assets/AdminHeader.module.css";
import { Outlet, useLocation } from "react-router-dom";
import { AppContext } from "../Context/AppContext";
import { useUser } from "../Context/UserContext";
import { baseUrl } from "../Http/Http";
import { Link } from "react-router-dom";
import { useContact } from "../Context/ContactContext";

const AdminHeader = () => {
  const { toggleSidebar } = useContext(AppContext);
  const location = useLocation();
  const { loggedUser } = useUser();
  const {
    totalMessages
  } = useContact();
  const lastSegment = location.pathname.split('/');

  // Naam se initials (single word naam par bhi crash nahi karega)
  const initials = (loggedUser?.name || '')
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0])
    .join('')
    .toUpperCase();

  return (
    <>
      <div className="container-fluid">
        <div className="row p-0">
          <div className="col-12">
            <div
              className={`d-flex align-items-center justify-content-between ${styles.header} ${styles.stickyHeader}`}
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

              {/* Page heading */}
              <h3 className={`text-capitalize ${styles.pageHeading}`}>{lastSegment[2]}</h3>

              {/* Right side */}
              <div className={`d-flex align-items-center ${styles.rightSection}`}>
                <Link to={`/admin-panel/messages`}>
                  <div className={styles.bellWrapper}>
                    <BsBell className={styles.bellIcon} />
                      <span className={styles.notificationDot}>{totalMessages.length}</span>
                  </div>
                </Link>

                <div className={`d-flex align-items-center ${styles.userSection}`}>
                  <div className={styles.userInfo}>
                    <p className={`${styles.userName} text-capitalize`}>{loggedUser?.name}</p>
                    <p className={`${styles.userRole} text-capitalize`}>{loggedUser?.role}</p>
                  </div>
                  <div className={styles.userAvatar}>
                    {loggedUser?.image ? (
                      <img
                        src={`${baseUrl}/uploads/${loggedUser.image}`}
                        alt=""
                        className={styles.userAvatarImg}
                      />
                    ) : (
                      initials
                    )}
                  </div>
                </div>
              </div>
            </div>
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminHeader;