import React from "react";
import { BsXLg } from "react-icons/bs";
import styles from "../assets/AdminAddCategoryModel.module.css";
import { BiLeaf } from "react-icons/bi";
import { GiChestnutLeaf } from "react-icons/gi";
import { MdOutlineMenuBook } from "react-icons/md";
import { FaHouse } from "react-icons/fa6";
import { LuPalette } from "react-icons/lu";
import { IoGlobeSharp } from "react-icons/io5";
import { useCategory } from "../Context/CategoryContext";

const icons = [
  { id: "leaf", symbol: <BiLeaf />},
  { id: "sprout", symbol: <GiChestnutLeaf />},
  { id: "book", symbol: <MdOutlineMenuBook /> },
  { id: "home", symbol: <FaHouse />},
  { id: "palette", symbol:<LuPalette />},
  { id: "globe", symbol: <IoGlobeSharp />},
];

const AdminAddCategoryModel = () => {

  const {
    showCategoryModel,
    CategoryModelHandler,
    newIcon,
    setNewIcon,
    newCatData,
    newCatErr,
    newCatFormHandler,
    addCategory,
  } = useCategory();

  return (
    <div  className={`${styles.panel} ${showCategoryModel && `${styles.hide}`}`}>
      {/* Header */}
      <div className={`d-flex align-items-center justify-content-between ${styles.header}`}>
        <h4 className={styles.title}>Add New Category</h4>
        <BsXLg className={styles.closeIcon} onClick={CategoryModelHandler} />
      </div>

      {/* Body */}
      <form onSubmit={addCategory} className={styles.body}>
        {/* Category Name */}
        <div className={styles.field}>
          <label className={styles.label}>Category Name</label>
          <input
            type="text"
            onChange={newCatFormHandler}
            value={newCatData.cat_name}
            name="cat_name"
            className={styles.input}
            placeholder="e.g., Sustainable Living"
          />
          <span className="text-danger">{newCatErr.cat_nameErr}</span>
        </div>

        {/* Slug */}
        <div className={styles.field}>
          <label className={styles.label}>Slug (URL)</label>
          <div className={styles.slugGroup}>
            <span className={styles.slugPrefix}>blog.com/</span>
            <input
              type="text"
              onChange={newCatFormHandler}
              value={newCatData.slug}
              name="slug"
              className={styles.slugInput}
              placeholder="sustainable-living"
            />
          </div>
             <span className="text-danger">{newCatErr.slugErr}</span>
        </div>

        {/* Description */}
        <div className={styles.field}>
          <label className={styles.label}>Description</label>
          <textarea
          onChange={newCatFormHandler}
            value={newCatData.description}
            name="description"
            className={styles.textarea}
            rows={4}
            placeholder="Brief overview of this category..."
          />
           <span className="text-danger">{newCatErr.descriptionErr}</span>
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
                  newIcon === icon.id ? styles.iconBtnActive : ""
                }`}
                onClick={() => setNewIcon(icon.id)}
              >
                {icon.symbol}
              </button>
            ))}
          </div>
        </div>
        <button type="submit" className={styles.createBtn}>Create Category</button>
      </form>
    </div>
  );
};

export default AdminAddCategoryModel;