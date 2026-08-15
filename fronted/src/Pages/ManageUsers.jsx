import React from "react";
import {
  BsDownload,
  BsPersonPlusFill,
  BsPeopleFill,
  BsShieldFillCheck,
  BsGraphUpArrow,
  BsSlashCircleFill,
  BsFilter,
  BsThreeDotsVertical,
  BsChevronLeft,
  BsChevronRight,
} from "react-icons/bs";
import styles from "../assets/ManageUsers.module.css";

const statCards = [
  {
    icon: <BsPeopleFill />,
    iconBg: "#e6e0f8",
    iconColor: "#5b3fd9",
    label: "TOTAL USERS",
    value: "1,284",
  },
  {
    icon: <BsShieldFillCheck />,
    iconBg: "#faf1d8",
    iconColor: "#c98a1a",
    label: "EDITORS",
    value: "12",
  },
  {
    icon: <BsGraphUpArrow />,
    iconBg: "#e6e0f8",
    iconColor: "#5b3fd9",
    label: "NEW THIS WEEK",
    value: "+42",
  },
  {
    icon: <BsSlashCircleFill />,
    iconBg: "#fbe1e1",
    iconColor: "#d94f4f",
    label: "BLOCKED",
    value: "3",
  },
];

const users = [
  {
    initials: "JV",
    color: "#e8c9a0",
    name: "Julian Veldt",
    handle: "@julianv",
    email: "julian.veldt@slowliving.com",
    role: "ADMIN",
    joinDate: "Oct 12, 2023",
    status: "Active",
    highlight: false,
  },
  {
    initials: "ER",
    color: "#c9b8dc",
    name: "Elena Rossi",
    handle: "@elenar",
    email: "elena.r@lifestyle.com",
    role: "EDITOR",
    joinDate: "Jan 05, 2024",
    status: "Active",
    highlight: false,
  },
  {
    initials: "MT",
    color: "#dcd0b8",
    name: "Marcus Thorne",
    handle: "@mthorne",
    email: "m.thorne@provider.net",
    role: "SUBSCRIBER",
    joinDate: "Feb 14, 2024",
    status: "Active",
    highlight: false,
  },
  {
    initials: "LS",
    color: "#c5c2d6",
    name: "Liam Smith",
    handle: "@lsmith_01",
    email: "liam.smith@example.org",
    role: "SUBSCRIBER",
    joinDate: "Nov 20, 2023",
    status: "Blocked",
    highlight: true,
  },
];

const ManageUsers = () => {
  return (
    <div className={styles.content}>
      {/* Heading */}
      <div className={`d-flex justify-content-between align-items-start flex-wrap gap-3 ${styles.headingRow}`}>
        <div>
          <h2 className={styles.pageTitle}>Manage Users</h2>
          <p className={styles.pageSubtitle}>
            Overview and moderation of the blog community.
          </p>
        </div>
        <div className="d-flex align-items-center gap-3">
          <button className={`d-flex align-items-center ${styles.exportBtn}`}>
            <BsDownload className="me-2" />
            Export List
          </button>
          <button className={`d-flex align-items-center ${styles.addBtn}`}>
            <BsPersonPlusFill className="me-2" />
            Add New User
          </button>
        </div>
      </div>

      {/* Stat cards */}
      <div className="row g-4 mb-4">
        {statCards.map((card, index) => (
          <div className="col-12 col-sm-6 col-xl-3" key={index}>
            <div className={`d-flex align-items-center gap-3 ${styles.statCard}`}>
              <div
                className={styles.statIcon}
                style={{ backgroundColor: card.iconBg, color: card.iconColor }}
              >
                {card.icon}
              </div>
              <div>
                <p className={styles.statLabel}>{card.label}</p>
                <h3 className={styles.statValue}>{card.value}</h3>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Registered users table */}
      <div className={styles.tableCard}>
        <div className={`d-flex justify-content-between align-items-center ${styles.tableHeader}`}>
          <h6 className={styles.tableTitle}>REGISTERED USERS</h6>
          <div className="d-flex align-items-center gap-3">
            <BsFilter className={styles.headerIcon} />
            <BsThreeDotsVertical className={styles.headerIcon} />
          </div>
        </div>

        <div className="table-responsive">
          <table className={`table mb-0 ${styles.usersTable}`}>
            <thead>
              <tr>
                <th>NAME</th>
                <th>EMAIL</th>
                <th>ROLE</th>
                <th>JOIN DATE</th>
                <th>STATUS</th>
                <th>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={index} className={user.highlight ? styles.rowHighlight : ""}>
                  <td>
                    <div className="d-flex align-items-center gap-3">
                      <div
                        className={styles.avatar}
                        style={{ backgroundColor: user.color }}
                      >
                        {user.initials}
                      </div>
                      <div>
                        <p className={styles.userName}>{user.name}</p>
                        <p className={styles.userHandle}>{user.handle}</p>
                      </div>
                    </div>
                  </td>
                  <td className={styles.emailCell}>{user.email}</td>
                  <td>
                    <span className={styles.roleBadge}>{user.role}</span>
                  </td>
                  <td className={styles.dateCell}>{user.joinDate}</td>
                  <td>
                    <span
                      className={`d-flex align-items-center ${styles.statusText} ${
                        user.status === "Active" ? styles.statusActive : styles.statusBlocked
                      }`}
                    >
                      <span className={styles.statusDot}></span>
                      {user.status}
                    </span>
                  </td>
                  <td>
                    <BsThreeDotsVertical className={styles.actionsIcon} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className={`d-flex justify-content-between align-items-center ${styles.paginationRow}`}>
          <span className={styles.showingText}>Showing 1 to 4 of 1,284 users</span>
          <div className="d-flex align-items-center gap-2">
            <button className={styles.pageBtn}>
              <BsChevronLeft />
            </button>
            <button className={`${styles.pageBtn} ${styles.pageBtnActive}`}>1</button>
            <button className={styles.pageBtn}>2</button>
            <button className={styles.pageBtn}>3</button>
            <span className={styles.pageDots}>...</span>
            <button className={styles.pageBtn}>
              <BsChevronRight />
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className={`d-flex justify-content-between align-items-center flex-wrap gap-2 ${styles.footer}`}>
        <p className={styles.footerCopy}>© 2024 SlowLiving Blog. All rights reserved.</p>
        <div className={styles.footerLinks}>
          <a href="#">Terms of Service</a>
          <a href="#">Privacy Policy</a>
          <a href="#">Support</a>
        </div>
      </div>
    </div>
  );
};

export default ManageUsers;