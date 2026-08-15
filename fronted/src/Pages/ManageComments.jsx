import React from "react";
import { BsChevronLeft, BsChevronRight, BsPersonFill } from "react-icons/bs";
import styles from "../assets/ManageComments.module.css";

const tabs = [
  { label: "All", count: 128, active: true },
  { label: "Pending", count: 12 },
  { label: "Approved", count: 104 },
  { label: "Spam", count: 12 },
];

const comments = [
  {
    initials: "EV",
    color: "#c9e4d8",
    name: "Elena Vance",
    email: "elena.v@example.com",
    excerpt: '"This piece on slow mornings real...',
    post: "The Art of the Slow Morning",
    status: "PENDING",
    date: "Oct 24, 2023",
    highlight: false,
    isBot: false,
  },
  {
    initials: "JR",
    color: "#c9d8ec",
    name: "Dr. Julian Reed",
    email: "j.reed@university.edu",
    excerpt: '"Excellent citations. It\'s rare to se...',
    post: "Neuroscience of Focus",
    status: "APPROVED",
    date: "Oct 22, 2023",
    highlight: false,
    isBot: false,
  },
  {
    initials: "",
    color: "#e2dff0",
    name: "Bot_User_99",
    email: "spam@domain.net",
    excerpt: '"BUY CHEAP COFFEE NOW AT H...',
    post: "Coffee Roasting Tips",
    status: "SPAM",
    date: "Oct 21, 2023",
    highlight: true,
    isBot: true,
  },
  {
    initials: "MT",
    color: "#dcd0e8",
    name: "Marcus Thorne",
    email: "m.thorne@design.co",
    excerpt: '"I\'d love to see a follow-up on mi...',
    post: "Simplicity at Work",
    status: "APPROVED",
    date: "Oct 20, 2023",
    highlight: false,
    isBot: false,
  },
];

const statusClass = {
  PENDING: "statusPending",
  APPROVED: "statusApproved",
  SPAM: "statusSpam",
};

const ManageComments = () => {
  return (
    <div className={styles.content}>
      {/* Heading + tabs */}
      <div className={`d-flex justify-content-between align-items-start flex-wrap gap-3 ${styles.headingRow}`}>
        <div>
          <h2 className={styles.pageTitle}>Manage Comments</h2>
          <p className={styles.pageSubtitle}>
            Review and moderate user interactions across your blog.
          </p>
        </div>
        <div className={styles.tabsWrap}>
          {tabs.map((tab, index) => (
            <span
              key={index}
              className={`${styles.tab} ${tab.active ? styles.tabActive : ""}`}
            >
              {tab.label} ({tab.count})
            </span>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className={styles.tableCard}>
        <div className="table-responsive">
          <table className={`table mb-0 ${styles.commentsTable}`}>
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
              {comments.map((c, index) => (
                <tr
                  key={index}
                  className={c.highlight ? styles.rowHighlight : ""}
                >
                  <td>
                    <div className="d-flex align-items-center gap-3">
                      <div
                        className={styles.avatar}
                        style={{ backgroundColor: c.color }}
                      >
                        {c.isBot ? (
                          <BsPersonFill color="#8b87a0" />
                        ) : (
                          c.initials
                        )}
                      </div>
                      <div>
                        <p className={styles.authorName}>{c.name}</p>
                        <p className={styles.authorEmail}>{c.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className={styles.excerptCell}>{c.excerpt}</td>
                  <td>
                    <a href="#" className={styles.postLink}>
                      {c.post}
                    </a>
                  </td>
                  <td>
                    <span
                      className={`${styles.statusBadge} ${
                        styles[statusClass[c.status]]
                      }`}
                    >
                      {c.status}
                    </span>
                  </td>
                  <td className={styles.dateCell}>{c.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className={`d-flex justify-content-between align-items-center ${styles.paginationRow}`}>
          <span className={styles.showingText}>Showing 1 to 10 of 128 comments</span>
          <div className="d-flex align-items-center gap-2">
            <button className={styles.pageBtn}>
              <BsChevronLeft />
            </button>
            <button className={`${styles.pageBtn} ${styles.pageBtnActive}`}>1</button>
            <button className={styles.pageBtn}>2</button>
            <button className={styles.pageBtn}>3</button>
            <button className={styles.pageBtn}>
              <BsChevronRight />
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className={styles.footer}>
        <h4 className={styles.footerBrand}>SlowLiving Blog</h4>
        <p className={styles.footerMeta}>Management Portal • Version 2.4.0</p>
        <div className={styles.footerLinks}>
          <a href="#">Terms of Service</a>
          <a href="#">Privacy Policy</a>
        </div>
        <p className={styles.footerCopy}>© 2024 SlowLiving Blog. All rights reserved.</p>
      </div>
    </div>
  );
};

export default ManageComments;