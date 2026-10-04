import React, { useContext, useRef } from "react";
import {
  BsPersonPlusFill,
  BsPeopleFill,
  BsShieldFillCheck,
  BsGraphUpArrow,
  BsSlashCircleFill,
  BsChevronLeft,
  BsChevronRight,
} from "react-icons/bs";
import styles from "../assets/ManageUsers.module.css";
import { MdOutlineModeEdit } from "react-icons/md";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { AppContext } from "../Context/AppContext";
import { useUser } from "../Context/UserContext";
import { Link } from "react-router-dom";
import { baseUrl } from "../Http/Http";
import NoUsers from "../components/NoUsers";
import LoadingSpinner from "../components/LoadingSpinner";

// Naam se initials (single word naam par bhi crash nahi karega)
const getInitials = (name = '') =>
  name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0])
    .join('')
    .toUpperCase();

// 1000 se bade numbers ko 1.2k format mein
const formatCount = (n) => (n <= 1000 ? `${n}` : `${(n / 1000).toFixed(1)}k`);

// Role aur status ki classes (pehle lambi inline-style chains thin)
const roleClass = {
  admin: styles.roleAdmin,
  editor: styles.roleEditor,
  author: styles.roleAuthor,
  user: styles.roleUser,
};

const statusClass = {
  active: styles.statusActive,
  blocked: styles.statusBlocked,
  inactive: styles.statusInactive,
};

