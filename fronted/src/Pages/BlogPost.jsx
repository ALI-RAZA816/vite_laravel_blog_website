import { Link, useParams } from "react-router-dom";
import styles from "../assets/BlogPost.module.css";
import { useEffect, useState } from "react";
import { apiUrl, baseUrl } from "../Http/Http";

export default function BlogPost() {

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

  useEffect(()=>{
    previewPost();
  },[]);
  
  const initialComments = [
    {
      id: 1,
      initials: "JV",
      name: "Julian Veldt",
      time: "2 days ago",
      text: "The section on intentional rituals really resonated with me. I've started a morning tea ritual and it's changed my whole day.",
    },
    {
      id: 2,
      initials: "ER",
      name: "Elena Rossi",
      time: "2 days ago",
      text: "Beautifully written. The photography in this piece is also stunning.",
    },
  ];
  
  const [comments, setComments] = useState(initialComments);
  const [newComment, setNewComment] = useState("");
 
  const handlePostComment = () => {
    if (!newComment.trim()) return;
    setComments([
      ...comments,
      {
        id: Date.now(),
        initials: "YO",
        name: "You",
        time: "Just now",
        text: newComment.trim(),
      },
    ]);
    setNewComment("");
  };
  

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
        <h5 className={styles.heading}>Comments ({comments.length})</h5>
 
        {/* Add a comment */}
        <div className={`d-flex align-items-start ${styles.addCommentRow}`}>
            <img
              src="https://i.pravatar.cc/64?img=47"
              alt="You"
              className={styles.userAvatar}
            />
            <div className={styles.addCommentBox}>
              <textarea
                className={styles.commentInput}
                placeholder="Add a comment..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                rows={3}
              />
              <button className={styles.postBtn} onClick={handlePostComment}>
                Post Comment
              </button>
            </div>
        </div>
  
        {/* Comment list */}
        <div className={styles.commentList}>
          {comments.map((comment) => (
            <div key={comment.id} className={`d-flex align-items-start ${styles.commentRow}`}>
              <div className={styles.initialsAvatar}>{comment.initials}</div>
              <div className={styles.commentBody}>
                <div className="d-flex align-items-center gap-2">
                  <span className={styles.commentName}>{comment.name}</span>
                  <span className={styles.commentTime}>{comment.time}</span>
                </div>
                <p className={styles.commentText}>{comment.text}</p>
              </div>
            </div>
          ))}
        </div>
        </div>
    </div>
      </div>
  );
}
