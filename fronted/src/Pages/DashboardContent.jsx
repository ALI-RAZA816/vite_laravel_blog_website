import React, { useState } from "react";
import { BsFileEarmarkTextFill, BsChatSquareTextFill, BsPeopleFill, BsEyeFill, BsPlusLg } from "react-icons/bs";
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

import { FaEye } from "react-icons/fa";
import styles from "../assets/DashboardContent.module.css";
import { Link } from 'react-router-dom';
import { useComment } from "../Context/CommentContext";
import { usePost } from "../Context/PostContext";
import { baseUrl } from "../Http/Http";
import Analytics from "../components/Analytics";
import RecentComments from "../components/RecentComments";
import RecentPost from "../components/RecentPost";
import LoadingSpinner from "../components/LoadingSpinner";
import { useDashboard } from "../Context/DashboardContext";

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

const DashboardContent = () => {

  const [monthlyRecord, setMonthlyRecord] = useState('');

  const { lastMonthViews, spinnerLoader, posts, totalViews, velocity, avgViews } = usePost();
  const { totalPosts, totalUsers, allComments } = useDashboard();
  const { comments, commentAvg } = useComment();

  const recentPost = posts.slice(0, 5);
  const recentComments = comments.slice(0, 5);
  const monthData = monthlyRecord === 'last 6 months' ? lastMonthViews.slice(-6) : lastMonthViews.slice(-12);

  const data = {
    labels: monthData.map(item => item.month),
    datasets: [
      {
        label: 'Post Views',
        data: monthData.map(item => item.total),
        borderColor: '#2563eb',
        backgroundColor: 'rgba(37, 99, 235, 0.08)',
        borderWidth: 2.5,
        pointRadius: 4,
        pointHoverRadius: 6,
        pointBackgroundColor: '#2563eb',
        pointBorderColor: '#ffffff',
        pointBorderWidth: 2,
        tension: 0.35,
        fill: true,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: { mode: 'index', intersect: false },
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: '#111111',
        titleColor: '#ffffff',
        bodyColor: '#e5e5e5',
        padding: 12,
        cornerRadius: 4,
        displayColors: false,
      },
    },
    scales: {
      x: {
        grid: { display: false },
        border: { display: false },
        ticks: { color: '#8a8a8a', font: { size: 12 } },
      },
      y: {
        beginAtZero: true,
        grid: { color: '#f0f0f0' },
        border: { display: false },
        ticks: { color: '#8a8a8a', font: { size: 12 } },
      },
    },
  };

  // Soft accent colors: har card ka apna rang, baqi dashboard monochrome
  const statCards = [
    {
      icon: <BsFileEarmarkTextFill />,
      iconBg: "#eaf1ff",
      iconColor: "#2563eb",
      badge: `+${velocity}%`,
      badgeType: "positive",
      label: "Total Posts",
      value: formatCount(totalPosts.length),
    },
    {
      icon: <BsChatSquareTextFill />,
      iconBg: "#fef3dc",
      iconColor: "#d97706",
      badge: `+${commentAvg}%`,
      badgeType: "positive",
      label: "Total Comments",
      value: formatCount(allComments.length),
    },
    {
      icon: <BsPeopleFill />,
      iconBg: "#e5f6ec",
      iconColor: "#16a34a",
      badge: "Stable",
      badgeType: "neutral",
      label: "Total Users",
      value: formatCount(totalUsers.length),
    },
    {
      icon: <BsEyeFill />,
      iconBg: "#fdeaee",
      iconColor: "#e11d48",
      badge: `+${avgViews}%`,
      badgeType: "positive",
      label: "Total Views",
      value: formatCount(totalViews),
    },
  ];

  return (
    <div className={styles.dashboard}>
      {/* Page heading */}
      <div className={`d-flex justify-content-between align-items-start ${styles.headingRow}`}>
        <div>
          <h2 className={styles.pageTitle}>System Overview</h2>
          <p className={styles.pageSubtitle}>
            Welcome back. Here's what happened in the last 24 hours.
          </p>
        </div>
        <Link to="/admin-panel/posts/add-post">
          <button className={`d-flex align-items-center ${styles.createBtn}`}>
            <BsPlusLg className="me-2" />
            Create Post
          </button>
        </Link>
      </div>

      {/* Stat cards */}
      <div className="row">
        {statCards.map((card, index) => (
          <div className="col-12 mb-md-3 mb-3 col-sm-6 col-xl-3" key={index}>
            <div className={styles.statCard}>
              <div className="d-flex justify-content-between align-items-center mb-3">
                <div
                  className={styles.statIcon}
                  style={{ backgroundColor: card.iconBg, color: card.iconColor }}
                >
                  {card.icon}
                </div>
                <span
                  className={`${styles.statBadge} ${
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
          <div className={`${styles.panel} overflow-hidden`}>
            {spinnerLoader ? (
              <div className="h-100 d-flex justify-content-center align-items-center"><LoadingSpinner /></div>
            ) : lastMonthViews.length === 0 ? (
              <Analytics />
            ) : (
              <>
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <h6 className={styles.panelTitle}>Views per month</h6>
                  <select
                    onChange={(event) => setMonthlyRecord(event.target.value)}
                    className={styles.rangeSelect}
                    defaultValue="last 12 months"
                  >
                    <option value='last 6 months'>Last 6 Months</option>
                    <option value='last 12 months'>Last 12 Months</option>
                  </select>
                </div>
                <div className={styles.chart}>
                  <Line data={data} options={options} />
                </div>
              </>
            )}
          </div>
        </div>

        <div className="col-12 col-xl-4">
          <div className={`${styles.panel} d-flex flex-column`}>
            <h6 className={`${styles.panelTitle} mb-4`}>Recent comments</h6>
            {spinnerLoader ? (
              <div className="h-100 d-flex justify-content-center align-items-center"><LoadingSpinner /></div>
            ) : recentComments.length === 0 ? (
              <RecentComments />
            ) : (
              <div>
                <div className="flex-grow-1">
                  {recentComments.map((comment, index) => (
                    <div className={styles.commentRow} key={index}>
                      <div className={styles.avatar}>
                        {comment.user.image ? (
                          <img src={`${baseUrl}/uploads/${comment.user.image}`} alt="" />
                        ) : (
                          getInitials(comment.user.name)
                        )}
                      </div>
                      <div className={styles.commentBody}>
                        <p className={styles.commentName}>{comment.user.name}</p>
                        <p className={styles.commentText}>
                          {comment.comment.length > 20 ? `${comment.comment.substr(0, 20)}...` : comment.comment}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                <Link to="/admin-panel/comments"><button className={styles.viewAllBtn}>View All Comments</button></Link>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Recent posts table */}
      <div className={`${styles.panel} mt-4`}>
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h6 className={styles.panelTitle}>Recent posts</h6>
          <Link to="/admin-panel/posts" className={styles.seeFullList}>
            See full list
          </Link>
        </div>

        <div className={styles.tableCard}>
          <div className="table-responsive">
            {spinnerLoader ? (
              <div style={{ height: '480px' }} className="d-flex justify-content-center align-items-center"><LoadingSpinner /></div>
            ) : recentPost.length === 0 ? (
              <RecentPost />
            ) : (
              <table className={`table mb-0 ${styles.postsTable}`}>
                <thead>
                  <tr>
                    <th>POST TITLE</th>
                    <th>CATEGORY</th>
                    <th>AUTHOR</th>
                    <th>STATUS</th>
                    <th>DATE</th>
                    <th>ACTIONS</th>
                  </tr>
                </thead>
                <tbody>
                  {recentPost?.map((post, index) => (
                    <tr key={post.id ?? index}>
                      <td>
                        <p className={styles.postTitle}>{post.title}</p>
                        <p className={styles.postUrl}>{post.category.slug}</p>
                      </td>
                      <td>
                        <span className={styles.categoryBadge}>
                          {post.category.name}
                        </span>
                      </td>
                      <td>
                        <div className="d-flex align-items-center gap-2">
                          <div className={styles.avatar}>
                            {post.author.image ? (
                              <img src={`${baseUrl}/uploads/${post.author.image}`} alt="" />
                            ) : (
                              getInitials(post.author.name)
                            )}
                          </div>
                          <span className={styles.authorName}>{post.author.name}</span>
                        </div>
                      </td>
                      <td>
                        <span
                          className={`d-flex align-items-center ${styles.statusBadge} ${
                            post.published === "published"
                              ? styles.statusPublished
                              : styles.statusDraft
                          }`}
                        >
                          <span className={styles.statusDot}></span>
                          <span className='text-capitalize'>{post.published}</span>
                        </span>
                      </td>
                      <td className={styles.dateCell}>{post.date}</td>
                      <td className={styles.dateCell}>
                        <Link to={`/admin-panel/posts/post-preview/${post.id}`} className={styles.actionIcon}><FaEye /></Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardContent;