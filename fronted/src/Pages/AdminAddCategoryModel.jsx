import React, { useContext, useState } from "react";
import { BsXLg } from "react-icons/bs";
import styles from "../assets/AdminAddCategoryModel.module.css";
import { BiLeaf } from "react-icons/bi";
import { GiChestnutLeaf } from "react-icons/gi";
import { MdOutlineMenuBook } from "react-icons/md";
import { FaHouse } from "react-icons/fa6";
import { LuPalette } from "react-icons/lu";
import { IoGlobeSharp } from "react-icons/io5";
import { AppContext } from "../Context/AppContext";
import { apiUrl } from "../Http/Http";


const icons = [
  { id: "leaf", symbol: <BiLeaf />},
  { id: "sprout", symbol: <GiChestnutLeaf />},
  { id: "book", symbol: <MdOutlineMenuBook /> },
  { id: "home", symbol: <FaHouse />},
  { id: "palette", symbol:<LuPalette />},
  { id: "globe", symbol: <IoGlobeSharp />},
];

const AdminAddCategoryModel = ({ onClose }) => {

  
  const {setRefresh} = useContext(AppContext);
  const {showCategoryModel} = useContext(AppContext);
  const {CategoryModelHandler} = useContext(AppContext);
  const [selectedIcon, setSelectedIcon] = useState("sprout");

  const [formData, setFormData] = useState({
    cat_name:'',
    slug:'',
    description:'',
    icon_name:''
  });
  const [formDataErr, setFormDataErr] = useState({
    cat_nameErr:'',
    slugErr:'',
    descriptionErr:'',
    icon_nameErr:''
  });


  const formHandler = (event)=>{
    const {name, value} = event.target;
    setFormData((prev)=>({
      ...prev,
      [name]:value
    }));
  }

  const submitCategory = async (event)=>{
    event.preventDefault();
    if(!formData.cat_name){
      setFormDataErr({
        cat_nameErr:'The category name is required'
      });
      return;
    }
    if(!formData.slug){
      setFormDataErr({
        slugErr:'The slug-name is required'
      });
      return;
    }
    if(!selectedIcon){
      setFormDataErr({
        slugErr:'The icon-name is required'
      });
      return;
    }

    const payload = {
      ...formData,
      icon_name:selectedIcon
    }

    const token = localStorage.getItem('token');
    try{
      const response = await fetch(`${apiUrl}/categories`,{
        method:'POST',
        headers:{
          'Content-type':'application/json',
          'Accept':'application/json',
          'Authorization':`Bearer ${token}`
        },
        body:JSON.stringify(payload)
      });

      const data = await response.json();
      if(!response.ok){
        if(data?.errors?.cat_name){
          setFormDataErr({
            cat_nameErr:data?.errors.cat_name[0]
          });
        }else if(data?.errors.slug){
          setFormDataErr({
            slugErr:data?.errors.slug[0]
          });
        }
      }else{
        setFormData({
          cat_name:'',
          slug:'',
          description:'',
          icon_name:''
        });
        setFormDataErr({
          cat_nameErr:'',
          slugErr:'',
          descriptionErr:'',
          icon_nameErr:''
        })
        setRefresh(prev => prev + 1);
        CategoryModelHandler();
      }

    }catch(error){
      console.log(error);
    }
  }

  return (
    <div  className={`${styles.panel} ${showCategoryModel && `${styles.hide}`}`}>
      {/* Header */}
      <div className={`d-flex align-items-center justify-content-between ${styles.header}`}>
        <h4 className={styles.title}>Add New Category</h4>
        <BsXLg className={styles.closeIcon} onClick={CategoryModelHandler} />
      </div>

      {/* Body */}
      <form onSubmit={submitCategory} className={styles.body}>
        {/* Category Name */}
        <div className={styles.field}>
          <label className={styles.label}>Category Name</label>
          <input
            type="text"
            onChange={formHandler}
            value={formData.cat_name}
            name="cat_name"
            className={styles.input}
            placeholder="e.g., Sustainable Living"
          />
          <span className="text-danger">{formDataErr.cat_nameErr}</span>
        </div>

        {/* Slug */}
        <div className={styles.field}>
          <label className={styles.label}>Slug (URL)</label>
          <div className={styles.slugGroup}>
            <span className={styles.slugPrefix}>blog.com/</span>
            <input
              type="text"
              onChange={formHandler}
              value={formData.slug}
              name="slug"
              className={styles.slugInput}
              placeholder="sustainable-living"
            />
          </div>
             <span className="text-danger">{formDataErr.slugErr}</span>
        </div>

        {/* Description */}
        <div className={styles.field}>
          <label className={styles.label}>Description</label>
          <textarea
          onChange={formHandler}
            value={formData.description}
            name="description"
            className={styles.textarea}
            rows={4}
            placeholder="Brief overview of this category..."
          />
           <span className="text-danger">{formDataErr.descriptionErr}</span>
        </div>

        {/* Select Icon */}
        <div className={styles.field}>
          <label className={styles.label}>Select Icon</label>
          <div className={styles.iconGrid}>
            {icons.map((icon) => (
              <button
                key={icon.id}
                type="button"
                className={`${styles.iconBtn} ${
                  selectedIcon === icon.id ? styles.iconBtnActive : ""
                }`}
                onClick={() => setSelectedIcon(icon.id)}
              >
                {icon.symbol}
              </button>
            ))}
          </div>
           {/* <span className="text-danger">{formDataErr.icon_nameErr}</span> */}
        </div>
        <button type="submit" className={styles.createBtn}>Create Category</button>
      </form>
    </div>
  );
};

export default AdminAddCategoryModel;