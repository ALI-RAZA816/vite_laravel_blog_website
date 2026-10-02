import styles from "../assets/Contact.module.css";
import { IoCameraOutline } from "react-icons/io5";
import { GrNotes } from "react-icons/gr";
import { GiRadarDish } from "react-icons/gi";
import { AiFillSnippets } from "react-icons/ai";
import { useContact } from "../Context/ContactContext";



export default function Contact() {

  const {formHandler,submitMessage, contactForm} = useContact();

  return (
    <div className={styles.page}>

      <div className="container text-center">
        <h1 className={styles.title}>Get in Touch</h1>
        <p className={styles.subtitle}>
          Have a question about our blog, want to write as a guest author, suggest a topic,
          or report an issue? Send us a message and our team will get back to you as soon
          as possible.
        </p>
      </div>

      <div className="container">
        <div className="row mt-4">
          <div className="col-lg-6">
            <form onSubmit={submitMessage} className={styles.formCard}>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label>Name</label>
                  <input type="text" value={contactForm.name} onChange={formHandler} name="name" placeholder="John Carter" />
                </div>
                <div className="col-md-6 mb-3">
                  <label>Email</label>
                  <input type="email" value={contactForm.email} onChange={formHandler} name="email" placeholder="john@example.com" />
                </div>
              </div>
              <div className="mb-3">
                <label>Subject</label>
                <input type="text" value={contactForm.subject} onChange={formHandler} name="subject" placeholder="What is this regarding?" />
              </div>
              <div className="mb-3">
                <label>Message</label>
                <textarea rows="5" value={contactForm.message} onChange={formHandler} name="message" placeholder="Write your message here..."></textarea>
              </div>
              <button type="submit" className={styles.sendBtn}>Send Message</button>
            </form>
          </div>

          <div className="col-lg-6">
            <img
              className={styles.sideImg}
              src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600"
              alt="Laptop and phone on a work desk"
            />
            <h4 className={styles.otherWaysTitle}>Other ways to reach us</h4>
            <p className={styles.quoteText}>
              "Every great blog starts with a conversation. We'd love to hear yours."
            </p>

            <div className={styles.contactRow}>
              <span className={styles.iconCircle}>&#9993;</span>
              <div>
                <p className={styles.contactLabel}>Email</p>
                <p className={styles.contactValue}>support@yourblog.com</p>
              </div>
            </div>
            <div className={styles.contactRow}>
              <span className={styles.iconCircle}><AiFillSnippets /></span>
              <div>
                <p className={styles.contactLabel}>Editorial Office</p>
                <p className={styles.contactValue}>
                  Content Team, 25 Main Boulevard
                  <br />
                  Lahore, Punjab 54000
                </p>
              </div>
            </div>
            <hr />
            <p className={styles.socialLabel}>FOLLOW US</p>
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
