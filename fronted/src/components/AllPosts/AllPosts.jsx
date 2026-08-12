import { Link } from "react-router-dom";
import styles from "./AllPosts.module.css";

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
  return (
    <div className={styles.page}>
      <header className={styles.navbar}>
        <div className={styles.navInner}>
          <Link to="/" className={styles.logo}>SlowLiving<br />Blog</Link>
          <nav className={styles.navLinks}>
            <Link to="/">Home</Link>
            <Link to="/all-posts" className={styles.navActive}>All Posts</Link>
            <Link to="/about">About</Link>
            <Link to="/contact">Contact</Link>
          </nav>
          <div className={styles.searchBar}>
            <span>&#128269;</span>
            <input type="text" placeholder="Search posts..." />
          </div>
          <div className={styles.navRight}>
            <Link to="/login" className={styles.loginLink}>Login</Link>
            <Link to="/login" className={styles.registerBtn}>Register</Link>
          </div>
        </div>
      </header>

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
          {posts.slice(1).map((p, i) => (
            <div className="col-md-4" key={i}>
              <img src={p.img} alt={p.title} className={styles.gridImg} />
              <div className={styles.meta}>{p.category} &nbsp;•&nbsp; {p.read}</div>
              <h3 className={styles.postTitle}>{p.title}</h3>
              <p className={styles.postExcerpt}>{p.excerpt}</p>
            </div>
          ))}
        </div>

        <div className={styles.pagination}>
          <button className={styles.pageBtn}>&lsaquo;</button>
          <button className={`${styles.pageBtn} ${styles.pageActive}`}>1</button>
          <button className={styles.pageBtn}>2</button>
          <button className={styles.pageBtn}>3</button>
          <span>...</span>
          <button className={styles.pageBtn}>12</button>
          <button className={styles.pageBtn}>&rsaquo;</button>
        </div>
      </div>

      <footer className={styles.footer}>
        <h3 className={styles.footerLogo}>SlowLiving Blog</h3>
        <div className={styles.footerLinks}>
          <span>Terms of Service</span>
          <span>Privacy Policy</span>
          <span>Newsletter</span>
          <span>RSS Feed</span>
        </div>
        <div className={styles.socialIcons}>
          <span>&#127760;</span>
          <span>&#9993;</span>
          <span>&#128279;</span>
        </div>
        <p className={styles.footerCopyright}>© 2024 SlowLiving Blog. All rights reserved.</p>
      </footer>
    </div>
  );
}
