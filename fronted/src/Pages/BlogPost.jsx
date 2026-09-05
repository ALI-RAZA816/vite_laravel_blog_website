import { Link, useParams } from "react-router-dom";
import styles from "../assets/BlogPost.module.css";
import { useContext, useEffect, useState } from "react";
import { apiUrl, baseUrl } from "../Http/Http";
import { AppContext } from "../Context/AppContext";

export default function BlogPost() {

  const {id} = useParams();
  const {loggedUser} = useContext(AppContext);
  const {setRefresh} = useContext(AppContext);
  // console.log(loggedUser);
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
  const previewPost = async ()=>{
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

  
  const [comment, setComment] = useState('');
  const [commentErr, setCommentErr] = useState('');
  const addComment = async (event)=>{
    event.preventDefault();
    if(!comment){
      setCommentErr('Express your vision');
      return;
    }
    const token = localStorage.getItem('token');
    const payload ={
        comment:comment,
        post_id:id
    }
    try{
      const response = await fetch(`${apiUrl}/comments`,{
        method:'POST',
        headers:{
          'Content-type':'application/json',
          'Accept':'application/json',
          'Authorization':`Bearer ${token}`,
        },
        body:JSON.stringify(payload)
      });
      const data = await response.json();
      if(response.ok){
        setRefresh(prev => prev + 1);
        setComment('');
        setCommentErr('');
      }

    }catch(error){
      console.log(error);
    }
  }

  useEffect(()=>{
    previewPost();
  },[]);
  

  return (
    <div className={styles.page}>

      <div className={styles.hero}>
        {formData.post_image && <img
          src={`${baseUrl}/posts-images/${formData.post_image}`}
          alt="hero"
        />}
        <div className={styles.heroContent}>
          <span className={styles.badge}>{formData.category}</span>
          <h1 className={styles.heroTitle}>{formData.title}
          </h1>
        </div>
      </div>

      <div className="container">
        <div className={styles.authorRow}>
          <div className={styles.authorInfo}>
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
              <p className={styles.authorName}>{formData.author_name}</p>
              <span className={styles.authorMeta}>{formData.date}</span>
            </div>
          </div>
        </div>
        <hr className={styles.divider} />

        <div className={styles.articleBody}>
          <div
            dangerouslySetInnerHTML={{ __html: formData.description }}
          />
        </div>
      <div className={styles.commentsSection}>
        <h5 className={styles.heading}>Comments ()</h5>
 
        {/* Add a comment */}
        <div className={`d-flex align-items-start ${styles.addCommentRow}`}>
           {loggedUser.image != null? <img
              src={`${baseUrl}/uploads/${formData.author_image}`}
              alt="Elena Vance"
              className={styles.authorAvatar}
            />: <div className="rounded-5 text-center text-white" style={{lineHeight:'40px',height:'40px', width:'40px', backgroundColor: '#5b3fd9', overflow:'hidden'}}>
                    {loggedUser?.name?.split(' ')[0].substr(0, 1)}
                    {loggedUser?.name?.split(' ')[1].substr(0, 1)}
                </div>
            }
            <div className={`${styles.addCommentBox} d-flex flex-column`}>
              <textarea
                className={styles.commentInput}
                placeholder="Add a comment..."
                rows={3}
                value={comment}
                onChange={(event)=>setComment(event.target.value)}
              />
              <span className="text-danger">{commentErr}</span>
              <button onClick={addComment} className={styles.postBtn} >
                Post Comment
              </button>
            </div>
        </div>
  
        {/* Comment list */}
        <div className={styles.commentList}>
        </div>
        </div>
    </div>
      </div>
  );
}
