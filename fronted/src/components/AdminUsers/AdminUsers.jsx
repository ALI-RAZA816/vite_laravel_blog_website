import AdminLayout from "../AdminLayout/AdminLayout.jsx";
import styles from "./AdminUsers.module.css";

const stats = [
  { icon: "\u{1F465}", label: "TOTAL USERS", value: "1,284" },
  { icon: "\u2699", label: "EDITORS", value: "12" },
  { icon: "\u{1F4C8}", label: "NEW THIS WEEK", value: "+42" },
  { icon: "\u{1F6AB}", label: "BLOCKED", value: "3" },
];

const users = [
  { name: "Julian Veldt", handle: "@julianv", email: "julian.veldt@slowliving.com", role: "ADMIN", join: "Oct 12, 2023", status: "Active" },
  { name: "Elena Rossi", handle: "@elenar", email: "elena.r@lifestyle.com", role: "EDITOR", join: "Jan 05, 2024", status: "Active" },
  { name: "Marcus Thorne", handle: "@mthorne", email: "m.thorne@provider.net", role: "SUBSCRIBER", join: "Feb 14, 2024", status: "Active" },
  { name: "Liam Smith", handle: "@lsmith_01", email: "liam.smith@example.org", role: "SUBSCRIBER", join: "Nov 20, 2023", status: "Blocked" },
];

export default function AdminUsers() {
  return (
    <AdminLayout active="users" searchPlaceholder="Search users by name or email..." userName="Admin User">
      <div className={styles.headerRow}>
        <div>
          <h1>Manage Users</h1>
          <p>Overview and moderation of the blog community.</p>
        </div>
        <div className={styles.headerActions}>
          <button className={styles.exportBtn}>&#8681; Export List</button>
          <button className={styles.addBtn}>+ Add New User</button>
        </div>
      </div>

      <div className="row">
        {stats.map((s, i) => (
          <div className="col-md-3" key={i}>
            <div className={styles.statCard}>
              <span className={styles.statIcon}>{s.icon}</span>
              <div>
                <p className={styles.statLabel}>{s.label}</p>
                <h3 className={styles.statValue}>{s.value}</h3>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className={styles.tableCard}>
        <div className={styles.tableHeader}>
          <h5>REGISTERED USERS</h5>
          <span>&#9776; &#8942;</span>
        </div>
        <table className={styles.table}>
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
            {users.map((u, i) => (
              <tr key={i} className={u.status === "Blocked" ? styles.blockedRow : ""}>
                <td>
                  <div className={styles.nameCell}>
                    <span className={styles.avatar}>
                      {u.name.split(" ").map((n) => n[0]).join("")}
                    </span>
                    <div>
                      <p className={styles.name}>{u.name}</p>
                      <span className={styles.handle}>{u.handle}</span>
                    </div>
                  </div>
                </td>
                <td>{u.email}</td>
                <td><span className={styles.rolePill}>{u.role}</span></td>
                <td>{u.join}</td>
                <td>
                  <span className={u.status === "Active" ? styles.active : styles.blocked}>
                    &bull; {u.status}
                  </span>
                </td>
                <td></td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className={styles.pagination}>
          <span>Showing 1 to 4 of 1,284 users</span>
          <div className={styles.pageButtons}>
            <button>&lsaquo;</button>
            <button className={styles.pageActive}>1</button>
            <button>2</button>
            <button>3</button>
            <span>...</span>
            <button>&rsaquo;</button>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
