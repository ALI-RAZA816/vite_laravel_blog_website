import { useState } from "react";
import { Link } from "react-router-dom";
import styles from "../assets/Login.module.css";
import { FcGoogle } from "react-icons/fc";




export default function Register() {
  const [activeTab, setActiveTab] = useState("login");

  return (
    <div className={styles.page}>

      <div className={styles.center}>

        <div className={styles.card}>
          <h2 className={styles.cardTitle}>Create Account</h2>
          <p className={styles.cardSubtitle}>Create your editorial account</p>
          <form action="">
            <div>
                <label>Full Name</label>
                <input type="text" placeholder="Enter full name" />
            </div>
            <div>
                <label>Email Address</label>
                <input type="email" placeholder="name@example.com" />
            </div>
            <div>
                <label>Password</label>
                <input type="password" placeholder="••••••••" />
            </div>
            <div>
                <label>Confirm Password</label>
                <input type="password" placeholder="••••••••" />
            </div>
            <button className={styles.loginBtn}>Create Account</button>
          </form>
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
