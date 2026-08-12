import { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./UserProfile.module.css";

export default function UserProfile() {
  const [tab, setTab] = useState("bookmarked");

  return (
    <div className={styles.page}>
      <header className={styles.navbar}>
        <div className={styles.navInner}>
          <Link to="/" className={styles.logo}>SlowLiving Blog</Link>
          <nav className={styles.navLinks}>
            <Link to="/">Home</Link>
            <Link to="/all-posts">All Posts</Link>
            <Link to="/about">About</Link>
            <Link to="/contact">Contact</Link>
          </nav>
          <div className={styles.navRight}>
            <span>&#128269;</span>
            <span className={styles.divider}>|</span>
            <img
              src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=80"
              alt="Elena S."
              className={styles.navAvatar}
            />
            <span>Elena S.</span>
          </div>
        </div>
      </header>

      <div className="container">
        <div className={styles.profileHeader}>
          <div className={styles.avatarWrap}>
            <img
              src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200"
              alt="Elena Sterling"
            />
            <span className={styles.editIcon}>&#9998;</span>
          </div>
          <div>
            <h2 className={styles.name}>Elena Sterling</h2>
            <p className={styles.bio}>
              Writer and mindfulness advocate. Exploring the intersection of digital minimalism
              and intentional living through the lens of slow-form storytelling.
            </p>
            <div className={styles.statRow}>
              <button className={styles.statBtn}>&#128220; 24 Bookmarked</button>
              <button className={styles.statBtn}>&#9825; 112 Liked</button>
              <span className={styles.editProfile}>Edit Public Profile</span>
            </div>
          </div>
        </div>

        <div className="row mt-4">
          <div className="col-lg-3">
            <div className={styles.settingsCard}>
              <h5>Account Settings</h5>
              <div className={styles.settingsActive}>&#128100; Personal Info &rsaquo;</div>
              <div className={styles.settingsItem}>&#9993; Email Preferences &rsaquo;</div>
              <div className={styles.settingsItem}>&#128737; Security & Privacy &rsaquo;</div>
              <div className={styles.signOut}>&#8618; Sign Out</div>
            </div>

            <div className={styles.premiumCard}>
              <span className={styles.premiumLabel}>PREMIUM MEMBER</span>
              <h4>Unlock Full Archives</h4>
              <button>Upgrade Now</button>
            </div>
          </div>

          <div className="col-lg-9">
            <div className={styles.tabRow}>
              <span
                className={tab === "bookmarked" ? styles.tabActive : styles.tab}
                onClick={() => setTab("bookmarked")}
              >
                Bookmarked Posts
              </span>
              <span
                className={tab === "liked" ? styles.tabActive : styles.tab}
                onClick={() => setTab("liked")}
              >
                Liked Stories
              </span>
              <span
                className={tab === "history" ? styles.tabActive : styles.tab}
                onClick={() => setTab("history")}
              >
                Reading History
              </span>
              <span className={styles.gridIcon}>&#9638;</span>
            </div>

            <div className={styles.featuredPost}>
              <img
                src="https://images.unsplash.com/photo-1470770903676-69b98201ea1c?w=600"
                alt="mountains"
              />
              <div className={styles.featuredContent}>
                <span className={styles.badge}>MINDFULNESS</span>
                <h4>The Art of Silence in a Digital Age</h4>
                <p>"In the noise of notifications, we often forget the texture of our own...</p>
                <div className={styles.readRow}>
                  <span>12 min read</span>
                  <span className={styles.bookmarkIcon}>&#128278;</span>
                </div>
              </div>
            </div>

            <div className="row mt-3">
              <div className="col-md-6">
                <div className={styles.smallCard}>
                  <img
                    src="https://images.unsplash.com/photo-1517842645767-c639042777db?w=400"
                    alt="workspace"
                  />
                  <span className={styles.tag}>WORKSPACE</span>
                  <h5>Designing a Productive Morning Routine</h5>
                  <div className={styles.readRow}>
                    <span>Oct 14 • 8 min</span>
                    <span className={styles.bookmarkIcon}>&#128278;</span>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className={styles.smallCard}>
                  <img
                    src="https://images.unsplash.com/photo-1466781783364-36c955e42a7f?w=400"
                    alt="botany"
                  />
                  <span className={styles.tag}>BOTANY</span>
                  <h5>Bringing Nature Indoors: A Practical Guide</h5>
                  <div className={styles.readRow}>
                    <span>Oct 02 • 5 min</span>
                    <span className={styles.bookmarkIcon}>&#128278;</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="text-center mt-4">
              <button className={styles.loadMore}>Load More Content &#9662;</button>
            </div>
          </div>
        </div>
      </div>

      <footer className={styles.footer}>
        <h3 className={styles.footerLogo}>SlowLiving Blog</h3>
        <div className={styles.footerLinks}>
          <span>Terms of Service</span>
          <span>Privacy Policy</span>
        </div>
        <p className={styles.footerCopyright}>© 2024 SlowLiving Blog. All rights reserved.</p>
      </footer>
    </div>
  );
}
