import { Link } from "react-router-dom";
import styles from "../assets/NotFound.module.css";
import { BsCompass, BsArrowLeft } from "react-icons/bs";

const NotFound = () => {
  return (
    <div className={styles.page}>
      <div className={styles.content}>
        <div className={styles.iconWrapper}>
          <BsCompass className={styles.compassIcon} />
        </div>

        <h1 className={styles.code}>404</h1>
        <h2 className={styles.title}>Not Found</h2>
        <p className={styles.subtitle}>
          The story you're looking for doesn't exist, or it may have
          moved somewhere quieter. Let's get you back to familiar ground.
        </p>

        <div className={styles.actions}>
          <Link to="/" className={styles.homeBtn}>
            <BsArrowLeft className={styles.btnIcon} />
            Back to Homepage
          </Link>
        </div>

        <div className={styles.footerLinks}>
          <Link to="/">Home</Link>
          <span className={styles.dot}>•</span>
          <a href="#">Support</a>
          <span className={styles.dot}>•</span>
          <a href="#">Status</a>
        </div>
      </div>
    </div>
  );
};

export default NotFound;