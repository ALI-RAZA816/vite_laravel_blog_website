import { Link } from "react-router-dom";
import styles from "./CategoryArchive.module.css";

const subcategories = ["Digital Minimalism", "Capsule Wardrobes", "Mindful Consumption", "Zero Waste Living"];

const posts = [
  {
    img: "https://images.unsplash.com/photo-1517705008128-361805f42e86?w=300",
    tag: "INTERIORS",
    date: "March 12",
    title: "The Curated Home: Objects with Purpose",
    excerpt: "Learning to distinguish between things we need, things we use, and things we...",
  },
  {
    img: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=300",
    tag: "LIFESTYLE",
    date: "March 08",
    title: "Sensory Minimalism: Less Noise, More Feeling",
    excerpt: "How reducing visual and auditory clutter heightens our other senses and...",
  },
  {
    img: "https://images.unsplash.com/photo-1517842645767-c639042777db?w=300",
    tag: "PRODUCTIVITY",
    date: "March 03",
    title: "The Joy of the Empty Calendar",
    excerpt: "Redefining productivity from 'doing more' to 'being more effective' by...",
  },
  {
    img: "https://images.unsplash.com/photo-1556911220-bff31c812dba?w=300",
    tag: "ARCHITECTURE",
    date: "Feb 28",
    title: "Functional Beauty: The Minimalist Kitchen",
    excerpt: "A tour of spaces where utility and aesthetic are perfectly balanced, leaving...",
  },
  {
    img: "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=300",
    tag: "FASHION",
    date: "Feb 20",
    title: "Clothing as a Second Skin: The Capsule Approach",
    excerpt: "How curating a limited wardrobe of high-quality pieces can simplify your mornin...",
  },
  {
    img: "https://images.unsplash.com/photo-1444464666168-49d633b86797?w=300",
    tag: "NATURE",
    date: "Feb 15",
    title: "Micro-Minimalism: Finding Wonder in the Small",
    excerpt: "Practicing the art of observation to find profound satisfaction in the smallest...",
  },
];

export default function CategoryArchive() {
  return (
    <div className={styles.page}>
      <header className={styles.navbar}>
        <div className={styles.navInner}>
          <Link to="/" className={styles.logo}>SlowLiving Blog</Link>
          <nav className={styles.navLinks}>
            <Link to="/">Home</Link>
            <Link to="/all-posts" className={styles.navActive}>All Posts</Link>
            <Link to="/about">About</Link>
            <Link to="/contact">Contact</Link>
          </nav>
          <div className={styles.navRight}>
            <span>&#128269;</span>
            <Link to="/login" className={styles.loginLink}>Login</Link>
            <Link to="/login" className={styles.registerBtn}>Register</Link>
          </div>
        </div>
      </header>

      <div className="container">
        <p className={styles.eyebrow}>— CATEGORY ARCHIVE</p>
        <h1 className={styles.title}>Minimalism</h1>
        <p className={styles.description}>
          "Minimalism is not about having less, it's about making room for more of what
          matters." Exploring the intersection of intentional space, mental clarity, and the
          quiet beauty of essential living.
        </p>

        <div className="row mb-4">
          <div className="col-lg-8">
            <div className={styles.featuredCard}>
              <img
                src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=800"
                alt="featured"
              />
              <span className={styles.longRead}>LONG READ</span>
              <span className={styles.readTime}>12 min read</span>
            </div>
            <h3 className={styles.featuredTitle}>
              The Architecture of Silence: Designing Spaces That Breathe
            </h3>
            <p className={styles.featuredExcerpt}>
              We delve into the philosophy of structural subtraction—how removing the
              non-essential from our physical environments can lead to a profound expansion of
              mental clarity and creative focus.
            </p>
          </div>
          <div className="col-lg-4">
            <div className={styles.sideBox}>
              <h4 className={styles.sideBoxTitle}>CURATED SUBCATEGORIES</h4>
              {subcategories.map((s, i) => (
                <div className={styles.subItem} key={i}>
                  <span>{s}</span>
                  <span>&rsaquo;</span>
                </div>
              ))}
            </div>
            <div className={styles.essayCard}>
              <span className={styles.essayLabel}>LATEST ESSAY</span>
              <h5>The Art of Essential Tools</h5>
            </div>
          </div>
        </div>

        <div className={styles.archiveBar}>
          <span>Archive: Minimalism</span>
          <div className={styles.sortRow}>
            <span>Sort by: <strong>Latest</strong> &#9662;</span>
            <span>&#9776; Filter</span>
          </div>
        </div>

        <div className="row">
          {posts.map((p, i) => (
            <div className="col-md-4" key={i}>
              <img src={p.img} alt={p.title} className={styles.gridImg} />
              <div className={styles.meta}>
                <span className={styles.tag}>{p.tag}</span> • {p.date}
              </div>
              <h3 className={styles.postTitle}>{p.title}</h3>
              <p className={styles.postExcerpt}>{p.excerpt}</p>
            </div>
          ))}
        </div>

        <div className={styles.pagination}>
          <button className={styles.pageBtn}>&larr;</button>
          <button className={`${styles.pageBtn} ${styles.pageActive}`}>1</button>
          <button className={styles.pageBtn}>2</button>
          <button className={styles.pageBtn}>3</button>
          <span>...</span>
          <button className={styles.pageBtn}>12</button>
          <button className={styles.pageBtn}>&rarr;</button>
        </div>
      </div>

      <footer className={styles.footer}>
        <h3 className={styles.footerLogo}>SlowLiving Blog</h3>
        <div className={styles.footerLinks}>
          <span>Terms of Service</span>
          <span>Privacy Policy</span>
        </div>
        <p className={styles.footerCopyright}>© 2024 SlowLiving Blog. All rights reserved.</p>
        <div className={styles.socialIcons}>
          <span>&#120143;</span>
          <span>&#128247;</span>
        </div>
      </footer>
    </div>
  );
}
