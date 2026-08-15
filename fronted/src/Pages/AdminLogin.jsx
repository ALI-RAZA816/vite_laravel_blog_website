import { Link } from "react-router-dom";
import styles from "../assets/AdminLogin.module.css";
import { IoLockClosedOutline } from "react-icons/io5";





export default function AdminLogin() {
  return (
    <div className={styles.page}>

      <div className={styles.center}>
        <div className={styles.iconBox}>&#128737;</div>
        <h1 className={styles.title}>Admin Workspace</h1>
        <p className={styles.subtitle}>Management Portal Security Check</p>

        <div className={styles.card}>
          <label>Work Email</label>
          <div className={styles.inputWrap}>
            <span>&#9993;</span>
            <input type="email" placeholder="name@slowliving.com" />
          </div>

          <div className={styles.tokenRow}>
            <label>Security Token</label>
            <span className={styles.forgot}>Forgot?</span>
          </div>
          <div className={styles.inputWrap}>
            <span><IoLockClosedOutline /></span>
            <input type="password" placeholder="••••••••" />
            <span className={styles.eye}>&#128065;</span>
          </div>

          <label className={styles.checkboxRow}>
            <input type="checkbox" /> Stay logged in for 24 hours
          </label>

          <Link to="/admin/dashboard" className={styles.accessBtn}>
            Access Management Portal &#8594;
          </Link>

          <hr className={styles.divider} />
          <div className={styles.linksRow}>
            <span>Support</span>
            <span>&bull;</span>
            <span>Public Site</span>
            <span>&bull;</span>
            <span>Status</span>
          </div>
          <p className={styles.footNote}>
            Authorized personnel only. All access attempts are logged and monitored for
            security purposes.
          </p>
        </div>
      </div>
    </div>
  );
}
