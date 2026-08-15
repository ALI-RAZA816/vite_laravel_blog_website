import React from "react";
import {
  BsPlusLg,
  BsChevronDown,
  BsFilter,
  BsChevronLeft,
  BsChevronRight,
  BsPencilFill,
  BsTrashFill,
  BsStars,
} from "react-icons/bs";
import styles from "../assets/AdminPosts.module.css";
import { Link } from "react-router-dom";

const posts = [
  {
    title: "The Art of Mindful Morning Rituals",
    url: "slowliving-blog.com/morning-rituals",
    category: "Philosophy",
    categoryColor: "#f7d774",
    author: "Alex Rivera",
    initials: "AR",
    avatarColor: "#5b3fd9",
    status: "Published",
    date: "May 12, 2024",
  },
  {
    title: "Why We Need to Disconnect in a Digital Age",
    url: "slowliving-blog.com/digital-age",
    category: "Minimalism",
    categoryColor: "#c9b8f0",
    author: "Sarah Chen",
    initials: "SC",
    avatarColor: "#7a6ee0",
    status: "Draft",
    date: "May 10, 2024",
  },
  {
    title: "Hidden Gems of Rural Tuscany",
    url: "slowliving-blog.com/tuscany-travel",
    category: "Travel",
    categoryColor: "#f0b8c4",
    author: "Marcus King",
    initials: "MK",
    avatarColor: "#c98a1a",
    status: "Published",
    date: "May 08, 2024",
  },
  {
    title: "Sustainable Living: Small Steps to Big Impact",
    url: "slowliving-blog.com/sustainable-living",
    category: "Minimalism",
    categoryColor: "#c9b8f0",
    author: "Alex Rivera",
    initials: "AR",
    avatarColor: "#5b3fd9",
    status: "Published",
    date: "May 05, 2024",
  },
];

const chartData = [30, 45, 40, 90, 55, 48, 62];

const AdminPosts = () => {
  const maxValue = Math.max(...chartData);

  return (
    <div className={styles.content}>
      {/* Heading */}
      <div className="d-flex justify-content-between align-items-start mb-4">
        <div>
          <h2 className={styles.pageTitle}>Manage Posts</h2>
          <div className={styles.breadcrumb}>
            <span>Dashboard</span>
            <span className={styles.crumbSep}>›</span>
            <span className={styles.crumbActive}>Posts</span>
          </div>
        </div>
        <button className={`d-flex align-items-center ${styles.addBtn}`}>
          <BsPlusLg className="me-2" />
          Add New Post
        </button>
      </div>

      {/* Filters */}
      <div className={`d-flex flex-wrap align-items-center gap-3 ${styles.filterBar}`}>
        <div className={`d-flex align-items-center ${styles.selectBox}`}>
          <span>Bulk Actions</span>
          <BsChevronDown className={styles.selectIcon} />
        </div>
        <button className={styles.applyBtn}>Apply</button>
        <div className={`d-flex align-items-center ${styles.selectBox}`}>
          <span>All Categories</span>
          <BsFilter className={styles.selectIcon} />
        </div>
        <div className={styles.statusTabs}>
          <span className={`${styles.statusTab} ${styles.statusTabActive}`}>All</span>
          <span className={styles.statusTab}>Published</span>
          <span className={styles.statusTab}>Draft</span>
        </div>
      </div>

      {/* Table */}
      <div className={styles.tableCard}>
        <div className="table-responsive">
          <table className={`table mb-0 ${styles.postsTable}`}>
            <thead>
              <tr>
                <th style={{ width: "40px" }}>
                  <input type="checkbox" className={styles.checkbox} />
                </th>
                <th>POST TITLE</th>
                <th>CATEGORY</th>
                <th>AUTHOR</th>
                <th>STATUS</th>
                <th>DATE</th>
                <th>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {posts.map((post, index) => (
                <tr key={index}>
                  <td>
                    <input type="checkbox" className={styles.checkbox} />
                  </td>
                  <td>
                    <p className={styles.postTitle}>{post.title}</p>
                    <p className={styles.postUrl}>{post.url}</p>
                  </td>
                  <td>
                    <span
                      className={styles.categoryBadge}
                      style={{ backgroundColor: post.categoryColor }}
                    >
                      {post.category}
                    </span>
                  </td>
                  <td>
                    <div className="d-flex align-items-center gap-2">
                      <div
                        className={styles.avatar}
                        style={{ backgroundColor: post.avatarColor }}
                      >
                        {post.initials}
                      </div>
                      <span className={styles.authorName}>{post.author}</span>
                    </div>
                  </td>
                  <td>
                    <span
                      className={`d-flex align-items-center ${styles.statusBadge} ${
                        post.status === "Published"
                          ? styles.statusPublished
                          : styles.statusDraft
                      }`}
                    >
                      <span className={styles.statusDot}></span>
                      {post.status}
                    </span>
                  </td>
                  <td className={styles.dateCell}>{post.date}</td>
                  <td>
                    <div className="d-flex align-items-center gap-3">
                      <Link to="/admin-panel/posts/add-post"><BsPencilFill className={styles.actionIcon} /></Link>
                      <BsTrashFill className={`${styles.actionIcon} ${styles.deleteIcon}`} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className={`d-flex justify-content-between align-items-center ${styles.paginationRow}`}>
          <span className={styles.showingText}>Showing 1 to 4 of 24 posts</span>
          <div className="d-flex align-items-center gap-2">
            <button className={styles.pageBtn}>
              <BsChevronLeft />
            </button>
            <button className={`${styles.pageBtn} ${styles.pageBtnActive}`}>1</button>
            <button className={styles.pageBtn}>2</button>
            <button className={styles.pageBtn}>3</button>
            <span className={styles.pageDots}>...</span>
            <button className={styles.pageBtn}>6</button>
            <button className={styles.pageBtn}>
              <BsChevronRight />
            </button>
          </div>
        </div>
      </div>

      {/* Bottom panels */}
      <div className="row g-4 mt-1">
        <div className="col-12 col-lg-7">
          <div className={styles.velocityCard}>
            <h5 className={styles.velocityTitle}>Content Velocity</h5>
            <p className={styles.velocitySubtitle}>
              Your publishing frequency is up 12% this month.
            </p>
            <div className={styles.velocityChart}>
              {chartData.map((value, index) => (
                <div
                  key={index}
                  className={`${styles.velocityBar} ${
                    index === 3 ? styles.velocityBarActive : ""
                  }`}
                  style={{ height: `${(value / maxValue) * 100}%` }}
                ></div>
              ))}
            </div>
          </div>
        </div>

        <div className="col-12 col-lg-5">
          <div className={styles.aiCard}>
            <div className={styles.aiIcon}>
              <BsStars />
            </div>
            <h5 className={styles.aiTitle}>AI Suggestions</h5>
            <p className={styles.aiText}>
              Generate SEO optimized meta descriptions for your drafts automatically.
            </p>
            <button className={styles.aiBtn}>Try Magic Write</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPosts;