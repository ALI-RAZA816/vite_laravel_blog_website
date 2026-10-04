import React, { useContext, useEffect, useState } from "react";
import styles from "../assets/AdminPostPreview.module.css";
import { useNavigate, useParams } from "react-router-dom";
import { apiGet } from "../services/apiClient";
import { AppContext } from "../Context/AppContext";
import { baseUrl } from "../Http/Http";

const initials = (name = "") =>
  name.split(" ").filter(Boolean).map((w) => w[0]).join("").slice(0, 2).toUpperCase();

const AdminPostPreview = () => {
  const { id } = useParams();
  const { setStatusCode } = useContext(AppContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    category: "",
    title: "",
    author_image: "",
    author_name: "",
    date: "",
    tags: [],
    published: "",
    post_image: "",
    description: "",
  });

  // fetch single post
  const editHandler = async () => {
    try {
      const { ok, status, data } = await apiGet(`posts/${id}`);
      if (ok) {
        setFormData({
          category: data.post.category.name,
          title: data.post.title,
          author_image: data.post.author.image,
          author_name: data.post.author.name,
          date: data.post.date,
          published: data.post.published,
          post_image: data.post.image,
          tags: JSON.parse(data.post.tags),
          description: data.post.description,
        });
      } else {
        setStatusCode(status);
        navigate("/unauthorized");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    editHandler();
  }, []);

  return (
    <div className={styles.page}>
      <div className={styles.mainArea}>
        <div className="row gx-4">
          {/* Preview column */}
          <div className="col-12 col-lg-8">
            <div className={styles.previewCard}>
              {/* Hero image */}
              <div className={styles.heroWrapper}>
                {formData.category && (
                  <span className={styles.categoryBadge}>{formData.category}</span>
                )}
                {formData.post_image ? (
                  <img
                    src={`${baseUrl}/posts-images/${formData.post_image}`}
                    alt={formData.title}
                    className={styles.heroImage}
                  />
                ) : (
                  <div className={styles.heroEmpty}>No featured image</div>
                )}
              </div>

              {/* Article body */}
              <div className={styles.articleBody}>
                <h2 className={styles.articleTitle}>{formData.title}</h2>

                <div className="d-flex align-items-center gap-3">
                  {formData.author_image ? (
                    <img
                      src={`${baseUrl}/uploads/${formData.author_image}`}
                      alt={formData.author_name}
                      className={styles.authorAvatar}
                    />
                  ) : (
                    <div className={styles.authorFallback}>{initials(formData.author_name)}</div>
                  )}
                  <div>
                    <div className={styles.authorName}>{formData.author_name}</div>
                    <div className={styles.authorMeta}>{formData.date}</div>
                  </div>
                </div>

                <hr className={styles.divider} />
                <div dangerouslySetInnerHTML={{ __html: formData.description }} />
              </div>
            </div>
          </div>

          {/* Right sidebar column */}
          <div className="col-12 col-lg-4">
            <div className={styles.panel}>
              <h6 className={styles.panelTitle}>Category and tags</h6>

              <div className={styles.subLabel}>Category</div>
              <div className={styles.pillsWrapper}>
                <span className={styles.categoryPill}>{formData.category}</span>
              </div>

              <div className={`${styles.subLabel} mt-3`}>Tags</div>
              <div className={styles.pillsWrapper}>
                {formData.tags.map((tag, index) => (
                  <span className={styles.tagPill} key={index}>{tag}</span>
                ))}
              </div>

              <div className={`${styles.insightRow} mt-4 ${styles.insightRowLast}`}>
                <span className={styles.insightLabel}>
                  <i className="bi bi-eye me-2"></i>
                  Visibility
                </span>
                <span className={`${styles.insightValue} text-capitalize`}>{formData.published}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className={`d-flex align-items-center justify-content-between ${styles.footer}`}>
        <span>&copy; 2026 Admin Workspace. All rights reserved.</span>
        <div className="d-flex align-items-center gap-4">
          <span className={styles.footerLink}>Privacy Policy</span>
          <span className={styles.footerLink}>Terms of Service</span>
          <span className={styles.footerLink}>Help Center</span>
        </div>
      </footer>
    </div>
  );
};

export default AdminPostPreview;