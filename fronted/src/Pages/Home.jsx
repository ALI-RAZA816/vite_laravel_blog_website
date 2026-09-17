import { Link } from "react-router-dom";
import styles from '../assets/Home.module.css';
import { IoMdSearch } from "react-icons/io";
import { usePublicCategory } from "../Context/PublicCategoryContext";
import { usePublicPost } from "../Context/PublicPostContext";
import { baseUrl } from "../Http/Http";

import {
  BsChevronLeft,
  BsChevronRight
} from "react-icons/bs";
import LoadingSpinner from "../components/LoadingSpinner";

export default function Home() {


  const { publicCategories: categories } = usePublicCategory();
  const { publicPosts: totalPosts, spinnerLoader, popularPosts ,publicPostPage:pagination, setCurrentPage: setCurrentPostPage, currentPage :currentPostPage} = usePublicPost();
  
  const pages = [];
  const start = Math.max(1, pagination.currentPage - 2);
  const end = Math.min(pagination.lastPage, pagination.currentPage + 2);
  if(start > 1){
    pages.push(1);
    if(start > 2) pages.push('...');
  }

  for (let i = start; i<=end; i++  ){
    pages.push(i);
  }
 
  if(end < pagination.lastPage){
    if(end < pagination.lastPage - 1) pages.push("...");
    pages.push(pagination.lastPage);
  }

  return (
    <div className={styles.page}>


      {/* Hero */}
      <div className="container overflow-hidden">
        <div className={`${styles.hero} mt-3 mb-3`}>
          <div className={styles.heroOverlay}>
            <h1 className={styles.heroTitle}>Finding Stillness in a Chaotic Digital World</h1>
            <p className={styles.heroSubtitle}>
              How rediscovering analog rituals can transform your mental clarity and creativ...
            </p>
            <button className={styles.readMoreBtn}>Read More &rarr;</button>
          </div>
        </div>

        <div className="row">
          {/* Main content */}
          <div className="col-lg-8">
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>Recent Stories</h2>
            </div>
            <div className="row">
              {spinnerLoader ? (
                  <div className="d-flex min-vh-100 justify-content-center align-items-center"><LoadingSpinner /></div>
              ):totalPosts.map((post, i) => (
                <div className="col-md-6" key={i}>
                  <Link to={`blog-post/${post.id}`}><div className={styles.card}>
                    <img src={`${baseUrl}/posts-images/${post.image}`} alt={post.title} className={styles.cardImg} />
                    <div className={styles.cardMeta}>
                      <span className={styles.cardCategory}>{post.category.name}</span>
                      <span className={styles.cardDot}>•</span>
                      <span>{post.date}</span>
                    </div>
                    <h3 className={`${styles.cardTitle} text-dark`}>{post.title.length > 40 ? `${post.title.substr(0,40)}...` : post.title }</h3>
                  </div></Link>
                </div>
              ))}
            </div>

           {/* Pagination */}
            {totalPosts.length !== 0 && <div className={`d-flex justify-content-between align-items-center ${styles.paginationRow}`}>
              <span className={styles.showingText}>Showing {pagination.from} to {pagination.to} of {pagination.total} users</span>
              <div className="d-flex align-items-center gap-2">
                <button disabled={pagination.currentPage === 1} onClick={()=> setCurrentPostPage(pagination.currentPage - 1)} className={styles.pageBtn}>
                  <BsChevronLeft />
                </button>
                {pages.map((page, index)=>{
                  return page === '...' ?(
                    <span className={styles.pageDots}>...</span>
                  ):(<button onClick={()=> setCurrentPostPage(page)} className={`${styles.pageBtn} ${currentPostPage === page ? `${styles.pageBtnActive}`: ''}`}>{page}</button>)
                })}
                <button onClick={()=> setCurrentPostPage(pagination.currentPage + 1)} disabled={pagination.currentPage === pagination.lastPage} className={styles.pageBtn}>
                  <BsChevronRight />
                </button>
              </div>
            </div>}
          </div>

          {/* Sidebar */}
          <div className="col-lg-4">
            <div className={styles.sidebarBlock}>
              <h4 className={styles.sidebarTitle}>SEARCH THE JOURNAL</h4>
              <div className={styles.searchBox}>
                <input type="text" placeholder="Type keywords..." />
                <span><IoMdSearch /></span>
              </div>
            </div>

            <div className={styles.sidebarBlock}>
              <h4 className={styles.sidebarTitle}>CATEGORIES</h4>
              <div className={styles.categoryPills}>
                {spinnerLoader ? (
                  <div className="d-flex justify-content-center align-items-center"><LoadingSpinner /></div>
              ):categories.map((cat, index)=>{
                  return <span key={index} className={styles.pill}>{cat.name} ({cat.post_count})</span>
                })}
              </div>
            </div>

            <div className={styles.sidebarBlock}>
              <h4 className={styles.sidebarTitle}>POPULAR THIS WEEK</h4>
              {spinnerLoader ? (
                  <div className="d-flex justify-content-center align-items-center"><LoadingSpinner /></div>
              ):popularPosts.map((p, i) => (
                <div className={styles.popularItem} key={i}>
                  <img src={`${baseUrl}/posts-images/${p.image}`} />
                  <div>
                    <p className={styles.popularTitle}>{p.title.length > 40 ? `${p.title.substr(0, 40)}...` : p.title}</p>
                    <span className={styles.popularDate}>{p.date} <span class="badge ms-3 text-bg-secondary">{p.category.name}</span></span>
                  </div>
                </div>
              ))}
            </div>

            <div className={styles.newsletterBox}>
              <div className={styles.mailIcon}>&#9993;</div>
              <h4>Weekly Musings</h4>
              <p>
                A curated collection of thoughts, inspiration, and slow-living tips delivered
                every Sunday morning.
              </p>
              <input type="email" placeholder="Your email a" />
              <button>Join the Circle</button>
              <span className={styles.newsletterNote}>We respect your space. Unsubscribe anytime.</span>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
