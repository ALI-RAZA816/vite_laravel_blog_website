
import { GiChestnutLeaf } from "react-icons/gi";
import styles from "../assets/Loader.module.css";

const Loader = () => {

  return (
    <div
      className={`${styles.overlay}`}
      role="status"
      aria-live="polite"
      aria-label="Website loading"
    >
      <div className={styles.center}>
        <div className={styles.badge}>
          <span className={`${styles.ring} ${styles.ringOne}`}></span>
          <span className={`${styles.ring} ${styles.ringTwo}`}></span>
          <div className={styles.badgeInner}>
            <GiChestnutLeaf className={styles.leafIcon} />
          </div>
        </div>
        <div className={styles.dots}>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </div>
  );
};

export default Loader;