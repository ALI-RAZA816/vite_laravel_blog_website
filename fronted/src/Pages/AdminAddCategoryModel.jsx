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
  { id: "leaf", label: "Leaf", symbol: <BiLeaf /> },
  { id: "sprout", label: "Sprout", symbol: <GiChestnutLeaf /> },
  { id: "book", label: "Book", symbol: <MdOutlineMenuBook /> },
  { id: "home", label: "Home", symbol: <FaHouse /> },
  { id: "palette", label: "Palette", symbol: <LuPalette /> },
  { id: "globe", label: "Globe", symbol: <IoGlobeSharp /> },
];

const AdminAddCategoryModel = () => {
  const {
    showCategoryModel,
    CategoryModelHandler,
    newIcon,
    setNewIcon,
    newCatData,
    newCatFormHandler,
    addCategory,
  } = useCategory();

  return (
    <div className={`${styles.panel} ${showCategoryModel ? styles.hide : ""}`}>
      {/* Header */}
      <div className={`d-flex align-items-center justify-content-between ${styles.header}`}>
        <h4 className={styles.title}>Add category</h4>
        <button
          type="button"
          className={styles.closeBtn}
          aria-label="Close"
          onClick={CategoryModelHandler}
        >
          <BsXLg />
        </button>
      </div>

      {/* Body */}
      <form onSubmit={addCategory} className={styles.body}>
        {/* Category name */}
        <div className={styles.field}>
          <label htmlFor="cat_name" className={styles.label}>Category name</label>
          <input
            id="cat_name"
            type="text"
            onChange={newCatFormHandler}
            value={newCatData.cat_name}
            name="cat_name"
            className={styles.input}
            placeholder="e.g. Sustainable living"
          />
        </div>

        {/* Slug */}
        <div className={styles.field}>
          <label htmlFor="cat_slug" className={styles.label}>Slug</label>
          <div className={styles.slugGroup}>
            <span className={styles.slugPrefix}>blog.com/</span>
            <input
              id="cat_slug"
              type="text"
              onChange={newCatFormHandler}
              value={newCatData.slug}
              name="slug"
              className={styles.slugInput}
              placeholder="sustainable-living"
            />
          </div>
        </div>

        {/* Description */}
        <div className={styles.field}>
          <label htmlFor="cat_desc" className={styles.label}>Description</label>
          <textarea
            id="cat_desc"
            onChange={newCatFormHandler}
            value={newCatData.description}
            name="description"
            className={styles.textarea}
            rows={4}
            placeholder="A short overview of this category"
          />
        </div>

        {/* Icon */}
        <div className={styles.field}>
          <span className={styles.label}>Icon</span>
          <div className={styles.iconGrid}>
            {icons.map((icon) => (
              <button
                key={icon.id}
                type="button"
                aria-label={icon.label}
                aria-pressed={newIcon === icon.id}
                className={`${styles.iconBtn} ${newIcon === icon.id ? styles.iconBtnActive : ""}`}
                onClick={() => setNewIcon(icon.id)}
              >
                {icon.symbol}
              </button>
            ))}
            <input type="hidden" value={newIcon} name="icon_name" />
          </div>
        </div>

        <div className={styles.actions}>
          <button type="button" className={styles.cancelBtn} onClick={CategoryModelHandler}>
            Cancel
          </button>
          <button type="submit" className={styles.createBtn}>Create category</button>
        </div>
      </form>
    </div>
  );
};

export default AdminAddCategoryModel;