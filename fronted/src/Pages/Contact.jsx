import { Link } from "react-router-dom";
import styles from "../assets/Contact.module.css";
import { IoCameraOutline } from "react-icons/io5";
import { GrNotes } from "react-icons/gr";
import { GiRadarDish } from "react-icons/gi";
import { AiFillSnippets } from "react-icons/ai";



export default function Contact() {
  return (
    <div className={styles.page}>

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
              <span className={styles.iconCircle}><AiFillSnippets /></span>
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
              <span><IoCameraOutline /></span>
              <span><GrNotes /></span>
              <span><GiRadarDish /></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
