import styles from "../assets/About.module.css";
import { IoCameraOutline, IoCreateOutline, IoPeopleOutline } from "react-icons/io5";
import { GoSearch } from "react-icons/go";

export default function About() {
  return (
    <div className={styles.page}>

      {/* Intro */}
      <div className="container">
        <div className="row align-items-center gy-4 pt-5">
          <div className="col-lg-6">
            <p className={styles.eyebrow}>About Our Blog Platform</p>
            <h1 className={styles.title}>
              A simple space to write, publish and share your stories with the world.
            </h1>
            <p className={styles.quoteLine}>
              "Great content deserves a great home. We make publishing easy so you can
              focus on what you want to say."
            </p>
          </div>
          <div className="col-lg-6">
            <div className={styles.heroImgWrap}>
              <img
                className={styles.heroImg}
                src="https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800"
                alt="Writing a blog post on a laptop"
              />
            </div>
          </div>
        </div>

        {/* Story */}
        <div className="row mt-5 pt-4">
          <div className="col-lg-8 offset-lg-2">
            <h3 className={styles.journeyTitle}>Why We Built This Blog</h3>
            <p className={styles.paragraph}>
              Managing a blog should not feel complicated. Many writers spend more time
              fighting with tools than actually writing. We wanted a platform where creating,
              editing and publishing posts takes only a few clicks.
            </p>
            <p className={styles.paragraph}>
              Our content management system lets admins and authors handle everything from one
              dashboard, including posts, categories, tags and media. No technical knowledge is
              needed, just your ideas and a little time.
            </p>
            <blockquote className={styles.quoteBox}>
              "When the tools stay out of the way, the writing gets better."
            </blockquote>
            <p className={styles.paragraph}>
              This blog is a place for tutorials, tips, stories and insights on technology,
              lifestyle and creativity. Whether you are a reader looking for something
              valuable or a writer ready to share, you are in the right place.
            </p>
          </div>
        </div>
      </div>

      {/* Features */}
      <div className={styles.fillDaysSection}>
        <div className="container text-center">
          <h2 className={styles.fillDaysTitle}>What You Can Do Here</h2>
          <p className={styles.fillDaysSubtitle}>The key features that power our blog.</p>

          <div className="row mt-5 text-start">
            <div className="col-md-6 mb-4">
              <div className={styles.pillarCard}>
                <div className={styles.pillarIcon}><IoCameraOutline /></div>
                <h4>Media Library</h4>
                <p>
                  Upload and manage images for your posts in one place. Add featured images
                  and visuals that make every article more engaging.
                </p>
                <img
                  src="https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=600"
                  alt="Coffee and notebook on a desk"
                />
              </div>
            </div>

            <div className="col-md-6 mb-4">
              <div className={styles.pillarCard}>
                <div className={styles.rowBetween}>
                  <h4>Search &amp; Discovery</h4>
                  <div className={styles.pillarIconSmall}><GoSearch /></div>
                </div>
                <p>
                  Readers can quickly find posts by keywords, categories and tags.
                </p>
              </div>

              <div className="row mt-3 g-3">
                <div className="col-6">
                  <div className={styles.philosophyCard}>
                    <span className={styles.cardLabel}><IoCreateOutline /> Simplicity</span>
                    <h5>Clean Editor</h5>
                  </div>
                </div>
                <div className="col-6">
                  <div className={styles.impactCard}>
                    <span className={styles.cardLabel}><IoPeopleOutline /> Community</span>
                    <h5>Reader Friendly</h5>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}