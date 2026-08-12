import { useState } from "react";
import AdminLayout from "../AdminLayout/AdminLayout.jsx";
import styles from "./AdminComments.module.css";

const comments = [
  {
    name: "Elena Vance",
    email: "elena.v@example.com",
    excerpt: '"This piece on slow mornings real...',
    post: "The Art of the Slow Morning",
    status: "PENDING",
    date: "Oct 24, 2023",
  },
  {
    name: "Dr. Julian Reed",
    email: "j.reed@university.edu",
    excerpt: "\"Excellent citations. It's rare to se...",
    post: "Neuroscience of Focus",
    status: "APPROVED",
    date: "Oct 22, 2023",
  },
  {
    name: "Bot_User_99",
    email: "spam@domain.net",
    excerpt: '"BUY CHEAP COFFEE NOW AT H...',
    post: "Coffee Roasting Tips",
    status: "SPAM",
    date: "Oct 21, 2023",
  },
  {
    name: "Marcus Thorne",
    email: "m.thorne@design.co",
    excerpt: "\"I'd love to see a follow-up on mi...",
    post: "Simplicity at Work",
    status: "APPROVED",
    date: "Oct 20, 2023",
  },
];

const statusClass = {
  PENDING: styles.pending,
  APPROVED: styles.approved,
  SPAM: styles.spam,
};

export default function AdminComments() {
  const [tab, setTab] = useState("all");

  return (
    <AdminLayout
      active="comments"
      searchPlaceholder="Search comments..."
      userName="Admin User"
      userRole="Editor-in-Chief"
      userAvatar="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100"
    >
      <div className={styles.headerRow}>
        <div>
          <h1>Manage Comments</h1>
          <p>Review and moderate user interactions across your blog.</p>
        </div>
        <div className={styles.tabs}>
          <span className={tab === "all" ? styles.tabActive : styles.tab} onClick={() => setTab("all")}>All (128)</span>
          <span className={tab === "pending" ? styles.tabActive : styles.tab} onClick={() => setTab("pending")}>Pending (12)</span>
          <span className={tab === "approved" ? styles.tabActive : styles.tab} onClick={() => setTab("approved")}>Approved (104)</span>
          <span className={tab === "spam" ? styles.tabActive : styles.tab} onClick={() => setTab("spam")}>Spam (12)</span>
        </div>
      </div>

      <div className={styles.tableCard}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Author</th>
              <th>Comment Excerpt</th>
              <th>On Post</th>
              <th>Status</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {comments.map((c, i) => (
              <tr key={i} className={c.status === "SPAM" ? styles.spamRow : ""}>
                <td>
                  <div className={styles.authorCell}>
                    <span className={styles.avatar}>
                      {c.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                    </span>
                    <div>
                      <p className={styles.name}>{c.name}</p>
                      <span className={styles.email}>{c.email}</span>
                    </div>
                  </div>
                </td>
                <td className={styles.excerpt}>{c.excerpt}</td>
                <td className={styles.postLink}>{c.post}</td>
                <td><span className={statusClass[c.status]}>{c.status}</span></td>
                <td>{c.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className={styles.pagination}>
        <span>Showing 1 to 10 of 128 comments</span>
        <div className={styles.pageButtons}>
          <button>&lsaquo;</button>
          <button className={styles.pageActive}>1</button>
          <button>2</button>
          <button>3</button>
          <button>&rsaquo;</button>
        </div>
      </div>
    </AdminLayout>
  );
}
