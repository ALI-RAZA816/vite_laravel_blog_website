import { useState } from "react";
import { Link } from "react-router-dom";
import styles from "../assets/Login.module.css";
import { FcGoogle } from "react-icons/fc";




export default function Login() {
  const [activeTab, setActiveTab] = useState("login");

  return (
    <div className={styles.page}>

      <div className={styles.center}>
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
              <span className={styles.google}><FcGoogle /></span> Google
            </button>
          </div>
        </div>

        <p className={styles.terms}>
          By continuing, you agree to our <a href="#!">Terms of Service</a> and{" "}
          <a href="#!">Privacy Policy</a>.
        </p>
      </div>
    </div>
  );
}
