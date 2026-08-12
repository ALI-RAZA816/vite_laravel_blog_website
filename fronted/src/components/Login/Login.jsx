import { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Login.module.css";

export default function Login() {
  const [activeTab, setActiveTab] = useState("login");

  return (
    <div className={styles.page}>
      <header className={styles.navbar}>
        <div className={styles.navInner}>
          <Link to="/" className={styles.logo}>SlowLiving Blog</Link>
          <nav className={styles.navLinks}>
            <Link to="/">Home</Link>
            <Link to="/about">About</Link>
          </nav>
        </div>
      </header>

      <div className={styles.center}>
        <div className={styles.tabSwitch}>
          <button
            className={activeTab === "login" ? styles.tabActive : styles.tab}
            onClick={() => setActiveTab("login")}
          >
            Login
          </button>
          <button
            className={activeTab === "register" ? styles.tabActive : styles.tab}
            onClick={() => setActiveTab("register")}
          >
            Register
          </button>
        </div>

        <div className={styles.card}>
          <h2 className={styles.cardTitle}>Welcome back</h2>
          <p className={styles.cardSubtitle}>Sign in to your editorial account</p>

          <label>Email Address</label>
          <input type="email" placeholder="name@example.com" />

          <div className={styles.passwordRow}>
            <label>Password</label>
            <span className={styles.forgot}>Forgot Password?</span>
          </div>
          <input type="password" placeholder="••••••••" />

          <button className={styles.loginBtn}>Login</button>

          <div className={styles.divider}>
            <span>OR CONTINUE WITH</span>
          </div>

          <div className={styles.socialBtns}>
            <button className={styles.socialBtn}>
              <span className={styles.google}>GOOGLE</span> Google
            </button>
            <button className={styles.socialBtn}>&#128038; Twitter</button>
          </div>
        </div>

        <p className={styles.terms}>
          By continuing, you agree to our <a href="#!">Terms of Service</a> and{" "}
          <a href="#!">Privacy Policy</a>.
        </p>
      </div>

      <footer className={styles.footer}>
        <div className={styles.footerLinks}>
          <span>Terms of Service</span>
          <span>Privacy Policy</span>
        </div>
        <p className={styles.footerCopyright}>© 2024 SlowLiving Blog. All rights reserved.</p>
      </footer>
    </div>
  );
}
