import { Link } from "react-router-dom";
import styles from "../assets/NotFound.module.css";
import { BsCompass, BsArrowLeft } from "react-icons/bs";
import { useContext } from "react";
import { AppContext } from "../Context/AppContext";

const Unauthorized = () => {

  const {statuCode} = useContext(AppContext);

  return (
    <div className={styles.page}>
      <div className={styles.content}>
        <div className={styles.iconWrapper}>
          <BsCompass className={styles.compassIcon} />
        </div>

        <h1 className={styles.code}>{statuCode}</h1>
        <h2 className={styles.title}>{statuCode === 401 ? 'Unauthorized' : statuCode === 403 ? 'Forbidden' : statuCode === 409 ? 'Conflict' : statuCode === 422 ? 'Unprocessable Entity' : statuCode === 429 ? 'Too Many Requests' : statuCode === 400 ? 'Bad Request' : statuCode === 404 ? 'Not Found': statuCode === 500 ? 'Server Error': 'Something went wrong'}</h2>
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

export default Unauthorized;