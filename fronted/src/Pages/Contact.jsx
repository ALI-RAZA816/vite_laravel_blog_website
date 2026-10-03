import styles from "../assets/Contact.module.css";
import { IoCameraOutline, IoMailOutline } from "react-icons/io5";
import { GrNotes } from "react-icons/gr";
import { GiRadarDish } from "react-icons/gi";
import { AiFillSnippets } from "react-icons/ai";
import { useContact } from "../Context/ContactContext";

export default function Contact() {

  const { formHandler, submitMessage, contactForm } = useContact();

  return (
    <div className={styles.page}>

      {/* Intro */}
      <div className="container text-center">
        <p className={styles.eyebrow}>Contact</p>
        <h1 className={styles.title}>Get in Touch</h1>
        <p className={styles.subtitle}>
          Have a question about our blog, want to write as a guest author, suggest a topic,
          or report an issue? Send us a message and our team will get back to you as soon
          as possible.
        </p>
      </div>

      <div className="container">
        <div className="row mt-5 gy-5">

          {/* Form */}
          <div className="col-lg-6">
            <form onSubmit={submitMessage} className={styles.formCard}>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label htmlFor="contact-name">Name</label>
                  <input id="contact-name" type="text" value={contactForm.name} onChange={formHandler} name="name" placeholder="John Carter" />
                </div>
                <div className="col-md-6 mb-3">
                  <label htmlFor="contact-email">Email</label>
                  <input id="contact-email" type="email" value={contactForm.email} onChange={formHandler} name="email" placeholder="john@example.com" />
                </div>
              </div>
              <div className="mb-3">
                <label htmlFor="contact-subject">Subject</label>
                <input id="contact-subject" type="text" value={contactForm.subject} onChange={formHandler} name="subject" placeholder="What is this regarding?" />
              </div>
              <div className="mb-3">
                <label htmlFor="contact-message">Message</label>
                <textarea id="contact-message" rows="5" value={contactForm.message} onChange={formHandler} name="message" placeholder="Write your message here..."></textarea>
              </div>
              <button type="submit" className={styles.sendBtn}>Send Message</button>
            </form>
          </div>

          {/* Info */}
          <div className="col-lg-6">
            <div className={styles.sideImgWrap}>
              <img
                className={styles.sideImg}
                src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800"
                alt="Laptop and phone on a work desk"
              />
            </div>
            <h4 className={styles.otherWaysTitle}>Other ways to reach us</h4>
            <p className={styles.quoteText}>
              "Every great blog starts with a conversation. We'd love to hear yours."
            </p>

            <div className={styles.contactRow}>
              <span className={styles.iconCircle}><IoMailOutline /></span>
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

            <hr className={styles.divider} />

            <p className={styles.socialLabel}>Follow Us</p>
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