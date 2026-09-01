import React, { useEffect, useState } from "react";
import styles from "../assets/AdminPostPreview.module.css";
import { useParams } from "react-router-dom";
import { apiUrl, baseUrl } from "../Http/Http";

// NOTE: This component intentionally excludes the dark left navigation
// sidebar from the original design. It renders only the top header,
// the preview card, the right-hand insights/tags sidebar, and the footer.

const AdminPostPreview = () => {

  const {id} = useParams();
  const [formData, setFormData] = useState({
    category:'',
    title:'',
    author_image:'',
    author_name:'',
    date:'',
    tags:[],
    published:'',
    post_image:'',
    description:''
  })

  // fetch single post
  const editHandler = async ()=>{
    const token = localStorage.getItem('token');
    try{
      const response = await fetch(`${apiUrl}/posts/${id}`,{
        method:'GET',
        headers:{
          'Content-type':'application/json',
          'Accept':'application/json',
          'Authorization':`Bearer ${token}`,
        }
      });

      const data = await response.json();
      console.log(data);
      if(response.ok){
        setFormData({
          category:data.post.category.name,
          title:data.post.title,
          author_image:data.post.author.image,
          author_name:data.post.author.name,
          date:data.post.date,
          published:data.post.published,
          post_image:data.post.image,
          tags:JSON.parse(data.post.tags),
          description:data.post.description
        });
      }
    }catch(error){
      console.log(error);
    }
  }

  useEffect(()=>{
    editHandler();
  },[]);
  

  return (
    <div className={styles.page}>

      <div className={styles.mainArea}>

        <div className="row gx-4">
          {/* Preview column */}
          <div className="col-12 col-lg-8">
            <div className={styles.previewCard}>
              {/* Hero image with overlay mock */}
              <div className={styles.heroWrapper}>
                <span className={styles.categoryBadge}>{formData.category}</span>
                {!formData.post_image ? <div></div>:<img
                  src={`${baseUrl}/posts-images/${formData.post_image}`}
                  alt="Hero"
                  className={styles.heroImage}
                />}
                <div className={styles.heroOverlay}>
                  <span className={styles.overlayTag}>{formData.category}</span>
                  <h4 className={styles.overlayTitle}>
                    {formData.title}
                  </h4>
                  <div className={styles.overlayMetaBar}></div>
                </div>
              </div>

              {/* Article body */}
              <div className={styles.articleBody}>
                <h2 className={styles.articleTitle}>{formData.title}
                </h2>

                <div className="d-flex align-items-center gap-2 mb-3">
                  {formData.author_image ? <img
                    src={`${baseUrl}/uploads/${formData.author_image}`}
                    alt="Elena Vance"
                    className={styles.authorAvatar}
                  />: <div className="rounded-5 text-center text-white" style={{lineHeight:'40px',height:'40px', width:'40px', backgroundColor: '#5b3fd9', overflow:'hidden'}}>
                          {formData.author_name.split(' ')[0]?.substr(0, 1)}
                          {formData.author_name.split(' ')[1]?.substr(0, 1)}
                      </div>
                  }
                  <div>
                    <div className={styles.authorName}>{formData.author_name}</div>
                    <div className={styles.authorMeta}>{formData.date}
                    </div>
                  </div>
                </div>

                <hr className={styles.divider} />
                <div
                  dangerouslySetInnerHTML={{ __html: formData.description }}
                />
              </div>
            </div>
          </div>

          {/* Right sidebar column */}
          <div className="col-12 col-lg-4">
           

            {/* Categories & Tags */}
            <div className={styles.panel}>
              <h6 className={styles.panelTitle}>Categories &amp; Tags</h6>

              <div className={styles.subLabel}>Categories</div>
              <div className={styles.pillsWrapper}>
                <span className={styles.categoryPill}>{formData.category}</span>
              </div>

              <div className={`${styles.subLabel} mt-3`}>Tags</div>
              <div className={styles.pillsWrapper}>
                {formData.tags.map((tag, index)=>{
                  return <span className={styles.tagPill} key={index}>{tag}</span>
                })}
              </div>
              <div className={`${styles.insightRow} mt-3 ${styles.insightRowLast}`}>
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
        <span>&copy; 2024 Admin Workspace. All rights reserved.</span>
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