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


const icons = [
  { id: "leaf", symbol: <BiLeaf />},
  { id: "sprout", symbol: <GiChestnutLeaf />},
  { id: "book", symbol: <MdOutlineMenuBook /> },
  { id: "home", symbol: <FaHouse />},
  { id: "palette", symbol:<LuPalette />},
  { id: "globe", symbol: <IoGlobeSharp />},
];

const AdminAddCategoryModel = ({ onClose }) => {
  const [selectedIcon, setSelectedIcon] = useState("sprout");
  const {showCategoryModel} = useContext(AppContext);
  const {CategoryModelHandler} = useContext(AppContext);

  return (
    <div className={`${styles.panel} ${showCategoryModel && `${styles.hide}`}`}>
      {/* Header */}
      <div className={`d-flex align-items-center justify-content-between ${styles.header}`}>
        <h4 className={styles.title}>Add New Category</h4>
        <BsXLg className={styles.closeIcon} onClick={CategoryModelHandler} />
      </div>

      {/* Body */}
      <div className={styles.body}>
        {/* Category Name */}
        <div className={styles.field}>
          <label className={styles.label}>Category Name</label>
          <input
            type="text"
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
              type="text"
              className={styles.slugInput}
              placeholder="sustainable-living"
            />
          </div>
        </div>

        {/* Description */}
        <div className={styles.field}>
          <label className={styles.label}>Description</label>
          <textarea
            className={styles.textarea}
            rows={4}
            placeholder="Brief overview of this category..."
          ></textarea>
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
      </div>

      {/* Footer */}
      <div className={`d-flex align-items-center gap-3 ${styles.footer}`}>
        <button className={styles.cancelBtn} onClick={onClose}>
          Cancel
        </button>
        <button className={styles.createBtn}>Create Category</button>
      </div>
    </div>
  );
};

export default AdminAddCategoryModel;