const ManageUsers = () => {

  const {
    allUsers,
    totalUsers,
    pagination,
    currentPage,
    setCurrentPage,
    thisWeek,
    Blocked,
    allEditors,
    setSearchTerm,
    loggedUser,
    spinnerLoader
  } = useUser();
  const { DeleteModelHandler } = useContext(AppContext);
  const canManage = loggedUser?.role !== 'editor';

  // Soft accent colors: pehla neutral, baqi teen apne rang mein
  const statCards = [
    {
      icon: <BsPeopleFill />,
      iconBg: "#111111",
      iconColor: "#ffffff",
      label: "TOTAL USERS",
      value: formatCount(totalUsers.length),
    },
    {
      icon: <BsShieldFillCheck />,
      iconBg: "#eaf1ff",
      iconColor: "#2563eb",
      label: "EDITORS",
      value: formatCount(allEditors.length),
    },
    {
      icon: <BsGraphUpArrow />,
      iconBg: "#e5f6ec",
      iconColor: "#16a34a",
      label: "NEW THIS WEEK",
      value: formatCount(thisWeek.length),
    },
    {
      icon: <BsSlashCircleFill />,
      iconBg: "#fdeaee",
      iconColor: "#e11d48",
      label: "BLOCKED",
      value: formatCount(Blocked.length),
    },
  ];

  // Search, role aur status teeno ek hi debounce use karte hain
  const searchTimeout = useRef(null);
  const debouncedSearch = (event) => {
    const searchTerm = event.target.value;
    clearTimeout(searchTimeout.current);
    searchTimeout.current = setTimeout(() => {
      setSearchTerm(searchTerm);
    }, 600);
  };

  const pages = [];
  const start = Math.max(1, pagination.currentPage - 2);
  const end = Math.min(pagination.lastPage, pagination.currentPage + 2);
  if (start > 1) {
    pages.push(1);
    if (start > 2) pages.push('...');
  }

  for (let i = start; i <= end; i++) {
    pages.push(i);
  }

  if (end < pagination.lastPage) {
    if (end < pagination.lastPage - 1) pages.push("...");
    pages.push(pagination.lastPage);
  }

  return (
    <div className={styles.usersPage}>
      {/* Heading */}
      <div className={`d-flex justify-content-between align-items-start flex-wrap gap-3 ${styles.headingRow}`}>
        <div>
          <h2 className={styles.pageTitle}>Manage Users</h2>
          <p className={styles.pageSubtitle}>
            Overview and moderation of the blog community.
          </p>
        </div>
        <div className="d-flex align-items-center gap-3">
          {canManage && (
            <Link to="/admin-panel/users/add-new-user">
              <button className={`d-flex align-items-center ${styles.addBtn}`}>
                <BsPersonPlusFill className="me-2" />
                Add New User
              </button>
            </Link>
          )}
        </div>
      </div>

      {/* Stat cards */}
      <div className="row g-4 mb-4">
        {statCards.map((card) => (
          <div className="col-12 col-sm-6 col-xl-3" key={card.label}>
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
        <div className={`d-flex justify-content-between align-items-center flex-wrap gap-3 ${styles.tableHeader}`}>
          <h6 className={styles.tableTitle}>Registered users</h6>
          <div className={`d-flex align-items-center flex-wrap gap-3 ${styles.filters}`}>
            <input
              type="text"
              onChange={debouncedSearch}
              className={styles.searchInput}
              placeholder="Search user, email"
              aria-label="Search users"
            />
            <select onChange={debouncedSearch} className={styles.filterSelect} aria-label="Filter by role">
              <option value="all">Role: All</option>
              <option value="editor">Editor</option>
              <option value="admin">Admin</option>
              <option value="user">User</option>
              <option value="author">Author</option>
            </select>
            <select onChange={debouncedSearch} className={styles.filterSelect} aria-label="Filter by status">
              <option value="all">Status: All</option>
              <option value="blocked">Blocked</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
        </div>

        <div className="table-responsive bg-white">
          {spinnerLoader ? (
            <div style={{ height: '480px' }} className="d-flex justify-content-center align-items-center"><LoadingSpinner /></div>
          ) : allUsers.length === 0 ? (
            <div className="p-3"><NoUsers /></div>
          ) : (
            <table className={`table mb-0 ${styles.usersTable}`}>
              <thead>
                <tr>
                  <th>NAME</th>
                  <th>EMAIL</th>
                  <th>ROLE</th>
                  <th>JOIN DATE</th>
                  <th>STATUS</th>
                  {canManage && <th>ACTIONS</th>}
                </tr>
              </thead>
              <tbody>
                {allUsers.map((user, index) => (
                  <tr key={user.id ?? index} className={user.highlight ? styles.rowHighlight : ""}>
                    <td>
                      <div className="d-flex align-items-center gap-3">
                        <div className={styles.avatar}>
                          {user.image ? (
                            <img src={`${baseUrl}/uploads/${user.image}`} alt="" />
                          ) : (
                            getInitials(user.name)
                          )}
                        </div>
                        <p className={styles.memberName}>{user.name}</p>
                      </div>
                    </td>
                    <td className={styles.emailCell}>{user.email}</td>
                    <td>
                      <span className={`${styles.roleBadge} ${roleClass[user.role] ?? ''} text-capitalize`}>
                        {user.role}
                      </span>
                    </td>
                    <td className={styles.dateCell}>{user.join_date}</td>
                    <td>
                      <span
                        className={`d-flex align-items-center text-capitalize ${styles.statusText} ${
                          statusClass[String(user.status).toLowerCase()] ?? styles.statusInactive
                        }`}
                      >
                        <span className={styles.statusDot}></span>
                        <span>{user.status}</span>
                      </span>
                    </td>
                    {canManage && (
                      <td>
                        <div className="d-flex align-items-center gap-3">
                          <Link to={`/admin-panel/users/edituser/${user.id}`} className={styles.actionIcon} aria-label="Edit user">
                            <MdOutlineModeEdit />
                          </Link>
                          <button
                            type="button"
                            className={`${styles.actionIcon} ${styles.deleteBtn}`}
                            disabled={user.role === 'admin'}
                            onClick={() => DeleteModelHandler(user.id)}
                            aria-label="Delete user"
                          >
                            <RiDeleteBin5Fill />
                          </button>
                        </div>
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* Pagination */}
        {pagination.lastPage > 0 && (
          <div className={`d-flex justify-content-between align-items-center ${styles.paginationRow}`}>
            <span className={styles.showingText}>
              Showing {pagination.from} to {pagination.to} of {pagination.total} users
            </span>
            <div className="d-flex align-items-center gap-2">
              <button
                disabled={pagination.currentPage === 1}
                onClick={() => setCurrentPage(pagination.currentPage - 1)}
                className={styles.pageBtn}
              >
                <BsChevronLeft />
              </button>
              {pages.map((page, index) => (
                page === '...' ? (
                  <span key={`dots-${index}`} className={styles.pageDots}>...</span>
                ) : (
                  <button
                    key={`page-${page}`}
                    onClick={() => setCurrentPage(page)}
                    className={`${styles.pageBtn} ${currentPage === page ? styles.pageBtnActive : ''}`}
                  >
                    {page}
                  </button>
                )
              ))}
              <button
                onClick={() => setCurrentPage(pagination.currentPage + 1)}
                disabled={pagination.currentPage === pagination.lastPage}
                className={styles.pageBtn}
              >
                <BsChevronRight />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className={`d-flex justify-content-between align-items-center flex-wrap gap-2 ${styles.pageFooter}`}>
        <p className={styles.footerCopy}>© {new Date().getFullYear()} SlowLiving Blog. All rights reserved.</p>
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