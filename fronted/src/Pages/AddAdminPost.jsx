import React, { useContext, useMemo, useRef, useState } from "react";
import {
  BsXLg,
} from "react-icons/bs";
import styles from "../assets/AddAdminPost.module.css";
import JoditEditor from 'jodit-react';
import { AppContext } from "../Context/AppContext";
import { apiUpload, showToast } from "../services/apiClient.js";
import { useNavigate } from "react-router-dom";

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


const AddAdminPost = ({placeholder}) => {

  const navigate = useNavigate();
  const {allCat} = useContext(AppContext);
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

  const [isPublished, setIsPublished] = useState(true);
  const editor = useRef(null);
  const {setRefresh} = useContext(AppContext);
  const [content, setContent] = useState('');
  const [preview, setPreview]= useState(null);
  const [tag, setTag] = useState('');
  const [tags, setTags] = useState([]);
  const [image, setImage]= useState(null);
  const [formData, setFormData] = useState({
    title:'',
    category:'',
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
      }
      if(tags.includes(tag)){
        showToast('Tag already exist','Error','danger');
        setTag('');
        return;
      };
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


  const submitPost = async (event)=>{
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
    form.append('image',image);
    form.append('category',formData.category);
    form.append('tags',JSON.stringify(tags));
    form.append('published',publish);

    try{
      const {ok, data} = await apiUpload ('posts','POST',form);
      console.log(data.message);
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
          setFormData({
            title: '',
            category: '',
          });
          setTags([]);
          setContent('');
          setRefresh(prev => prev + 1);
          navigate('/admin-panel/posts');
      }
    }catch(error){
      console.log(error);
    }

  }

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
              <div className={styles.featuredImage}>
                <label htmlFor="post-image">
                  {/* <CiImageOn /> */}
                  {!preview ? <ImageIcon/>:
                  <img src={preview} alt="" />}
                  <input type="file" onChange={previewHandler}  id="post-image" hidden />
                </label>
              </div>
          </div>

          {/* Categories */}
          <div className={styles.panel}>
            <h6 className={styles.panelTitle}>CATEGORIES</h6>
            <select onChange={formHandler}  value={formData.category} className={styles.categorySelect} name="category">
              <option defaultValue disabled>Select Category</option>
              {allCat.map((category, index)=>{
                return <option index={index} value={category.id}>{category.name}</option>
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
              onChange={(event)=>setTag(event.target.value)}
              value={tag}
              name="tags"
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

            {isPublished ? <button type="submit" className={styles.updateBtn}>Add Post</button>:
            <button type="submit" className={styles.draftBtn}>Save Draft</button>}
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddAdminPost;