import { Link } from "react-router-dom";
import styles from '../assets/Home.module.css';
import { IoMdSearch } from "react-icons/io";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../Context/AppContext";
import { apiUrl, baseUrl } from "../Http/Http";
import {
  BsChevronLeft,
  BsChevronRight
} from "react-icons/bs";

const popular = [
  { title: "The Philosophy of Wabi-Sabi in Modern Homes", date: "March 04 • 5 min read", img: "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=100" },
  { title: "Unplugging: My 30-Day Digital Detox Journey", date: "Feb 22 • 8 min read", img: "https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?w=100" },
  { title: "Sourdough Secrets: Why Slow Bread is Better", date: "Feb 15 • 12 min read", img: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=100" },
];

// const categories = [
//   "Travel (12)",
//   "Lifestyle (8)",
//   "Wellness (15)",
//   "Creativity (7)",
//   "Food (10)",
//   "Minimalism (22)",
// ];

export default function Home() {

  const [totalPosts, setTotalPosts] = useState([]);
  const [categories, setCategories] = useState([]);

  const fetchPosts = async () => {
    try {
        const response = await fetch(`${apiUrl}/public-posts`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
            },
        });

        const data = await response.json();

        if (response.ok) {
          setTotalPosts(data.allPost);
        }

    } catch (error) {
        console.log("ERROR:", error);
    }
  };

  const fetchCategories = async () => {
    try {
        const response = await fetch(`${apiUrl}/public-category`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
            },
        });

        const data = await response.json();

        if (response.ok) {
          console.log(data.allCategories);
          setCategories(data.allCategories);
        }

    } catch (error) {
        console.log("ERROR:", error);
    }
  };

  useEffect(()=>{
    fetchPosts();
    fetchCategories()
  },[]);

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
              {totalPosts.map((post, i) => (
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
            {/* <div className={`d-flex justify-content-between align-items-center ${styles.paginationRow}`}>
              <span className={styles.showingText}>Showing {postPagination.from} to {postPagination.to} of {postPagination.total} users</span>
              <div className="d-flex align-items-center gap-2">
                <button disabled={postPagination.currentPage === 1} onClick={()=> setCurrentPostPage(postPagination.currentPage - 1)} className={styles.pageBtn}>
                  <BsChevronLeft />
                </button>
                {pages.map((page, index)=>{
                  return page === '...' ?(
                    <span className={styles.pageDots}>...</span>
                  ):(<button onClick={()=> setCurrentPostPage(page)} className={`${styles.pageBtn} ${currentPostPage === page ? `${styles.pageBtnActive}`: ''}`}>{page}</button>)
                })}
                <button onClick={()=> setCurrentPostPage(postPagination.currentPage + 1)} disabled={postPagination.currentPage === postPagination.lastPage} className={styles.pageBtn}>
                  <BsChevronRight />
                </button>
              </div>
            </div> */}
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
                {categories.map((cat, index)=>{
                  return <span key={index} className={styles.pill}>{cat.name} ({cat.post_count})</span>
                })}
              </div>
            </div>

            <div className={styles.sidebarBlock}>
              <h4 className={styles.sidebarTitle}>POPULAR THIS WEEK</h4>
              {popular.map((p, i) => (
                <div className={styles.popularItem} key={i}>
                  <img src={p.img} alt={p.title} />
                  <div>
                    <p className={styles.popularTitle}>{p.title}</p>
                    <span className={styles.popularDate}>{p.date}</span>
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
