import React, { useContext, useEffect } from "react";
import { BsChevronLeft, BsChevronRight, BsPersonFill } from "react-icons/bs";
import styles from "../assets/ManageComments.module.css";
import { apiUrl, baseUrl } from "../Http/Http";
import { AppContext } from "../Context/AppContext";
import { IoMdCheckmark } from "react-icons/io";
import { FaXmark } from "react-icons/fa6";
import { IoWarningOutline } from "react-icons/io5";
import { RiDeleteBinLine } from "react-icons/ri";



const tabs = [
  { label: "All", count: 128, active: true },
  { label: "Pending", count: 12 },
  { label: "Approved", count: 104 },
  { label: "Spam", count: 12 },
];


const ManageComments = () => {

  const {comments} = useContext(AppContext);
  const {commentsPagination} = useContext(AppContext);
  const {currentComments} = useContext(AppContext);
  const {setCurrentComments} = useContext(AppContext);

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
                        {comment.image ? (
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
                      style={{color:comment.status === 'approved' ? '#45218B' : '' || comment.status === 'spam' ? '#940E11' :'',backgroundColor:comment.status === 'pending' ? '#C9A74D' : '' || comment.status === 'approved' ? '#EDEBF3' : '' || comment.status === 'spam' ? '#FFDAD6' : ''}}
                    >
                      {comment.status}
                    </span>
                  </td>
                  <td className={styles.dateCell}>{comment.date}</td>
                  <td>
                    <div className="d-flex">
                      <div className={`${styles.actions} me-2`}><IoMdCheckmark /></div>
                      <div className={`${styles.actions} me-2`}><FaXmark /></div>
                      <div className={`${styles.actions} me-2`}><IoWarningOutline /></div>
                      <div className={`${styles.actions}`}><RiDeleteBinLine /></div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
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
                <span className={styles.pageDots}>...</span>
              ):(<button onClick={()=> setCurrentComments(page)} className={`${styles.pageBtn} ${currentComments === page ? `${styles.pageBtnActive}`: ''}`}>{page}</button>)
            })}
            <button onClick={()=> setCurrentComments(commentsPagination.currentPage + 1)} disabled={commentsPagination.currentPage === commentsPagination.lastPage} className={styles.pageBtn}>
              <BsChevronRight />
            </button>
          </div>
        </div>}
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