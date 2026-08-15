import { Link } from "react-router-dom";
import styles from '../assets/Home.module.css';
import { IoMdSearch } from "react-icons/io";




const recentStories = [
  {
    img: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400",
    category: "LIFESTYLE",
    date: "March 12, 2024",
    title: "Morning Rituals: The Hidden Power of Coffee & Contemplation",
    excerpt:
      "Mornings are the architect of our days. Exploring why setting an intentional tone at dawn changes...",
  },
  {
    img: "https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?w=400",
    category: "TRAVEL",
    date: "March 10, 2024",
    title: "Wandering Through the Cobblestone Streets of Tuscany",
    excerpt:
      "Beyond the tourist maps lies the true soul of Italy. A journey into the heart of rural villages and ancien...",
  },
  {
    img: "https://images.unsplash.com/photo-1517673132405-a56a62b18caf?w=400",
    category: "CREATIVITY",
    date: "March 08, 2024",
    title: "The Simple Joy of Cursive: Why Writing by Hand Matters",
    excerpt:
      "In a world of keyboards, the tactile connection of pen to paper offers a unique mental release and creativ...",
  },
  {
    img: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400",
    category: "WELLNESS",
    date: "March 05, 2024",
    title: "Seasonal Eating: Nourishing Your Body with the Earth's Cycles",
    excerpt:
      "Understanding the rhythm of agriculture and how aligning our diet with nature improves our...",
  },
  {
    img: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400",
    category: "CURATION",
    date: "March 01, 2024",
    title: "Curating a Home Library: Quality Over Quantity Always Wins",
    excerpt:
      "How to select books that truly matter to you, creating a sanctuary of knowledge rather than a...",
  },
  {
    img: "https://images.unsplash.com/photo-1470770903676-69b98201ea1c?w=400",
    category: "MINDFULNESS",
    date: "Feb 28, 2024",
    title: "The Importance of Staring at the Horizon Every Single Day",
    excerpt:
      "Why our eyes and minds need expansive views to counteract the claustrophobia of small digital...",
  },
];

const popular = [
  { title: "The Philosophy of Wabi-Sabi in Modern Homes", date: "March 04 • 5 min read", img: "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=100" },
  { title: "Unplugging: My 30-Day Digital Detox Journey", date: "Feb 22 • 8 min read", img: "https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?w=100" },
  { title: "Sourdough Secrets: Why Slow Bread is Better", date: "Feb 15 • 12 min read", img: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=100" },
];

const categories = [
  "Travel (12)",
  "Lifestyle (8)",
  "Wellness (15)",
  "Creativity (7)",
  "Food (10)",
  "Minimalism (22)",
];

export default function Home() {
  return (
    <div className={styles.page}>


      {/* Hero */}
      <div className="container">
        <div className={`${styles.hero} mb-3`}>
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
              <Link to="/all-posts" className={styles.viewAll}>View All &rsaquo;</Link>
            </div>
            <div className="row">
              {recentStories.map((post, i) => (
                <div className="col-md-6" key={i}>
                  <div className={styles.card}>
                    <img src={post.img} alt={post.title} className={styles.cardImg} />
                    <div className={styles.cardMeta}>
                      <span className={styles.cardCategory}>{post.category}</span>
                      <span className={styles.cardDot}>•</span>
                      <span>{post.date}</span>
                    </div>
                    <h3 className={styles.cardTitle}>{post.title}</h3>
                    <p className={styles.cardExcerpt}>{post.excerpt}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className={styles.pagination}>
              <button className={styles.pageBtn}>&lsaquo;</button>
              <button className={`${styles.pageBtn} ${styles.pageActive}`}>1</button>
              <button className={styles.pageBtn}>2</button>
              <button className={styles.pageBtn}>3</button>
              <span>...</span>
              <button className={styles.pageBtn}>&rsaquo;</button>
            </div>
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
                {categories.map((c, i) => (
                  <span key={i} className={styles.pill}>{c}</span>
                ))}
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
