import React, { useContext } from "react";
import {BsFileEarmarkTextFill, BsChatSquareTextFill, BsPeopleFill, BsEyeFill, BsPlusLg } from "react-icons/bs";
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
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);
import { FaEye } from "react-icons/fa";
import styles from "../assets/DashboardContent.module.css";
import {Link} from 'react-router-dom';
import { AppContext } from "../Context/AppContext";
import { baseUrl } from "../Http/Http";


const chartData = [
  { month: "Jan", value: 45 },
  { month: "Feb", value: 62 },
  { month: "Mar", value: 55 },
  { month: "Apr", value: 82 },
  { month: "May", value: 74 },
  { month: "Jun", value: 100 },
];


const DashboardContent = () => {

  const {lastMonthViews} = useContext(AppContext);

   const data = {
    labels: lastMonthViews.map(item => item.month),
    datasets: [
      {
        label: 'Post Views',
        data: lastMonthViews.map(item => item.total),
        borderColor: '#4C32C2',
        borderWidth: 4,          
        pointRadius: 5,          
        pointBackgroundColor: '#4C32C2',
        pointBorderColor: '#fff',
        pointBorderWidth: 2,
        tension: 0.3,
        fill: false,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
    },
  };

  const {posts} = useContext(AppContext);
  const {totalViews} = useContext(AppContext);
  const {comments} = useContext(AppContext);
  const {allComments} = useContext(AppContext);
  const {commentAvg} = useContext(AppContext);
  const {totalPosts} = useContext(AppContext);
  const {velocity} = useContext(AppContext);
  const {avgViews} = useContext(AppContext);
  const {totalUsers} = useContext(AppContext);

  const recentComments = comments.slice(0,5);
  const recentPost = posts.slice(0,5);
  const statCards = [
    {
      icon: <BsFileEarmarkTextFill />,
      iconBg: "#ece9fb",
      iconColor: "#5b3fd9",
      badge: `+${velocity}%`,
      badgeType: "positive",
      label: "Total Posts",
      value:totalPosts.length <= 1000 ? `${totalPosts.length}` : `${(totalPosts.length/1000).toFixed(1)}k`,
    },
    {
      icon: <BsChatSquareTextFill />,
      iconBg: "#fdf3e0",
      iconColor: "#d99a1a",
      badge: `+${commentAvg}%`,
      badgeType: "positive",
      label: "Total Comments",
      value:allComments.length <= 1000 ? `${allComments.length}` : `${(allComments.length/1000).toFixed(1)}k`
    },
    {
      icon: <BsPeopleFill />,
      iconBg: "#ece9fb",
      iconColor: "#5b3fd9",
      badge: "Stable",
      badgeType: "neutral",
      label: "Total Users",
      value:totalUsers.length <= 1000 ? `${totalUsers.length}` : `${(totalUsers.length/1000).toFixed(1)}k`,
    },
    {
      icon: <BsEyeFill />,
      iconBg: "#fbe9e9",
      iconColor: "#d94f4f",
      badge: `+${avgViews}%`,
      badgeType: "positive",
      label: "Total Views",
      value:totalViews <= 1000 ? `${totalViews}` : `${(totalViews/1000).toFixed(1)}k`,
    },
  ];
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
        <Link to="/admin-panel/posts/add-post"><button className={`d-flex align-items-center ${styles.createBtn}`}>
          <BsPlusLg className="me-2" />
          Create Post
        </button></Link>
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
            <div className={`${styles.chart}`} style={{ width: '100%', height: '400px' }}>
              <Line data={data} options={options} />
            </div>
          </div>
        </div>

        <div className="col-12 col-xl-4">
          <div className={`${styles.panel} d-flex flex-column`}>
            <h6 className={`${styles.panelTitle} mb-4`}>RECENT COMMENTS</h6>
            <div className="flex-grow-1">
              {recentComments.map((comment, index) => (
                <div className={styles.commentRow} key={index}>
                   <div className={styles.avatar} style={{ backgroundColor: '#c5c2d6', }}>
                      {comment.user.image ? (
                        <img src={`${baseUrl}/uploads/${comment.user.image}`} alt="" />
                      ) : (
                        <>
                        {comment.user.name.split(' ')[0].substr(0,1)}
                        {comment.user.name.split(' ')[1].substr(0,1)}
                        </>
                      )}
                    </div>
                  <div className={styles.commentBody}>
                    <p className={styles.commentName}>{comment.user.name}</p>
                    <p className={styles.commentText}>{comment.comment.length > 20 ? `${comment.comment.substr(0, 20)}...` : comment.comment}</p>
                  </div>
                </div>
              ))}
            </div>
            <Link to="/admin-panel/comments"><button className={styles.viewAllBtn}>View All Comments</button></Link>
          </div>
        </div>
      </div>

      {/* Recent posts table */}
      <div className={`${styles.panel} mt-4`}>
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h6 className={styles.panelTitle}>RECENT POSTS</h6>
          <Link to="/admin-panel/posts" className={styles.seeFullList}>
            See full list
          </Link>
        </div>
          {/* Table */}
              <div className={styles.tableCard}>
                <div className="table-responsive">
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
                        <tr key={index}>
                          <td>
                            <p className={styles.postTitle}>{post.title}</p>
                            <p className={styles.postUrl}>{post.category.slug}</p>
                          </td>
                          <td>
                            <span
                              className={styles.categoryBadge}
                              style={{ backgroundColor: '#f7d774'}}
                            >
                              {post.category.name}
                            </span>
                          </td>
                          <td>
                            <div className="d-flex align-items-center gap-2">
                              <div
                                className={styles.avatar}
                                style={{ backgroundColor: '#5b3fd9', overflow:'hidden'}}
                              >
                                {post.author.image ? <img src={`${baseUrl}/uploads/${post.author.image}`} alt="" />:
                                  <>
                                      {post.author.name.split(' ')[0].substr(0, 1)}
                                      {post.author.name.split(' ')[1]?.substr(0, 1)}
                                  </>
                                }
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
                              <span className={`${styles.statusDot}`}></span>
                              <span className='text-capitalize'>{post.published}</span>
                              
                            </span>
                          </td>
                          <td className={styles.dateCell}>{post.date}</td>
                          <td className={`${styles.dateCell} `}><Link to={`/admin-panel/posts/post-preview/${post.id}`}><FaEye /></Link></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
        
      </div>
    </div>
  );
};

export default DashboardContent;