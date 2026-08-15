import React, { useState } from "react";
import {
  BsTypeBold,
  BsTypeItalic,
  BsTypeUnderline,
  BsBlockquoteLeft,
  BsListUl,
  BsLink45Deg,
  BsImage,
  BsXLg,
  BsPlusLg,
  BsTrashFill,
} from "react-icons/bs";
import styles from "../assets/AddAdminPost.module.css";

const initialTags = ["Slow Living", "Wellness", "Rituals"];

const AddAdminPost = () => {
  const [tags, setTags] = useState(initialTags);
  const [tagInput, setTagInput] = useState("");
  const [isPublished, setIsPublished] = useState(true);

  const removeTag = (index) => {
    setTags(tags.filter((_, i) => i !== index));
  };

  const addTag = (e) => {
    if (e.key === "Enter" && tagInput.trim() !== "") {
      setTags([...tags, tagInput.trim()]);
      setTagInput("");
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className="row g-4">
        {/* Editor column */}
        <div className="col-12 col-xl-8">
          <div className={styles.titleCard}>
            <input
              type="text"
              className={styles.titleInput}
              defaultValue="The Art of Mindful Living: A Guide"
            />
          </div>

          <div className={styles.editorCard}>
            <div className={`d-flex align-items-center justify-content-between ${styles.toolbar}`}>
              <div className="d-flex align-items-center">
                <button className={styles.toolBtn}><BsTypeBold /></button>
                <button className={styles.toolBtn}><BsTypeItalic /></button>
                <button className={styles.toolBtn}><BsTypeUnderline /></button>
                <span className={styles.toolDivider}></span>
                <button className={styles.toolBtn}><BsBlockquoteLeft /></button>
                <button className={styles.toolBtn}><BsListUl /></button>
                <button className={styles.toolBtn}><BsLink45Deg /></button>
                <button className={styles.toolBtn}><BsImage /></button>
              </div>
              <span className={styles.wordCount}>Words: 1,240</span>
            </div>

            <div className={styles.editorBody}>
              <p>
                Slow living isn't just a trend; it's a fundamental shift in how we
                perceive time and our place in the world. In today's hyper-connected
                environment, the constant noise of notifications and the pressure of
                immediate responses can leave us feeling drained and disconnected
                from our own intentions.
              </p>
              <p>
                By embracing a slower pace, we allow ourselves the space to truly
                experience the present moment. This doesn't mean doing everything
                slowly, but rather doing everything at the right speed—finding the
                'tempo giusto' for every activity.
              </p>
              <h5 className={styles.editorHeading}>Creating Rituals of Focus</h5>
              <p>
                One of the most effective ways to transition into this lifestyle is
                through the creation of intentional rituals. Whether it's the
                meticulous process of brewing a morning coffee or a dedicated...
              </p>
            </div>
          </div>
        </div>

        {/* Right rail */}
        <div className="col-12 col-xl-4">
          {/* Status & Visibility */}
          <div className={styles.panel}>
            <h6 className={styles.panelTitle}>STATUS &amp; VISIBILITY</h6>

            <div className="d-flex align-items-center justify-content-between mb-3">
              <span className={styles.fieldLabel}>Status</span>
              <div className="d-flex align-items-center gap-2">
                <label className={styles.switch}>
                  <input
                    type="checkbox"
                    checked={isPublished}
                    onChange={() => setIsPublished(!isPublished)}
                  />
                  <span className={styles.slider}></span>
                </label>
                <span className={styles.publishedText}>Published</span>
              </div>
            </div>

            <div className="d-flex align-items-center justify-content-between mb-3">
              <span className={styles.fieldLabel}>Visibility</span>
              <span className={styles.linkText}>Public</span>
            </div>

            <div className="d-flex align-items-center justify-content-between mb-4">
              <span className={styles.fieldLabel}>Publish Date</span>
              <span className={styles.mutedText}>Immediately</span>
            </div>

            <button className={styles.updateBtn}>Update Post</button>
            <button className={styles.draftBtn}>Save Draft</button>
          </div>

          {/* Featured Image */}
          <div className={styles.panel}>
            <div className="d-flex align-items-center justify-content-between mb-3">
              <h6 className={styles.panelTitle}>FEATURED IMAGE</h6>
              <a href="#" className={styles.removeLink}>Remove</a>
            </div>
            <div className={styles.featuredImage}></div>
          </div>

          {/* Categories */}
          <div className={styles.panel}>
            <h6 className={styles.panelTitle}>CATEGORIES</h6>
            <select className={styles.categorySelect} defaultValue="Mindfulness">
              <option>Mindfulness</option>
              <option>Minimalism</option>
              <option>Wellness</option>
              <option>Travel</option>
            </select>
            <a href="#" className={`d-inline-flex align-items-center ${styles.addCategoryLink}`}>
              <BsPlusLg className="me-2" />
              Add New Category
            </a>
          </div>

          {/* Tags */}
          <div className={styles.panel}>
            <h6 className={styles.panelTitle}>TAGS</h6>
            <div className={styles.tagsWrap}>
              {tags.map((tag, index) => (
                <span className={styles.tag} key={index}>
                  {tag}
                  <BsXLg
                    className={styles.tagRemove}
                    onClick={() => removeTag(index)}
                  />
                </span>
              ))}
            </div>
            <input
              type="text"
              placeholder="Add a tag..."
              className={styles.tagInput}
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyDown={addTag}
            />
          </div>

          {/* Move to Trash */}
          <div className={`d-flex align-items-center justify-content-center ${styles.trashRow}`}>
            <BsTrashFill className="me-2" />
            Move to Trash
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddAdminPost;