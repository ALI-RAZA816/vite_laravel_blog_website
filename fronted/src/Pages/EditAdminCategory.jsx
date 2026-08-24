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

const AdminAddCategoryModel = () => {

  const {setRefresh} = useContext(AppContext);
  const {selectedIcon} = useContext(AppContext);
  const {setSelectedIcon} = useContext(AppContext);
  const {editCategory} = useContext(AppContext);
  const {formHandler} = useContext(AppContext);
  const {showEditCategoryModel} = useContext(AppContext);
  const {setShowEditCategoryModel} = useContext(AppContext);
  const {EditCategoryModelHandler} = useContext(AppContext);


  // update category
  const updateCategory = async (event)=>{
    event.preventDefault();
    const token = localStorage.getItem('token');
    const payload = {
      ...editCategory,
      icon:selectedIcon
    }
    try{
      const response = await fetch(`${apiUrl}/categories/${editCategory.id}`,{
        method:'PUT',
        headers:{
          'Content-type':'application/json',
          'Accept':'application/json',
          'Authorization':`Bearer ${token}`
        },
        body:JSON.stringify(payload)
      })
      const data = await response.json();
      if(response.ok){
        setRefresh(prev => prev + 1);
        setShowEditCategoryModel(!showEditCategoryModel);
      }else{
        console.log(data);
      }
    }catch(error){
      console.log(error);
    }
  }
  

  return (
    <div  className={`${styles.panel} ${showEditCategoryModel && `${styles.hide}`}`}>
      {/* Header */}
      <div className={`d-flex align-items-center justify-content-between ${styles.header}`}>
        <h4 className={styles.title}>Update Category</h4>
        <BsXLg className={styles.closeIcon} onClick={EditCategoryModelHandler} />
      </div>

      {/* Body */}
      <form onSubmit={updateCategory} className={styles.body}>
        {/* Category Name */}
        <div className={styles.field}>
          <label className={styles.label}>Category Name</label>
          <input
            onChange={formHandler}
            value={editCategory.cat_name}
            type="text"
            name="cat_name"
            className={styles.input}
            placeholder="e.g., Sustainable Living"
          />
        </div>

        {/* Slug */}
        <div className={styles.field}>
          <label className={styles.label}>Slug (URL)</label>
          <div className={styles.slugGroup}>
            <span className={styles.slugPrefix}>blog.com/</span>
            <input
              onChange={formHandler}
              value={editCategory.slug}
              type="text"
              name="slug"
              className={styles.slugInput}
              placeholder="sustainable-living"
            />
          </div>
        </div>

        {/* Description */}
        <div className={styles.field}>
          <label className={styles.label}>Description</label>
          <textarea
            onChange={formHandler}
            name="description"
            value={editCategory.description}
            className={styles.textarea}
            rows={4}
            placeholder="Brief overview of this category..."
          />
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
        </div>
        <button type="submit" className={styles.createBtn}>Update Category</button>
      </form>
    </div>
  );
};

export default AdminAddCategoryModel;