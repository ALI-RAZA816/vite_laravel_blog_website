import { Link, useParams } from "react-router-dom";
import styles from "../assets/BlogPost.module.css";
import { useContext, useEffect, useState } from "react";
import { apiUrl, baseUrl } from "../Http/Http";
import { AppContext } from "../Context/AppContext";
import { IoEllipsisVerticalSharp } from "react-icons/io5";
import { MdOutlineEdit } from "react-icons/md";
import { RiDeleteBinLine } from "react-icons/ri";
import { useUser } from "../Context/UserContext";
import { usePublicPost } from "../Context/PublicPostContext";
import {apiGet, apiSend} from '../services/apiClient.js';
export default function BlogPost() {

  const {id} = useParams();
  const {loggedUser} = useUser();
  const {setRefresh} = useContext(AppContext);
  const {refresh} = useContext(AppContext);
  const [active, setActive] = useState(null);
  const [activeEdit, setActiveEdit] = useState(null);
  const [EditComment, setEditComment] = useState('');
  const userInfo = JSON.parse(localStorage.getItem('UserInfo'));

  const { postView: formData, fetchPostView } = usePublicPost();

  // fetch single comment
  const fetchComment = async (id)=>{
    const token = localStorage.getItem('token');
    try{
      const {ok, data} = await apiGet(`comments/${id}`);

      if(ok){
        setEditComment(data.comment.comment);
      }

    }catch(error){
      console.log(error);
    }
  }

  // update comment
  const updateComment = async (id)=>{
    const token = localStorage.getItem('token');
    try{

      const {ok, data} = await apiSend(`update-comments/${id}`, 'PUT', {comment:EditComment});
      if(ok){
        setRefresh(prev => prev + 1);
        setActiveEdit(null);
      }
    }catch(error){
      console.log(error);
    }
  }

  // fetch single post
  const previewPost = ()=>{
    fetchPostView(id);
  }

  const timeAgo = (date) => {
    const now = new Date();
    const created = new Date(date);

    const seconds = Math.floor((now - created) / 1000);

    if (seconds < 5) {
        return "Just now";
    }

    if (seconds < 60) {
        return `${seconds}s ago`;
    }

    const minutes = Math.floor(seconds / 60);

    if (minutes < 60) {
        return `${minutes}m ago`;
    }

    const hours = Math.floor(minutes / 60);

    if (hours < 24) {
        return `${hours}h ago`;
    }

    const days = Math.floor(hours / 24);

    if (days < 7) {
        return `${days}d ago`;
    }

    const weeks = Math.floor(days / 7);

    if (weeks < 4) {
        return `${weeks}w ago`;
    }

    const months = Math.floor(days / 30);

    if (months < 12) {
        return `${months}mo ago`;
    }

    const years = Math.floor(days / 365);

    return `${years}y ago`;
  };

  const [postComment, setPostComments] = useState([]);
  const postComments = async ()=>{
    try{
      const {ok, data} = await apiGet (`post-comments/${id}`);
      if(ok){
        setPostComments(data.postComment);
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
      const {ok, data} = await apiSend('comments','POST',payload);
      if(ok){
        setRefresh(prev => prev + 1);
        setComment('');
        setCommentErr('');
      }

    }catch(error){
      console.log(error);
    }
  }

  const deleteComment = async (id)=>{
    const token = localStorage.getItem('token');
    try{
      const {ok, data} = await apiSend(`comments/${id}`,'DELETE');
      if(ok){
        setRefresh(prev => prev + 1);
        setActive(null);
      }

    }catch(error){
      console.log(error);
    }
  }


  useEffect(()=>{
    previewPost();
    postComments();
    const handleClickOutside = () => {
      setActive(null);
      setActiveEdit(null);
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  },[refresh]);
  

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
          <h5 className={styles.heading}>Comments ({postComment.length < 1000 ? postComment.length : `${(postComment.length/1000).toFixed(1)}k` })</h5>
  
          {/* Add a comment */}
          <div className={`d-flex align-items-start ${styles.addCommentRow}`}>
            <div className="rounded-5 text-center overflow-hidden text-white" style={{lineHeight:'40px',height:'40px', width:'40px'}}>
              {loggedUser.image ? <img
                  src={`${baseUrl}/uploads/${loggedUser.image}`}
                  alt=""
                  className={styles.authorAvatar}
                />: <div className="rounded-5 text-center text-white" style={{lineHeight:'40px',height:'40px', width:'40px', backgroundColor: '#5b3fd9', overflow:'hidden'}}>
                        {loggedUser?.name?.split(' ')[0].substr(0, 1)}
                        {loggedUser?.name?.split(' ')[1].substr(0, 1)}
                    </div>
                }
            </div>
              <div className={`${styles.addCommentBox} d-flex flex-column`}>
                <textarea
                  className={styles.commentInput}
                  placeholder="Add a comment..."
                  rows={3}
                  value={comment}
                  onChange={(event)=>setComment(event.target.value)}
                />
                <span className="text-danger">{commentErr}</span>
                <button onClick={addComment} className={`${styles.postBtn} ms-auto`} >
                  Post Comment
                </button>
              </div>
          </div>
    
          {/* Comment list */}
          <div className={styles.commentList}>
            {postComment.map((comment, index)=>{
              return <div key={index} className={`${styles.commentItem} d-flex justify-content-between mb-3`}>
                        <div className="d-flex w-100">
                          <div className={`${styles.avatarInitials} ${styles.avatarPurple} me-2 overflow-hidden`}>
                            {comment.user.image ? <img
                              src={`${baseUrl}/uploads/${comment.user.image}`}
                              alt="Elena Vance"
                              className={styles.authorAvatar}
                            />: <div className="rounded-5 text-center text-white" style={{lineHeight:'40px',height:'40px', width:'40px', backgroundColor: '#5b3fd9', overflow:'hidden'}}>
                                    {comment?.user.name?.split(' ')[0].substr(0, 1)}
                                    {comment?.user.name?.split(' ')[1].substr(0, 1)}
                                </div>
                            }
                          </div>
                          <div className={`${styles.commentBody} w-100`}>
                            <div className={styles.commentMeta}>
                              <span className={styles.commentAuthor}>{comment.user.name}</span>
                              <span className={styles.commentTime}>{timeAgo(comment.created_at)}</span>
                            </div>
                            <p className={styles.commentText}>{comment.comment}</p>
                            {activeEdit === index && (<div onClick={(e) => e.stopPropagation()} className={`${styles.addCommentBox} d-flex flex-column`}>
                              <textarea
                                className={styles.commentInput}
                                placeholder="Add a comment..."
                                rows={3}
                                value={EditComment}
                                onChange={(event)=>setEditComment(event.target.value)}
                              />
                              <button onClick={()=> updateComment(comment.id)} className={`${styles.postBtn} ms-auto`} >
                                Edit
                              </button>
                            </div>)}
                          </div>
                        </div>
                        {comment.user_id === userInfo.id && (<div className="position-relative">
                          <IoEllipsisVerticalSharp style={{cursor:'pointer'}} onClick={(e)=> {e.stopPropagation(), setActive(index)}} />
                          {active === index && (<div className={`${styles.commentAction} d-flex flex-column bg-white shadow-sm px-3 py-2 rounded-2`}>
                            <span onClick={(e)=> {e.stopPropagation(), fetchComment(comment.id), setActive(null), setActiveEdit(index)}}  style={{cursor:'pointer',fontSize:'13px'}} className="d-flex mb-1"><MdOutlineEdit className="fs-5 me-2" />Edit</span>
                            <span onClick={()=>deleteComment(comment.id)}  style={{cursor:'pointer',fontSize:'13px'}} className="d-flex">
                              <RiDeleteBinLine className="fs-5 me-2" />
                              Delete
                            </span>
                          </div>)}
                        </div>)}
                      </div>
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
