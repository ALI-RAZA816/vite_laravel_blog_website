import { Link } from "react-router-dom";
import AdminLayout from "../AdminLayout/AdminLayout.jsx";
import styles from "./AdminPosts.module.css";

const posts = [
  {
    title: "The Art of Mindful Morning Rituals",
    url: "slowliving-blog.com/morning-rituals",
    category: "Philosophy",
    author: "Alex Rivera",
    status: "Published",
    date: "May 12, 2024",
  },
  {
    title: "Why We Need to Disconnect in a Digital Age",
    url: "slowliving-blog.com/digital-age",
    category: "Minimalism",
    author: "Sarah Chen",
    status: "Draft",
    date: "May 10, 2024",
  },
  {
    title: "Hidden Gems of Rural Tuscany",
    url: "slowliving-blog.com/tuscany-travel",
    category: "Travel",
    author: "Marcus King",
    status: "Published",
    date: "May 08, 2024",
  },
  {
    title: "Sustainable Living: Small Steps to Big Impact",
    url: "slowliving-blog.com/sustainable-living",
    category: "Minimalism",
    author: "Alex Rivera",
    status: "Published",
    date: "May 05, 2024",
  },
];

export default function AdminPosts() {
  return (
    <AdminLayout
      active="posts"
      searchPlaceholder="Search posts..."
      userName="Alex Rivera"
      userRole="Chief Editor"
      userAvatar="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100"
    >
      <div className={styles.headerRow}>
        <div>
          <h1>Manage Posts</h1>
          <p className={styles.breadcrumb}>Dashboard &rsaquo; <strong>Posts</strong></p>
        </div>
        <Link to="/admin/posts/new" className={styles.addBtn}>+ Add New Post</Link>
      </div>

      <div className={styles.toolbar}>
        <select className={styles.select}>
          <option>Bulk Actions</option>
        </select>
        <button className={styles.applyBtn}>Apply</button>
        <select className={styles.select}>
          <option>All Categories</option>
        </select>
        <div className={styles.statusFilter}>
          <span className={styles.statusActive}>All</span>
          <span>Published</span>
          <span>Draft</span>
        </div>
      </div>

      <div className={styles.tableCard}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th><input type="checkbox" /></th>
              <th>POST TITLE</th>
              <th>CATEGORY</th>
              <th>AUTHOR</th>
              <th>STATUS</th>
              <th>DATE</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((p, i) => (
              <tr key={i}>
                <td><input type="checkbox" /></td>
                <td>
                  <p className={styles.postTitle}>{p.title}</p>
                  <span className={styles.postUrl}>{p.url}</span>
                </td>
                <td><span className={styles.categoryPill}>{p.category}</span></td>
                <td>
                  <div className={styles.authorCell}>
                    <span className={styles.authorAvatar}>
                      {p.author.split(" ").map((n) => n[0]).join("")}
                    </span>
                    {p.author}
                  </div>
                </td>
                <td>
                  <span className={p.status === "Published" ? styles.published : styles.draft}>
                    &bull; {p.status}
                  </span>
                </td>
                <td>{p.date}</td>
                <td className={styles.actionsCell}>
                  <span>&#9998;</span>
                  <span>&#128465;</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className={styles.pagination}>
          <span>Showing 1 to 4 of 24 posts</span>
          <div className={styles.pageButtons}>
            <button>&lsaquo;</button>
            <button className={styles.pageActive}>1</button>
            <button>2</button>
            <button>3</button>
            <span>...</span>
            <button>6</button>
            <button>&rsaquo;</button>
          </div>
        </div>
      </div>

      <div className="row mt-4">
        <div className="col-md-7">
          <div className={styles.velocityCard}>
            <h5>Content Velocity</h5>
            <p>Your publishing frequency is up 12% this month.</p>
          </div>
        </div>
        <div className="col-md-5">
          <div className={styles.aiCard}>
            <div className={styles.sparkle}>&#10024;</div>
            <h5>AI Suggestions</h5>
            <p>Generate SEO optimized meta descriptions for your drafts automatically.</p>
            <button>Try Magic Write</button>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
