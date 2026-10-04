import React, { useContext, useMemo, useRef, useState } from "react";
import { BsXLg } from "react-icons/bs";
import styles from "../assets/AddAdminPost.module.css";
import JoditEditor from "jodit-react";
import { AppContext } from "../Context/AppContext";
import { apiUpload, showToast } from "../services/apiClient.js";
import { useNavigate } from "react-router-dom";

const ImageIcon = ({ size = 56, color = "#7d7d7d" }) => (
  <svg width={size} height={size} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <rect x="2" y="3.5" width="16" height="13" rx="2" stroke={color} strokeWidth="1.4" />
    <circle cx="6.7" cy="8" r="1.5" fill={color} />
    <path d="M2.8 14.2L7.3 9.8C7.7 9.4 8.3 9.4 8.7 9.8L11.5 12.5" stroke={color} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M10.5 12.9L13 10.5C13.4 10.1 14 10.1 14.4 10.5L17.2 13.2" stroke={color} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const AddAdminPost = ({ placeholder }) => {
  const navigate = useNavigate();
  const { allCat, setRefresh } = useContext(AppContext);

  const config = useMemo(
    () => ({
      readonly: false,
      height: 500,
      placeholder: placeholder || "Write your post here",
      buttons: [
        "bold", "italic", "underline", "|",
        "fontsize", "brush", "|",
        "ul", "ol", "align", "|",
        "undo", "redo", "|",
        "source",
      ],
    }),
    [placeholder]
  );

  const [isPublished, setIsPublished] = useState(true);
  const editor = useRef(null);
  const [content, setContent] = useState("");
  const [preview, setPreview] = useState(null);
  const [tag, setTag] = useState("");
  const [tags, setTags] = useState([]);
  const [image, setImage] = useState(null);
  const [formData, setFormData] = useState({ title: "", category: "" });

  const previewHandler = (event) => {
    const file = event.target.files[0];
    if (!file) return;
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const tagsHandler = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      const value = tag.trim();
      if (!value) return;
      if (tags.length >= 5) {
        showToast("Maximum 5 tags allowed", "Error", "danger");
        setTag("");
        return;
      }
      if (tags.includes(value)) {
        showToast("Tag already exist", "Error", "danger");
        setTag("");
        return;
      }
      setTags([...tags, value]);
      setTag("");
    }
  };

  const deleteTagHandler = (index) => {
    setTags(tags.filter((_, i) => i !== index));
  };

  const formHandler = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const submitPost = async (event) => {
    event.preventDefault();
    if (!formData.title) return showToast("Title is required", "Error", "danger");
    if (!content) return showToast("Description is required", "Error", "danger");
    if (!image) return showToast("Image is required", "Error", "danger");
    if (!formData.category) return showToast("Select required category", "Error", "danger");

    const form = new FormData();
    form.append("title", formData.title);
    form.append("description", content);
    form.append("image", image);
    form.append("category", formData.category);
    form.append("tags", JSON.stringify(tags));
    form.append("published", isPublished ? "published" : "draft");

    try {
      const { ok, data } = await apiUpload("posts", "POST", form);
      if (!ok) {
        const e = data?.errors;
        const firstError =
          e?.title?.[0] || e?.description?.[0] || e?.image?.[0] ||
          e?.image?.[1] || e?.category?.[0] || e?.tags?.[0] || data?.message;
        if (firstError) showToast(firstError, "Error", "danger");
        return false;
      }
      setFormData({ title: "", category: "" });
      setTags([]);
      setContent("");
      setRefresh((prev) => prev + 1);
      navigate("/admin-panel/posts");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={styles.wrapper}>
      <form onSubmit={submitPost} className="row g-4">
        {/* Editor column */}
        <div className="col-12 col-xl-8">
          <div className={styles.titleCard}>
            <input
              type="text"
              name="title"
              onChange={formHandler}
              value={formData.title}
              placeholder="Post title"
              aria-label="Post title"
              className={styles.titleInput}
            />
          </div>

          <div className={styles.editorCard}>
            <div className={styles.editorWrap}>
              <JoditEditor
                ref={editor}
                value={content}
                config={config}
                name="description"
                onChange={(newContent) => setContent(newContent)}
              />
            </div>
          </div>
        </div>

        {/* Right rail */}
        <div className="col-12 col-xl-4">
          {/* Featured image */}
          <div className={styles.panel}>
            <h6 className={styles.panelTitle}>Featured image</h6>
            <div className={styles.featuredImage}>
              <label htmlFor="post-image">
                {!preview ? (
                  <>
                    <ImageIcon />
                    <span className={styles.imageHint}>Click to upload a cover image</span>
                  </>
                ) : (
                  <img src={preview} alt="Featured preview" />
                )}
                <input type="file" accept="image/*" onChange={previewHandler} id="post-image" hidden />
              </label>
            </div>
          </div>

          {/* Categories */}
          <div className={styles.panel}>
            <h6 className={styles.panelTitle}>Category</h6>
            <select
              onChange={formHandler}
              value={formData.category}
              className={styles.categorySelect}
              name="category"
              aria-label="Category"
            >
              <option value="" disabled>Select category</option>
              {allCat.map((category) => (
                <option key={category.id} value={category.id}>{category.name}</option>
              ))}
            </select>
          </div>

          {/* Tags */}
          <div className={styles.panel}>
            <h6 className={styles.panelTitle}>Tags</h6>
            <div className={styles.tagsWrap}>
              {tags.map((t, index) => (
                <span key={index} className={styles.tag}>
                  {t}
                  <button
                    type="button"
                    className={styles.tagRemove}
                    aria-label={`Remove ${t}`}
                    onClick={() => deleteTagHandler(index)}
                  >
                    <BsXLg />
                  </button>
                </span>
              ))}
            </div>
            <input
              type="text"
              onChange={(event) => setTag(event.target.value)}
              value={tag}
              name="tags"
              onKeyDown={tagsHandler}
              placeholder="Type a tag and press Enter"
              aria-label="Add a tag"
              className={styles.tagInput}
            />
          </div>

          {/* Status & visibility */}
          <div className={styles.panel}>
            <h6 className={styles.panelTitle}>Status and visibility</h6>

            <div className="d-flex align-items-center justify-content-between mb-3">
              <span className={styles.fieldLabel}>Status</span>
              <div className="d-flex align-items-center gap-2">
                <label className={styles.switch}>
                  <input
                    type="checkbox"
                    checked={isPublished}
                    onChange={() => setIsPublished(!isPublished)}
                    aria-label="Published"
                  />
                  <span className={styles.slider}></span>
                </label>
                <span className={styles.publishedText}>{isPublished ? "Published" : "Draft"}</span>
              </div>
            </div>

            <div className="d-flex align-items-center justify-content-between mb-3">
              <span className={styles.fieldLabel}>Visibility</span>
              <span className={styles.linkText}>{isPublished ? "Public" : "Private"}</span>
            </div>

            <div className="d-flex align-items-center justify-content-between mb-4">
              <span className={styles.fieldLabel}>Publish date</span>
              <span className={styles.mutedText}>Immediately</span>
            </div>

            {isPublished ? (
              <button type="submit" className={styles.updateBtn}>Publish post</button>
            ) : (
              <button type="submit" className={styles.draftBtn}>Save draft</button>
            )}
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddAdminPost;