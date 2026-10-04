import React from "react";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import styles from "../assets/ManageComments.module.css";
import { baseUrl } from "../Http/Http";
import { useComment } from "../Context/CommentContext";
import { IoMdCheckmark } from "react-icons/io";
import { FaXmark } from "react-icons/fa6";
import { IoWarningOutline } from "react-icons/io5";
import { RiDeleteBinLine } from "react-icons/ri";
import RecentComments from "../components/RecentComments";
import LoadingSpinner from "../components/LoadingSpinner";
import { useUser } from "../Context/UserContext";

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
const formatCount = (n) => (n < 1000 ? n : `${(n / 1000).toFixed(1)}k`);

// Status ke hisaab se badge ki class (pehle inline style ki lambi chain thi)
const statusClass = {
  pending: styles.statusPending,
  approved: styles.statusApproved,
  spam: styles.statusSpam,
  rejected: styles.statusRejected,
};

const ManageComments = () => {

  const {
    comments,
    allComments,
    commentsPagination,
    currentComments,
    setCurrentComments,
    pendingComments,
    approvedComments,
    spamComments,
    commentStatus,
    Deletecomment,
    activeFilter,
    Searchcomment,
    spinnerLoader
  } = useComment();

  const { loggedUser } = useUser();
  const canModerate = loggedUser?.role !== 'author';

  const pages = [];
  const start = Math.max(1, commentsPagination.currentPage - 2);
  const end = Math.min(commentsPagination.lastPage, commentsPagination.currentPage + 2);
  if (start > 1) {
    pages.push(1);
    if (start > 2) pages.push('...');
  }

  for (let i = start; i <= end; i++) {
    pages.push(i);
  }

  if (end < commentsPagination.lastPage) {
    if (end < commentsPagination.lastPage - 1) pages.push("...");
    pages.push(commentsPagination.lastPage);
  }

  // Stat cards: neutral total, baqi teen apne rang mein
  const stats = [
    {
      label: 'Total Comments',
      value: formatCount(allComments.length),
      valueClass: '',
      iconClass: styles.iconTotal,
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
        </svg>
      ),
    },
    {
      label: 'Pending Review',
      value: formatCount(pendingComments.length),
      valueClass: styles.valuePending,
      iconClass: styles.iconPending,
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="9" y="2" width="6" height="4" rx="1" />
          <path d="M9 4H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-3" />
        </svg>
      ),
    },
    {
      label: 'Approved',
      value: formatCount(approvedComments.length),
      valueClass: styles.valueApproved,
      iconClass: styles.iconApproved,
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="10" />
          <path d="M9 12l2 2 4-4" />
        </svg>
      ),
    },
    {
      label: 'Flagged as Spam',
      value: formatCount(spamComments.length),
      valueClass: styles.valueFlagged,
      iconClass: styles.iconFlagged,
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="8" x2="12" y2="12" />
          <line x1="12" y1="16" x2="12.01" y2="16" />
        </svg>
      ),
    },
  ];

  const tabs = [
    { key: 'all', label: 'All', count: allComments.length },
    { key: 'pending', label: 'Pending', count: pendingComments.length },
    { key: 'approved', label: 'Approved', count: approvedComments.length },
    { key: 'spam', label: 'Spam', count: spamComments.length },
  ];

  return (
    <div className={styles.commentsPage}>
      {/* Heading */}
      <div className={`d-flex justify-content-between align-items-start flex-wrap gap-3 ${styles.headingRow}`}>
        <div>
          <h2 className={styles.pageTitle}>Manage Comments</h2>
          <p className={styles.pageSubtitle}>
            Review and moderate user interactions across your blog.
          </p>
        </div>
      </div>

      {/* Stat cards */}
      <div className={styles.statsRow}>
        {stats.map((stat) => (
          <div className={styles.card} key={stat.label}>
            <div className={styles.cardText}>
              <span className={styles.cardLabel}>{stat.label}</span>
              <span className={`${styles.cardValue} ${stat.valueClass}`}>{stat.value}</span>
            </div>
            <div className={`${styles.iconWrap} ${stat.iconClass}`}>
              {stat.icon}
            </div>
          </div>
        ))}
      </div>

      {/* Filter tabs */}
      <div className={styles.filterBar}>
        <div className={styles.tabs}>
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => Searchcomment(tab.key)}
              className={`${styles.tab} ${activeFilter === tab.key ? styles.tabActive : ''}`}
            >
              {tab.label} <span className={styles.tabCount}>({formatCount(tab.count)})</span>
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className={styles.tableCard}>
        <div className={`table-responsive ${styles.tableScroll}`}>
          {spinnerLoader ? (
            <div style={{ height: '480px' }} className="d-flex justify-content-center align-items-center"><LoadingSpinner /></div>
          ) : comments.length === 0 ? (
            <div className="p-3"><RecentComments /></div>
          ) : (
            <table className={`table mb-0 ${styles.commentsTable}`}>
              <thead>
                <tr>
                  <th>Author</th>
                  <th>Comment Excerpt</th>
                  <th>On Post</th>
                  <th>Status</th>
                  <th>Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {comments?.map((comment, index) => (
                  <tr key={comment.id ?? index}>
                    <td>
                      <div className="d-flex align-items-center gap-3">
                        <div className={styles.avatar}>
                          {comment.user.image ? (
                            <img src={`${baseUrl}/uploads/${comment.user.image}`} alt="" />
                          ) : (
                            getInitials(comment.user.name)
                          )}
                        </div>
                        <div>
                          <p className={styles.authorName}>{comment.name}</p>
                          <p className={styles.authorEmail}>{comment.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className={styles.excerptCell}>
                      {comment.comment.length > 20 ? `${comment.comment.substr(0, 20)}...` : comment.comment}
                    </td>
                    <td>
                      <a href="#" className={styles.postLink}>
                        {comment.on_post.length > 20 ? `${comment.on_post.substr(0, 20)}...` : comment.on_post}
                      </a>
                    </td>
                    <td>
                      <span className={`${styles.statusBadge} ${statusClass[comment.status] ?? ''} text-capitalize`}>
                        {comment.status}
                      </span>
                    </td>
                    <td className={styles.dateCell}>{comment.date}</td>
                    <td>
                      <div className="d-flex gap-2">
                        {canModerate && (
                          <button
                            type="button"
                            title="Approve"
                            aria-label="Approve comment"
                            className={`${styles.actionBtn} ${styles.actionApprove}`}
                            onClick={() => commentStatus('approved', comment.id)}
                          >
                            <IoMdCheckmark />
                          </button>
                        )}
                        {canModerate && (
                          <button
                            type="button"
                            title="Reject"
                            aria-label="Reject comment"
                            className={`${styles.actionBtn} ${styles.actionReject}`}
                            onClick={() => commentStatus('rejected', comment.id)}
                          >
                            <FaXmark />
                          </button>
                        )}
                        {canModerate && (
                          <button
                            type="button"
                            title="Mark as spam"
                            aria-label="Mark comment as spam"
                            className={`${styles.actionBtn} ${styles.actionSpam}`}
                            onClick={() => commentStatus('spam', comment.id)}
                          >
                            <IoWarningOutline />
                          </button>
                        )}
                        <button
                          type="button"
                          title="Delete"
                          aria-label="Delete comment"
                          className={`${styles.actionBtn} ${styles.actionDelete}`}
                          onClick={() => Deletecomment(comment.id)}
                        >
                          <RiDeleteBinLine />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* Pagination */}
        {commentsPagination.lastPage > 0 && (
          <div className={`d-flex justify-content-between align-items-center ${styles.paginationRow}`}>
            <span className={styles.showingText}>
              Showing {commentsPagination.from} to {commentsPagination.to} of {commentsPagination.total} comments
            </span>
            <div className="d-flex align-items-center gap-2">
              <button
                disabled={commentsPagination.currentPage === 1}
                onClick={() => setCurrentComments(commentsPagination.currentPage - 1)}
                className={styles.pageBtn}
              >
                <BsChevronLeft />
              </button>
              {pages.map((page, index) => (
                page === '...' ? (
                  <span key={`dots-${index}`} className={styles.pageDots}>...</span>
                ) : (
                  <button
                    key={`page-${page}`}
                    onClick={() => setCurrentComments(page)}
                    className={`${styles.pageBtn} ${currentComments === page ? styles.pageBtnActive : ''}`}
                  >
                    {page}
                  </button>
                )
              ))}
              <button
                onClick={() => setCurrentComments(commentsPagination.currentPage + 1)}
                disabled={commentsPagination.currentPage === commentsPagination.lastPage}
                className={styles.pageBtn}
              >
                <BsChevronRight />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageComments;