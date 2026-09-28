import React, { useContext, useEffect, useMemo, useRef, useState } from "react";
import {
  BsXLg,
} from "react-icons/bs";
import styles from "../assets/AddAdminPost.module.css";
import JoditEditor from 'jodit-react';
import { AppContext } from "../Context/AppContext";
import { useNavigate, useParams } from "react-router-dom";
import {apiGet, apiUpload, showToast} from '../services/apiClient';
import { baseUrl } from "../Http/Http";
const ImageIcon = ({ size = 100, color = "#808080" }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <rect
      x="2"
      y="3.5"
      width="16"
      height="13"
      rx="2"
      stroke={color}
      strokeWidth="1.4"
    />
    <circle cx="6.7" cy="8" r="1.5" fill={color} />
    <path
      d="M2.8 14.2L7.3 9.8C7.7 9.4 8.3 9.4 8.7 9.8L11.5 12.5"
      stroke={color}
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M10.5 12.9L13 10.5C13.4 10.1 14 10.1 14.4 10.5L17.2 13.2"
      stroke={color}
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);


const AdminEditPost = ({placeholder}) => {

  const navigate = useNavigate();
  const {id} = useParams();
  const {allCat, setStatusCode} = useContext(AppContext);
  const config = useMemo(
    () => ({
      readonly: false,
      height:500,
      placeholder: placeholder || 'Post description......',
      buttons: [
        "bold",
        "italic",
        "underline",
        "|",
        "fontsize",
        "brush",
        "|",
        "ul",
        "ol",
        "align",
        "|",
        "|",
        "|",
        "undo",
        "redo",
        "|",
        "source"
    ],
    }),
    [placeholder]
  );

  const {setRefresh} = useContext(AppContext);
  const [preview, setPreview]= useState(null);
  const [isPublished, setIsPublished] = useState(true);
  const editor = useRef(null);
  const [content, setContent] = useState('');
  const [image, setImage]= useState(null);
  const [tag, setTag] = useState('');
  const [tags, setTags] = useState([]);
  const [formData, setFormData] = useState({
    id:'',
    title:'',
    category:'',
    image:''
  });

  const previewHandler = (event)=>{
    const file = event.target.files[0];
    if(!file) return;
    setImage(file);
    const imagePreview = URL.createObjectURL(file);
    setPreview(imagePreview);
  }

  const tagsHandler = (event)=>{
    if(event.key === 'Enter'){
      event.preventDefault();
      if(!tag) return;
      if(tags.length >= 5){
        showToast('Maximum 5 tags allowed','Error','danger');
        setTag('');
        return;
      };
      if(tags.includes(tag)){
        showToast('Tag already exist','Error','danger');
        setTag('');
        return;
      }
      setTags([...tags, tag.trim()]);
      setTag('');
    }
  }

  const deleteTagHandler = (index)=>{
    const newTags = tags.filter((_, i)=> i !== index);
    setTags(newTags);
  }

  const formHandler = (event)=>{
    const {name, value} = event.target;
    setFormData((prev)=>({
      ...prev,
      [name]:value
    }));
  }

  // fetch single post
  const editHandler = async ()=>{
    try{
      const {ok, status, data} = await apiGet(`posts/${id}`);
      if(ok){
        setFormData({
          id:data.post.id,
          title:data.post.title,
          category:data.post.category_id,
          image:data.post.image
        });
        data.post.published === 'published' ? setIsPublished(true) : setIsPublished(false);
        setTags(JSON.parse(data.post.tags));
        setContent(data.post.description);
      }else{
        setStatusCode(status);
        navigate('/aunauthorized');
      }
    }catch(error){
      console.log(error);
    }
  }

  const updatePost = async (event)=>{
      event.preventDefault();
      if(!formData.title){
        showToast('Title is required','Error','danger');
        return;
      }
      if(!content){
        showToast('Description is required','Error','danger');
        return;
      }
      if(!image){
        showToast('Image is required','Error','danger');
        return;
      }
      if(!formData.category){
        showToast('Select required category','Error','danger');
        return;
      }
      const publish = isPublished === true ? 'published' : 'draft';
  
  
      const form = new FormData();
      form.append('title',formData.title);
      form.append('description',content);
      if (image instanceof File) {            
        form.append('image', image);
      }
      form.append('category',formData.category);
      form.append('tags',JSON.stringify(tags));
      form.append('published',publish);
      form.append('_method', 'PATCH');
  
      try{

        const {ok, data} = await apiUpload (`posts/${formData.id}`,'POST',form);
        console.log(data);
        const error = data?.errors;
        if(!ok){
           if(error?.title?.[0]){
              showToast(error?.title?.[0],'Error','danger');
              return false;
            }
            if(error?.description?.[0]){
              showToast(error?.description?.[0],'Error','danger');
              return false;
            }
            if(error?.image?.[0]){
              showToast(error?.image?.[0],'Error','danger');
              return false;
            }
            if(error?.image?.[1]){
              showToast(error?.image?.[1],'Error','danger');
              return false;
            }
            if(error?.category?.[0]){
              showToast(error?.category?.[0],'Error','danger');
              return false;
            }
            if(error?.tags?.[0]){
              showToast(error?.tags?.[0],'Error','danger');
              return false;
            }
            if(data.message){
              showToast(data.message,'Error','danger');
              return false;
            }
        }else{
          setRefresh(prev => prev + 1);
          navigate('/admin-panel/posts');
        }

      }catch(error){

        console.log(error);

      }
  
    }

  useEffect(()=>{
    editHandler();
  },[]);

  return (
    <div className={styles.wrapper}>
      <form onSubmit={updatePost} className="row g-4">
        {/* Editor column */}
        <div className="col-12 col-xl-8">
          <div className={styles.titleCard}>
            <input
              type="text"
              name="title"
              onChange={formHandler}
              value={formData.title}
              placeholder="Post Title..."
              className={styles.titleInput}
            />
          </div>

          <div className={`${styles.editorCard}`}>
            {/* <div className={styles.editorBody}> */}
              <JoditEditor
                ref={editor}
                value={content}
                config={config}
                name="description"
                onChange={newContent => setContent(newContent)}
              />
            {/* </div> */}
          </div>
        </div>

        {/* Right rail */}
        <div className="col-12 col-xl-4">
        

          {/* Featured Image */}
          <div className={styles.panel}>
            <div className="d-flex align-items-center justify-content-between mb-3">
              <h6 className={styles.panelTitle}>FEATURED IMAGE</h6>
            </div>
                <label htmlFor="post-image" className={styles.featuredImage}>
                <div className={styles.featuredImage}>
                    {/* <CiImageOn /> */}
                    {preview ? (<img src={preview} alt="" />): formData.image? (<img src={`${baseUrl}/posts-images/${formData.image}`} alt="" />) : <ImageIcon/>}
                    <input type="file" onChange={previewHandler} name="post-image" id="post-image" hidden />
                </div>
                </label>
          </div>

          {/* Categories */}
          <div className={styles.panel}>
            <h6 className={styles.panelTitle}>CATEGORIES</h6>
            <select onChange={formHandler} value={formData.category} className={styles.categorySelect} name="category">
              <option defaultValue disabled>Select Category</option>
              {allCat.map((category, index)=>{
                return <><option index={index} value={category.id}>{category.name}</option></>
              })}
            </select>
          </div>

          {/* Tags */}
          <div className={styles.panel}>
            <h6 className={styles.panelTitle}>TAGS</h6>
            <div className={styles.tagsWrap}>
                {tags.map((tag, index)=>{
                  return <span key={index} className={styles.tag}>
                          {tag}
                          <BsXLg onClick={()=> deleteTagHandler(index)}/>
                        </span>
                })}
            </div>
            <input
                type="text"
                value={tag}
                onChange={(event)=>setTag(event.target.value)}
                onKeyDown={tagsHandler}
                placeholder="Add a tag..."
                className={styles.tagInput}
            />
          </div>
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
              {isPublished ? <span className={styles.linkText}>Public</span>:<span className={styles.linkText}>Draft</span>}
            </div>

            <div className="d-flex align-items-center justify-content-between mb-4">
              <span className={styles.fieldLabel}>Publish Date</span>
              <span className={styles.mutedText}>Immediately</span>
            </div>

            {isPublished ? <button type="submit" className={styles.updateBtn}>Update Post</button>:
            <button type="submit" className={styles.draftBtn}>Save Draft</button>}
          </div>
        </div>
      </form>
    </div>
  );
};

export default AdminEditPost;