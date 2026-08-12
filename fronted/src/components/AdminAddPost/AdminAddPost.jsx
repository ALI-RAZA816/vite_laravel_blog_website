import { useState } from "react";
import AdminLayout from "../AdminLayout/AdminLayout.jsx";
import styles from "./AdminAddPost.module.css";

export default function AdminAddPost() {
  const [published, setPublished] = useState(true);

  return (
    <AdminLayout active="posts" searchPlaceholder="Search posts..." userName="Alex Rivera">
      <div className={styles.pageHeader}>
        <h1>Add New Post</h1>
      </div>

      <div className="row">
        <div className="col-lg-9">
          <div className={styles.titleCard}>
            <input
              className={styles.titleInput}
              defaultValue="The Art of Mindful Living: A"
            />
          </div>

          <div className={styles.editorCard}>
            <div className={styles.toolbar}>
              <span className={styles.bold}>B</span>
              <span className={styles.italic}>I</span>
              <span className={styles.underline}>U</span>
              <span>&#8221;&#8221;</span>
              <span>&#9776;</span>
              <span>&#128279;</span>
              <span>&#128247;</span>
              <span className={styles.wordCount}>Words: 1,240</span>
            </div>
            <div className={styles.editorBody}>
              <p>
                Slow living isn't just a trend; it's a fundamental shift in how we perceive time
                and our place in the world. In today's hyper-connected environment, the constant
                noise of notifications and the pressure of immediate responses can leave us
                feeling drained and disconnected from our own intentions.
              </p>
              <p>
                By embracing a slower pace, we allow ourselves the space to truly experience the
                present moment. This doesn't mean doing everything slowly, but rather doing
                everything at the right speed&mdash;finding the 'tempo giusto' for every
                activity.
              </p>
              <h3>Creating Rituals of Focus</h3>
              <p>
                One of the most effective ways to transition into this lifestyle is through the
                creation of intentional rituals. Whether it's the meticulous process of brewing
                a morning coffee or a dedicated...
              </p>
            </div>
          </div>
        </div>

        <div className="col-lg-3">
          <div className={styles.sideCard}>
            <h6>STATUS & VISIBILITY</h6>
            <div className={styles.statusRow}>
              <span>Status</span>
              <button
                className={published ? styles.toggleOn : styles.toggleOff}
                onClick={() => setPublished(!published)}
              >
                <span className={styles.knob}></span>
              </button>
              <span className={styles.statusText}>{published ? "Published" : "Draft"}</span>
            </div>
            <div className={styles.statusRow}>
              <span>Visibility</span>
              <span className={styles.linkText}>Public</span>
            </div>
            <div className={styles.statusRow}>
              <span>Publish Date</span>
              <span className={styles.linkText}>Immediately</span>
            </div>
            <button className={styles.updateBtn}>Update Post</button>
            <button className={styles.draftBtn}>Save Draft</button>
          </div>

          <div className={styles.sideCard}>
            <div className={styles.sideCardHeader}>
              <h6>FEATURED IMAGE</h6>
              <span className={styles.removeLink}>Remove</span>
            </div>
            <img
              src="https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=400"
              alt="featured"
              className={styles.featuredImg}
            />
          </div>

          <div className={styles.sideCard}>
            <h6>CATEGORIES</h6>
            <select className={styles.categorySelect}>
              <option>Mindfulness</option>
            </select>
            <span className={styles.addCategory}>+ Add New Category</span>
          </div>

          <div className={styles.sideCard}>
            <h6>TAGS</h6>
            <div className={styles.tags}>
              <span className={styles.tag}>Slow Living &times;</span>
              <span className={styles.tag}>Wellness &times;</span>
              <span className={styles.tag}>Rituals &times;</span>
            </div>
            <input className={styles.tagInput} placeholder="Add a tag..." />
          </div>

          <p className={styles.trashLink}>&#128465; Move to Trash</p>
        </div>
      </div>
    </AdminLayout>
  );
}
