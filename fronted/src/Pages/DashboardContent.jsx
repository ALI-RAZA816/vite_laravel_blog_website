import React from "react";
import {
  BsFileEarmarkTextFill,
  BsChatSquareTextFill,
  BsPeopleFill,
  BsEyeFill,
  BsPlusLg,
} from "react-icons/bs";
import styles from "../assets/DashboardContent.module.css";

const statCards = [
  {
    icon: <BsFileEarmarkTextFill />,
    iconBg: "#ece9fb",
    iconColor: "#5b3fd9",
    badge: "+12%",
    badgeType: "positive",
    label: "Total Posts",
    value: "1,284",
  },
  {
    icon: <BsChatSquareTextFill />,
    iconBg: "#fdf3e0",
    iconColor: "#d99a1a",
    badge: "+5%",
    badgeType: "positive",
    label: "Total Comments",
    value: "8,432",
  },
  {
    icon: <BsPeopleFill />,
    iconBg: "#ece9fb",
    iconColor: "#5b3fd9",
    badge: "Stable",
    badgeType: "neutral",
    label: "Total Users",
    value: "24,501",
  },
  {
    icon: <BsEyeFill />,
    iconBg: "#fbe9e9",
    iconColor: "#d94f4f",
    badge: "+24%",
    badgeType: "positive",
    label: "Total Views",
    value: "942k",
  },
];

const chartData = [
  { month: "Jan", value: 45 },
  { month: "Feb", value: 62 },
  { month: "Mar", value: 55 },
  { month: "Apr", value: 82 },
  { month: "May", value: 74 },
  { month: "Jun", value: 100 },
];

const recentComments = [
  {
    initials: "SJ",
    color: "#f4b6c2",
    name: "Sarah Jenkins",
    text: '"The piece on slow living really...',
  },
  {
    initials: "MT",
    color: "#a9c9e8",
    name: "Mark Thompson",
    text: '"Can you share the camera settin...',
  },
  {
    initials: "ER",
    color: "#cfd6e6",
    name: "Elena R.",
    text: '"Great article, shared with my...',
  },
];

const recentPosts = [
  {
    title: "The Art of Ritual: Morning Coffee",
    status: "PUBLISHED",
    author: "Alex Rivera",
    date: "Oct 12, 2024",
  },
  {
    title: "Curating a Minimalist Living Room",
    status: "DRAFT",
    author: "Sophie Chen",
    date: "Oct 10, 2024",
  },
];

const DashboardContent = () => {
  const maxValue = Math.max(...chartData.map((d) => d.value));

  return (
    <div className={styles.content}>
      {/* Page heading */}
      <div className={`d-flex justify-content-between align-items-start ${styles.headingRow}`}>
        <div>
          <h2 className={styles.pageTitle}>System Overview</h2>
          <p className={styles.pageSubtitle}>
            Welcome back. Here's what happened in the last 24 hours.
          </p>
        </div>
        <button className={`d-flex align-items-center ${styles.createBtn}`}>
          <BsPlusLg className="me-2" />
          Create Post
        </button>
      </div>

      {/* Stat cards */}
      <div className="row g-4">
        {statCards.map((card, index) => (
          <div className="col-12 col-sm-6 col-xl-3" key={index}>
            <div className={styles.statCard}>
              <div className="d-flex justify-content-between align-items-center mb-3">
                <div
                  className={styles.statIcon}
                  style={{ backgroundColor: card.iconBg, color: card.iconColor }}
                >
                  {card.icon}
                </div>
                <span
                  className={`${styles.badge} ${
                    card.badgeType === "positive" ? styles.badgePositive : styles.badgeNeutral
                  }`}
                >
                  {card.badge}
                </span>
              </div>
              <p className={styles.statLabel}>{card.label}</p>
              <h3 className={styles.statValue}>{card.value}</h3>
            </div>
          </div>
        ))}
      </div>

      {/* Chart + Recent Comments */}
      <div className="row g-4 mt-1">
        <div className="col-12 col-xl-8">
          <div className={styles.panel}>
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h6 className={styles.panelTitle}>VIEWS PER MONTH</h6>
              <select className={styles.rangeSelect} defaultValue="Last 6 Months">
                <option>Last 6 Months</option>
                <option>Last 12 Months</option>
                <option>This Year</option>
              </select>
            </div>
            <div className={styles.chart}>
              {chartData.map((bar, index) => (
                <div className={styles.chartCol} key={index}>
                  <div
                    className={`${styles.chartBar} ${
                      index === chartData.length - 1 ? styles.chartBarActive : ""
                    }`}
                    style={{ height: `${(bar.value / maxValue) * 100}%` }}
                  ></div>
                  <span className={styles.chartLabel}>{bar.month}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="col-12 col-xl-4">
          <div className={`${styles.panel} d-flex flex-column`}>
            <h6 className={`${styles.panelTitle} mb-4`}>RECENT COMMENTS</h6>
            <div className="flex-grow-1">
              {recentComments.map((comment, index) => (
                <div className={styles.commentRow} key={index}>
                  <div
                    className={styles.avatar}
                    style={{ backgroundColor: comment.color }}
                  >
                    {comment.initials}
                  </div>
                  <div className={styles.commentBody}>
                    <p className={styles.commentName}>{comment.name}</p>
                    <p className={styles.commentText}>{comment.text}</p>
                    <div className={styles.commentActions}>
                      <a href="#" className={styles.approveLink}>
                        Approve
                      </a>
                      <a href="#" className={styles.rejectLink}>
                        Reject
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <button className={styles.viewAllBtn}>View All Comments</button>
          </div>
        </div>
      </div>

      {/* Recent posts table */}
      <div className={`${styles.panel} mt-4`}>
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h6 className={styles.panelTitle}>RECENT POSTS</h6>
          <a href="#" className={styles.seeFullList}>
            See full list
          </a>
        </div>
        <div className="table-responsive">
          <table className={`table ${styles.postsTable}`}>
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
              {recentPosts.map((post, index) => (
                <tr key={index}>
                  <td className={styles.postTitleCell}>
                    <div className={styles.postThumb}></div>
                    {post.title}
                  </td>
                  <td>
                    <span
                      className={`${styles.statusBadge} ${
                        post.status === "PUBLISHED"
                          ? styles.statusPublished
                          : styles.statusDraft
                      }`}
                    >
                      {post.status}
                    </span>
                  </td>
                  <td>{post.author}</td>
                  <td>{post.date}</td>
                  <td>
                    <span className={styles.actionsDots}>&#8942;</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DashboardContent;