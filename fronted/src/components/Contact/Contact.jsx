import { Link } from "react-router-dom";
import styles from "./Contact.module.css";

export default function Contact() {
  return (
    <div className={styles.page}>
      <header className={styles.navbar}>
        <div className={styles.navInner}>
          <Link to="/" className={styles.logo}>SlowLiving Blog</Link>
          <nav className={styles.navLinks}>
            <Link to="/">Home</Link>
            <Link to="/all-posts">All Posts</Link>
            <Link to="/about">About</Link>
            <Link to="/contact" className={styles.navActive}>Contact</Link>
          </nav>
          <div className={styles.navRight}>
            <span>&#128269;</span>
            <Link to="/login" className={styles.loginBtnOutline}>Login</Link>
            <Link to="/login" className={styles.registerBtn}>Register</Link>
          </div>
        </div>
      </header>

      <div className="container text-center">
        <h1 className={styles.title}>Let's Connect</h1>
        <p className={styles.subtitle}>
          Whether you have a question about our slow-living practices, want to collaborate, or
          just want to share a quiet moment of inspiration, we'd love to hear from you.
        </p>
      </div>

      <div className="container">
        <div className="row mt-4">
          <div className="col-lg-6">
            <div className={styles.formCard}>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label>Name</label>
                  <input type="text" placeholder="Evelyn Thorne" />
                </div>
                <div className="col-md-6 mb-3">
                  <label>Email</label>
                  <input type="email" placeholder="evelyn@slowliving.com" />
                </div>
              </div>
              <div className="mb-3">
                <label>Subject</label>
                <input type="text" placeholder="What is this regarding?" />
              </div>
              <div className="mb-3">
                <label>Message</label>
                <textarea rows="5" placeholder="Your thoughts here..."></textarea>
              </div>
              <button className={styles.sendBtn}>Send Message</button>
            </div>
          </div>

          <div className="col-lg-6">
            <img
              className={styles.sideImg}
              src="https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=600"
              alt="desk"
            />
            <h4 className={styles.otherWaysTitle}>Other ways to reach us</h4>
            <p className={styles.quoteText}>
              "True connection happens in the spaces between the digital noise."
            </p>

            <div className={styles.contactRow}>
              <span className={styles.iconCircle}>&#9993;</span>
              <div>
                <p className={styles.contactLabel}>Email</p>
                <p className={styles.contactValue}>hello@slowlivingblog.com</p>
              </div>
            </div>
            <div className={styles.contactRow}>
              <span className={styles.iconCircle}>&#128205;</span>
              <div>
                <p className={styles.contactLabel}>Studio</p>
                <p className={styles.contactValue}>
                  The Quiet Corner, 42 Mindfulness Way
                  <br />
                  Portland, Oregon 97201
                </p>
              </div>
            </div>
            <hr />
            <p className={styles.socialLabel}>SOCIAL PRESENCE</p>
            <div className={styles.socialRow}>
              <span>&#128247;</span>
              <span>&#128221;</span>
              <span>&#128225;</span>
            </div>
          </div>
        </div>
      </div>

      <footer className={styles.footer}>
        <h3 className={styles.footerLogo}>SlowLiving Blog</h3>
        <p className={styles.footerDesc}>
          Dedicated to documenting the art of intentionality and the beauty found in the
          everyday.
        </p>
        <div className={styles.footerLinks}>
          <span>Terms of Service</span>
          <span>Privacy Policy</span>
        </div>
        <p className={styles.footerCopyright}>© 2024 SlowLiving Blog. All rights reserved.</p>
      </footer>
    </div>
  );
}
