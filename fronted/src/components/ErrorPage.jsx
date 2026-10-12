import { Link, useParams } from "react-router-dom";
import styles from "../assets/NotFound.module.css";
import { BsCompass, BsArrowLeft } from "react-icons/bs";

const ErrorPage = () => {

  const {code} = useParams();

  return (
    <div className={styles.page}>
      <div className={styles.content}>
        <div className={styles.iconWrapper}>
          <BsCompass className={styles.compassIcon} />
        </div>

        {Number(code) && <h1 className={styles.code}>{Number(code)}</h1>}
        <h2 className={styles.title}>{Number(code) === 401 ? 'Unauthorized' : Number(code) === 403 ? 'Forbidden' : Number(code) === 409 ? 'Conflict' : Number(code) === 429 ? 'Too Many Requests' : Number(code) === 400 ? 'Bad Request' : Number(code) === 404 ? 'Not Found': Number(code) === 500 ? 'Server Error': 'Something went wrong'}</h2>
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

export default ErrorPage;