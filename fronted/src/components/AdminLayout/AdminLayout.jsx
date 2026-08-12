import { Link } from "react-router-dom";
import styles from "./AdminLayout.module.css";

const navItems = [
  { key: "dashboard", label: "Dashboard", icon: "\u25A6", to: "/admin/dashboard" },
  { key: "posts", label: "Posts", icon: "\u{1F4C4}", to: "/admin/posts" },
  { key: "categories", label: "Categories", icon: "\u{1F5C2}", to: "/admin/categories" },
  { key: "comments", label: "Comments", icon: "\u{1F4AC}", to: "/admin/comments" },
  { key: "users", label: "Users", icon: "\u{1F465}", to: "/admin/users" },
  { key: "media", label: "Media", icon: "\u{1F5BC}", to: "/admin/media" },
  { key: "settings", label: "Settings", icon: "\u2699", to: "/admin/settings" },
];

export default function AdminLayout({
  active,
  searchPlaceholder = "Search...",
  userName = "Admin User",
  userRole = "",
  userAvatar,
  children,
}) {
  return (
    <div className={styles.wrapper}>
      <aside className={styles.sidebar}>
        <div>
          <div className={styles.brand}>
            <h2>Admin Workspace</h2>
            <span>Management Portal</span>
          </div>
          <nav className={styles.nav}>
            {navItems.map((item) => (
              <Link
                key={item.key}
                to={item.to}
                className={item.key === active ? styles.navItemActive : styles.navItem}
              >
                <span className={styles.navIcon}>{item.icon}</span>
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
        <Link to="/admin/login" className={styles.logout}>
          <span className={styles.navIcon}>&#8618;</span> Logout
        </Link>
      </aside>

      <div className={styles.main}>
        <div className={styles.topbar}>
          <div className={styles.searchWrap}>
            <span>&#128269;</span>
            <input type="text" placeholder={searchPlaceholder} />
          </div>
          <div className={styles.topbarRight}>
            <span className={styles.bell}>&#128276;</span>
            {userAvatar && <img src={userAvatar} alt={userName} className={styles.avatar} />}
            <div className={styles.userInfo}>
              <span className={styles.userName}>{userName}</span>
              {userRole && <span className={styles.userRole}>{userRole}</span>}
            </div>
          </div>
        </div>
        <div className={styles.content}>{children}</div>
      </div>
    </div>
  );
}
