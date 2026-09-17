import React from "react";
import { BsChevronLeft, BsChevronRight, BsPersonFill } from "react-icons/bs";
import styles from "../assets/ManageComments.module.css";
import { baseUrl } from "../Http/Http";
import { useComment } from "../Context/CommentContext";
import { IoMdCheckmark } from "react-icons/io";
import { FaXmark } from "react-icons/fa6";
import { IoWarningOutline } from "react-icons/io5";
import { RiDeleteBinLine } from "react-icons/ri";
import RecentComments from "../components/RecentComments";
import LoadingSpinner from "../components/LoadingSpinner";

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

  const pages = [];
  const start = Math.max(1, commentsPagination.currentPage - 2);
  const end = Math.min(commentsPagination.lastPage, commentsPagination.currentPage + 2);
  if(start > 1){
    pages.push(1);
    if(start > 2) pages.push('...');
  }

  for (let i = start; i<=end; i++  ){
    pages.push(i);
  }
 
  if(end < commentsPagination.lastPage){
    if(end < commentsPagination.lastPage - 1) pages.push("...");
    pages.push(commentsPagination.lastPage);
  }
  
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
      </div>

      <div className={styles.statsRow}>
        <div className={styles.card}>
          <div className={styles.cardText}>
            <span className={styles.cardLabel}>Total Comments</span>
            <span className={styles.cardValue}>{allComments.length < 1000 ? allComments.length : `${(allComments.length/1000).toFixed(1)}k`}</span>
          </div>
          <div className={`${styles.iconWrap} ${styles.iconTotal}`}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
            </svg>
          </div>
        </div>
 
        <div className={styles.card}>
          <div className={styles.cardText}>
            <span className={styles.cardLabel}>Pending Review</span>
            <span className={`${styles.cardValue} ${styles.valuePending}`}>{pendingComments.length < 1000 ? pendingComments.length : `${(pendingComments.length/1000).toFixed(1)}`}</span>
          </div>
          <div className={`${styles.iconWrap} ${styles.iconPending}`}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="9" y="2" width="6" height="4" rx="1" />
              <path d="M9 4H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-3" />
            </svg>
          </div>
        </div>
 
        <div className={styles.card}>
          <div className={styles.cardText}>
            <span className={styles.cardLabel}>Approved</span>
            <span className={`${styles.cardValue} ${styles.valueApproved}`}>{approvedComments.length < 1000 ? approvedComments.length : `${(approvedComments.length/1000).toFixed(1)}k`}</span>
          </div>
          <div className={`${styles.iconWrap} ${styles.iconApproved}`}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10" />
              <path d="M9 12l2 2 4-4" />
            </svg>
          </div>
        </div>
 
        <div className={styles.card}>
          <div className={styles.cardText}>
            <span className={styles.cardLabel}>Flagged as Spam</span>
            <span className={`${styles.cardValue} ${styles.valueFlagged}`}>{spamComments.length < 1000 ? spamComments.length : `${(spamComments.length/1000).toFixed(1)}k`}</span>
          </div>
          <div className={`${styles.iconWrap} ${styles.iconFlagged}`}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
          </div>
        </div>
      </div>
      <div className={styles.filterBar}>
        <div className={styles.tabs}>
          <button onClick={()=> Searchcomment('all')} className={`${styles.tab}  ${activeFilter === 'all' ? styles.tabActive : ''}`}>
            All <span className={styles.tabCount}>({allComments.length < 1000 ? allComments.length : `${(allComments.length/1000).toFixed(1)}k`})</span>
          </button>
          <button onClick={()=> Searchcomment('pending')} className={`${styles.tab}  ${activeFilter === 'pending' ? styles.tabActive : ''}`}>
            Pending <span className={styles.tabCount}>({pendingComments.length < 1000 ? pendingComments.length : `${(pendingComments.length/1000).toFixed(1)}`})</span>
          </button>
          <button onClick={()=> Searchcomment('approved')} className={`${styles.tab}  ${activeFilter === 'approved' ? styles.tabActive : ''}`}>
            Approved <span className={styles.tabCount}>({approvedComments.length < 1000 ? approvedComments.length : `${(approvedComments.length/1000).toFixed(1)}`})</span>
          </button>
          <button onClick={()=> Searchcomment('spam')} className={`${styles.tab}  ${activeFilter === 'spam' ? styles.tabActive : ''}`}>
            Spam <span className={styles.tabCount}>({spamComments.length < 1000 ? spamComments.length : `${(spamComments.length/1000).toFixed(1)}`})</span>
          </button>
        </div>
      </div>

      {/* Table */}
      <div className={styles.tableCard}>
        <div className="table-responsive" style={{height:'500px'}}>
          {spinnerLoader ? (
              <div style={{height:'480px'}} className="d-flex justify-content-center align-items-center"><LoadingSpinner /></div>
          ) :comments.length === 0 ? <div className="p-3"><RecentComments/></div>:<table className={`table mb-0 ${styles.commentsTable}`}>
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
                <tr
                  key={index}>
                  <td>
                    <div className="d-flex align-items-center gap-3">
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
                      <div>
                        <p className={styles.authorName}>{comment.name}</p>
                        <p className={styles.authorEmail}>{comment.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className={styles.excerptCell}>{comment.comment.length > 20 ? `${comment.comment.substr(0, 20)}...` : comment.comment}</td>
                  <td>
                    <a href="#" className={styles.postLink}>
                      {comment.on_post.length > 20 ? `${comment.on_post.substr(0, 20)}...` : comment.on_post}
                    </a>
                  </td>
                  <td>
                    <span
                      className={`${styles.statusBadge} text-capitalize`}
                      style={{color:comment.status === 'rejected' ? '#F59E0B' : '' || comment.status === 'approved' ? '#45218B' : '' || comment.status === 'spam' ? '#940E11' :'',backgroundColor:comment.status === 'pending' ? '#C9A74D' : '' || comment.status === 'approved' ? '#EDEBF3' : '' || comment.status === 'spam' ? '#FFDAD6' : '' || comment.status === 'rejected' ? '#FFEBCC' : ''}}
                    >
                      {comment.status}
                    </span>
                  </td>
                  <td className={styles.dateCell}>{comment.date}</td>
                  <td>
                    <div className="d-flex">
                      <div className={`${styles.actions} me-2`}><IoMdCheckmark onClick={()=> commentStatus('approved', comment.id)} /></div>
                      <div className={`${styles.actions} me-2`}><FaXmark onClick={()=> commentStatus('rejected', comment.id)} /></div>
                      <div className={`${styles.actions} me-2`}><IoWarningOutline onClick={()=> commentStatus('spam', comment.id)} /></div>
                      <div className={`${styles.actions}`}><RiDeleteBinLine onClick={()=> Deletecomment(comment.id)}/></div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>}
        </div>

        {/* Pagination */}
        {commentsPagination.lastPage && <div className={`d-flex justify-content-between align-items-center ${styles.paginationRow}`}>
          <span className={styles.showingText}>Showing {commentsPagination.from} to {commentsPagination.to} of {commentsPagination.total} users</span>
          <div className="d-flex align-items-center gap-2">
            <button disabled={commentsPagination.currentPage === 1} onClick={()=> setCurrentComments(commentsPagination.currentPage - 1)} className={styles.pageBtn}>
              <BsChevronLeft />
            </button>
            {pages.map((page, index)=>{
              return page === '...' ?(
                <span key={index} className={styles.pageDots}>...</span>
              ):(<button key={index} onClick={()=> setCurrentComments(page)} className={`${styles.pageBtn} ${currentComments === page ? `${styles.pageBtnActive}`: ''}`}>{page}</button>)
            })}
            <button onClick={()=> setCurrentComments(commentsPagination.currentPage + 1)} disabled={commentsPagination.currentPage === commentsPagination.lastPage} className={styles.pageBtn}>
              <BsChevronRight />
            </button>
          </div>
        </div>}
      </div>
    </div>
  );
};

export default ManageComments;