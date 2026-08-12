import AdminLayout from "../AdminLayout/AdminLayout.jsx";
import styles from "./AdminDashboard.module.css";

const stats = [
  { icon: "\u{1F4C4}", label: "Total Posts", value: "1,284", change: "+12%", changeType: "up" },
  { icon: "\u{1F4AC}", label: "Total Comments", value: "8,432", change: "+5%", changeType: "up" },
  { icon: "\u{1F465}", label: "Total Users", value: "24,501", change: "Stable", changeType: "neutral" },
  { icon: "\u{1F441}", label: "Total Views", value: "942k", change: "+24%", changeType: "up" },
];

const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];
const heights = [40, 55, 48, 70, 62, 90];

const comments = [
  { name: "Sarah Jenkins", text: '"The piece on slow living really...' },
  { name: "Mark Thompson", text: '"Can you share the camera settin...' },
  { name: "Elena R.", text: '"Great article, shared with my...' },
];

const recentPosts = [
  { title: "The Art of Ritual: Morning Coffee", status: "PUBLISHED", author: "Alex Rivera", date: "Oct 12, 2024" },
  { title: "Curating a Minimalist Living Room", status: "DRAFT", author: "Sophie Chen", date: "Oct 10, 2024" },
];

export default function AdminDashboard() {
  return (
    <AdminLayout
      active="dashboard"
      searchPlaceholder="Search data, posts, users..."
      userName="Alex Rivera"
      userRole="Editor in Chief"
      userAvatar="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100"
    >
      <div className={styles.headerRow}>
        <div>
          <h1>System Overview</h1>
          <p>Welcome back. Here's what happened in the last 24 hours.</p>
        </div>
        <button className={styles.createBtn}>+ Create Post</button>
      </div>

      <div className="row">
        {stats.map((s, i) => (
          <div className="col-md-3" key={i}>
            <div className={styles.statCard}>
              <div className={styles.statTop}>
                <span className={styles.statIcon}>{s.icon}</span>
                <span
                  className={
                    s.changeType === "up"
                      ? styles.changeUp
                      : s.changeType === "neutral"
                      ? styles.changeNeutral
                      : styles.changeDown
                  }
                >
                  {s.change}
                </span>
              </div>
              <p className={styles.statLabel}>{s.label}</p>
              <h3 className={styles.statValue}>{s.value}</h3>
            </div>
          </div>
        ))}
      </div>

      <div className="row mt-3">
        <div className="col-lg-8">
          <div className={styles.chartCard}>
            <div className={styles.chartHeader}>
              <h5>VIEWS PER MONTH</h5>
              <span>Last 6 Months &#9662;</span>
            </div>
            <div className={styles.chart}>
              {months.map((m, i) => (
                <div className={styles.barCol} key={m}>
                  <div
                    className={i === heights.length - 1 ? styles.barActive : styles.bar}
                    style={{ height: `${heights[i]}%` }}
                  ></div>
                  <span>{m}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="col-lg-4">
          <div className={styles.commentsCard}>
            <h5>RECENT COMMENTS</h5>
            {comments.map((c, i) => (
              <div className={styles.commentItem} key={i}>
                <div className={styles.commentAvatar}></div>
                <div>
                  <p className={styles.commentName}>{c.name}</p>
                  <p className={styles.commentText}>{c.text}</p>
                  <div className={styles.commentActions}>
                    <span className={styles.approve}>Approve</span>
                    <span className={styles.reject}>Reject</span>
                  </div>
                </div>
              </div>
            ))}
            <button className={styles.viewAllBtn}>View All Comments</button>
          </div>
        </div>
      </div>

      <div className={styles.recentPostsCard}>
        <div className={styles.recentHeader}>
          <h5>RECENT POSTS</h5>
          <span>See full list</span>
        </div>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>TITLE</th>
              <th>STATUS</th>
              <th>AUTHOR</th>
              <th>DATE</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {recentPosts.map((p, i) => (
              <tr key={i}>
                <td>{p.title}</td>
                <td>
                  <span className={p.status === "PUBLISHED" ? styles.published : styles.draft}>
                    {p.status}
                  </span>
                </td>
                <td>{p.author}</td>
                <td>{p.date}</td>
                <td>&#8942;</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AdminLayout>
  );
}
