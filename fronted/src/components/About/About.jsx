import { Link } from "react-router-dom";
import styles from "./About.module.css";

export default function About() {
  return (
    <div className={styles.page}>
      <header className={styles.navbar}>
        <div className={styles.navInner}>
          <Link to="/" className={styles.logo}>SlowLiving Blog</Link>
          <nav className={styles.navLinks}>
            <Link to="/">Home</Link>
            <Link to="/about" className={styles.navActive}>About</Link>
            <Link to="/all-posts">All Posts</Link>
            <Link to="/contact">Contact</Link>
          </nav>
          <div className={styles.navRight}>
            <span className={styles.searchIcon}>&#128269;</span>
            <Link to="/login" className={styles.loginLink}>Login</Link>
            <Link to="/login" className={styles.registerBtn}>Register</Link>
          </div>
        </div>
      </header>

      <div className="container">
        <div className="row align-items-center">
          <div className="col-lg-6">
            <p className={styles.eyebrow}>THE VOICE BEHIND THE WORDS</p>
            <h1 className={styles.title}>
              Designing a life with intention, one slow breath at a time.
            </h1>
            <p className={styles.quoteLine}>
              "Slow living isn't about doing things at a snail's pace. It's about doing
              everything at the right pace."
            </p>
          </div>
          <div className="col-lg-6">
            <img
              className={styles.heroImg}
              src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=500"
              alt="Elena"
            />
          </div>
        </div>

        <div className="row mt-5">
          <div className="col-lg-8 offset-lg-2">
            <h3 className={styles.journeyTitle}>My Journey to the Slow Lane</h3>
            <p className={styles.paragraph}>
              For years, I lived my life in the "fast-forward" setting. Coffee was a fuel for
              spreadsheets rather than a ritual to enjoy. My home was a pitstop between
              deadlines, and my digital life was a cacophony of notifications that never seemed
              to sleep.
            </p>
            <p className={styles.paragraph}>
              Everything changed during a quiet morning in late autumn. I realized I was so busy
              curating a life that I had forgotten to actually live it. That was the day I
              decided to reclaim my time, my focus, and my peace.
            </p>
            <blockquote className={styles.quoteBox}>
              "I discovered that when you stop racing through life, you actually start seeing
              the scenery."
            </blockquote>
            <p className={styles.paragraph}>
              SlowLiving Blog was born from this transition. It's a space where I explore what
              it means to live intentionally in an age of distraction. From the art of sourdough
              to the discipline of digital minimalism, this is my laboratory for a more
              meaningful existence.
            </p>
          </div>
        </div>
      </div>

      <div className={styles.fillDaysSection}>
        <div className="container text-center">
          <h2 className={styles.fillDaysTitle}>What Fills My Days</h2>
          <p className={styles.fillDaysSubtitle}>The pillars of my intentional lifestyle.</p>

          <div className="row mt-4 text-start">
            <div className="col-md-6 mb-4">
              <div className={styles.pillarCard}>
                <div className={styles.pillarIcon}>&#128247;</div>
                <h4>Atmospheric Photography</h4>
                <p>
                  Capturing the quiet moments and subtle light shifts that most people rush
                  past. I believe every photograph should tell a story of stillness.
                </p>
                <img
                  src="https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=400"
                  alt="coffee"
                />
              </div>
            </div>
            <div className="col-md-6 mb-4">
              <div className={styles.pillarCard}>
                <div className={styles.rowBetween}>
                  <h4>Slow Cooking</h4>
                  <div className={styles.pillarIconSmall}>&#127859;</div>
                </div>
                <p>
                  Finding meditative joy in the kitchen through fermentation and heirloom
                  recipes.
                </p>
              </div>
              <div className="row mt-3">
                <div className="col-6">
                  <div className={styles.philosophyCard}>
                    <span>&#128683; PHILOSOPHY</span>
                    <h5>Digital Minimalism</h5>
                  </div>
                </div>
                <div className="col-6">
                  <div className={styles.impactCard}>
                    <span>&#127811; IMPACT</span>
                    <h5>Zero Waste Living</h5>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.connectSection}>
        <h3>Let's Connect in the Real World</h3>
        <div className={styles.connectIcons}>
          <div>
            <span>&#9993;</span>
            <p>Newsletter</p>
          </div>
          <div>
            <span>&#128247;</span>
            <p>Instagram</p>
          </div>
          <div>
            <span>&#9654;</span>
            <p>YouTube</p>
          </div>
          <div>
            <span>&#128220;</span>
            <p>Substack</p>
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
