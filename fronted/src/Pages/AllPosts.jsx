import { Link } from "react-router-dom";
import styles from "../assets/AllPosts.module.css";
import { useEffect, useState } from "react";
import { apiUrl, baseUrl } from "../Http/Http";
import {
  BsChevronLeft,
  BsChevronRight
} from "react-icons/bs";

const posts = [
  {
    img: "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?w=400",
    category: "Wellness",
    read: "5 min read",
    title: "Morning Rituals for a Grounded Day",
    excerpt: "Exploring the transformative power of five minutes of silence...",
  },
  {
    img: "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=400",
    category: "Travel",
    read: "12 min read",
    title: "Coastal Solitude: A Guide to the Forgotten Islands",
    excerpt: "A photographic journey through the hidden archipelagos where...",
  },
  {
    img: "https://images.unsplash.com/photo-1519162808019-7de1683fa2ad?w=400",
    category: "Lifestyle",
    read: "6 min read",
    title: "The Rebirth of Analog: Why We Still Need Paper",
    excerpt: "In an era of endless cloud storage, the tangible weight of a notebook...",
  },
  {
    img: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=400",
    category: "Minimalism",
    read: "10 min read",
    title: "Designing for Depth: The Sensory Home",
    excerpt: "Moving beyond aesthetics to create spaces that nourish the soul...",
  },
];

export default function AllPosts() {

  // const {totalPosts} = useContext(AppContext);
    const [currentPostPage, setCurrentPostPage] = useState(1);
    const [totalPosts, setTotalPosts] = useState([]);
    const [postPagination, setPostPagination] = useState({
      currentPage:'',
      from:'',
      lastPage:'',
      to:'',
      total:'',
      perPage:'',
    });
  
    // fetch posts
    const fetchPosts = async ()=>{
        try{
            const token = localStorage.getItem('token');
            const response = await fetch(`${apiUrl}/posts?page=${currentPostPage}`,{
                method:'GET',
                headers:{
                    'Content-type':'application/json',
                    'Accept':'application/json',
                    'Authorization':`Bearer ${token}`
                }
            });
            const data = await response.json();
            // console.log(data.total);
            if(response.ok){
                setTotalPosts(data.posts.data);
                setPostPagination({
                    currentPage:data.posts.current_page,
                    from:data.posts.from,
                    lastPage:data.posts.last_page,
                    to:data.posts.to,
                    total:data.posts.total,
                    perPage:data.posts.per_page
                });
                
            }
        }catch(error){
            console.log(error);
        }
    }
  
    const pages = [];
    const start = Math.max(1, postPagination.currentPage - 2);
    const end = Math.min(postPagination.lastPage, postPagination.currentPage + 2);
    if(start > 1){
      pages.push(1);
      if(start > 2) pages.push('...');
    }
  
    for (let i = start; i<=end; i++  ){
      pages.push(i);
    }
   
    if(end < postPagination.lastPage){
      if(end < postPagination.lastPage - 1) pages.push("...");
      pages.push(postPagination.lastPage);
    }
  
    useEffect(()=>{
      fetchPosts();
    },[currentPostPage]);

  return (
    <div className={styles.page}>

      <div className="container">
        <div className={styles.titleRow}>
          <div>
            <h1 className={styles.pageTitle}>All Stories</h1>
            <p className={styles.pageSubtitle}>
              Quiet reflections on a life lived with intention, curated for the modern wanderer.
            </p>
          </div>
          <div className={styles.filterPills}>
            <span className={styles.pillActive}>All</span>
            <span className={styles.pill}>Minimalism</span>
            <span className={styles.pill}>Travel</span>
            <span className={styles.pill}>Wellness</span>
            <span className={styles.pill}>Lifestyle</span>
          </div>
        </div>

        <div className="row mb-4">
          <div className="col-md-8">
            <div className={styles.featuredCard}>
              <span className={styles.featuredBadge}>Featured</span>
              <img
                src="https://images.unsplash.com/photo-1439853949127-fa647821eba0?w=900"
                alt="featured"
              />
            </div>
            <div className={styles.meta}>Minimalism &nbsp;•&nbsp; 8 min read</div>
            <h3 className={styles.postTitle}>
              The Art of Letting Go: Finding Stillness in a Crowded Room
            </h3>
            <p className={styles.postExcerpt}>
              How stripping away the unnecessary physical and mental clutter allows for a deeper
              connection with the present moment and a more intentional way of...
            </p>
          </div>
          <div className="col-md-4">
            <img
              src="https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=400"
              alt="post"
              className={styles.smallImg}
            />
            <div className={styles.meta}>Wellness &nbsp;•&nbsp; 5 min read</div>
            <h3 className={styles.postTitle}>Morning Rituals for a Grounded Day</h3>
            <p className={styles.postExcerpt}>
              Exploring the transformative power of five minutes of silence...
            </p>
          </div>
        </div>

        <div className="row">
          {totalPosts.map((p, i) => (
            <div className="col-md-4" key={i}>
              <Link to={`/blog-post/${p.id}`}><div className={styles.card}>
                <img src={`${baseUrl}/posts-images/${p.image}`} alt={p.title} className={styles.gridImg} />
                <div className={styles.meta}>{p.category.name} &nbsp;</div>
                <h3 className={styles.postTitle}>{p.title.length > 40 ? `${p.title.substr(0,40)}...` : p.title }</h3>
              </div></Link>
            </div>
          ))}
        </div>

      {/* Pagination */}
      <div className={`d-flex justify-content-between align-items-center ${styles.paginationRow}`}>
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
      </div>
      </div>
    </div>
  );
}
