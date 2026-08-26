import React, { useContext, useMemo, useRef, useState } from "react";
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
import { CiImageOn } from "react-icons/ci";
const initialTags = ["Slow Living", "Wellness", "Rituals"];
import JoditEditor from 'jodit-react';
import { AppContext } from "../Context/AppContext";

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

  const {categories} = useContext(AppContext);
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
  const [content, setContent] = useState('');

  const [preview, setPreview]= useState(null);
  
  const previewHandler = (event)=>{
    const file = event.target.files[0];
    if(file){
      const imagePreview = URL.createObjectURL(file);
      setPreview(imagePreview);
    }
  }


  const [tag, setTag] = useState('');
  const [tags, setTags] = useState([]);

  const tagsHandler = (event)=>{
    if(event.key === 'Enter'){
      event.preventDefault();
      if(tags.includes(tag)) return;
      setTags([...tags, tag.trim()]);
    }
  }

  const deleteTagHandler = (index)=>{
    const newTags = tags.filter((_, i)=> i !== index);
    setTags(newTags);
  }

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

          <div className={`${styles.editorCard}`}>
            {/* <div className={styles.editorBody}> */}
              <JoditEditor
                ref={editor}
                value={content}
                config={config}
                // tabIndex={1} // tabIndex of textarea
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
                  <input type="file" onChange={previewHandler} name="post-image" id="post-image" hidden />
                </label>
              </div>
          </div>

          {/* Categories */}
          <div className={styles.panel}>
            <h6 className={styles.panelTitle}>CATEGORIES</h6>
            <select className={styles.categorySelect} defaultValue="Mindfulness">
              <option defaultChecked disabled>Select Category</option>
              {categories.map((category, index)=>{
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
              <span className={styles.linkText}>Public</span>
            </div>

            <div className="d-flex align-items-center justify-content-between mb-4">
              <span className={styles.fieldLabel}>Publish Date</span>
              <span className={styles.mutedText}>Immediately</span>
            </div>

            <button className={styles.updateBtn}>Add Post</button>
            <button className={styles.draftBtn}>Save Draft</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddAdminPost;