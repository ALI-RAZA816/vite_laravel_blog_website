import React, { useContext } from "react";
import {
  BsPlusLg,
  BsChevronLeft,
  BsChevronRight,
  BsFlower1,
  BsBook,
  BsHouseDoor,
  BsPencilFill,
  BsTrashFill,
} from "react-icons/bs";
import styles from "../assets/AdminCategories.module.css";
import AdminAddCategoryModel from "./AdminAddCategoryModel";
import { AppContext } from "../Context/AppContext";
import { LuPalette } from "react-icons/lu";
import { IoGlobeSharp } from "react-icons/io5";

const category = [
  {
    icon: <BsFlower1 />,
    iconBg: "#fbeecb",
    iconColor: "#c98a1a",
    name: "Wellness",
    slug: "wellness-and-mindfulness",
    posts: "24 Posts",
  },
  {
    icon: <BsBook />,
    iconBg: "#e6e0f8",
    iconColor: "#5b3fd9",
    name: "Literature",
    slug: "classic-modern-literature",
    posts: "18 Posts",
  },
  {
    icon: <BsHouseDoor />,
    iconBg: "#e6e0f8",
    iconColor: "#5b3fd9",
    name: "Home Decor",
    slug: "minimalist-living-spaces",
    posts: "42 Posts",
  },
  {
    icon: <span style={{ fontSize: "14px" }}>&#127807;</span>,
    iconBg: "#e6e0f8",
    iconColor: "#5b3fd9",
    name: "Sustainability",
    slug: "eco-friendly-habits",
    posts: "12 Posts",
  },
];

const AdminCategories = () => {

    const {CategoryModelHandler} = useContext(AppContext);
    const {categories} = useContext(AppContext);

  return (
    <>
        <div className={styles.content}>
        {/* Heading */}
        <div className="d-flex justify-content-between align-items-start mb-4">
            <div>
            <h2 className={styles.pageTitle}>Manage Categories</h2>
            <div className={styles.breadcrumb}>
                <span>Dashboard</span>
                <span className={styles.crumbSep}>/</span>
                <span className={styles.crumbActive}>Categories</span>
            </div>
            </div>
            <button onClick={CategoryModelHandler}  className={`d-flex align-items-center ${styles.addBtn}`}>
            <BsPlusLg className="me-2" />Add Category</button>
        </div>

        {/* Table */}
        <div className={styles.tableCard}>
            <div className="table-responsive">
            <table className={`table mb-0 ${styles.categoriesTable}`}>
                <thead>
                <tr>
                    <th>NAME</th>
                    <th>SLUG</th>
                    <th>POST COUNT</th>
                    <th className="text-end">ACTIONS</th>
                </tr>
                </thead>
                <tbody>
                {categories.map((cat, index) => (
                    <tr key={index}>
                        <td>
                            <div className="d-flex align-items-center gap-3">
                            <div
                                className={styles.catIcon}
                                style={{ backgroundColor: cat.iconBg, color: cat.iconColor }}
                            >
                                {cat.icon === 'leaf' ? <BsFlower1 /> : '' || cat.icon === 'sprout' ? <span style={{ fontSize: "14px" }}>&#127807;</span> : '' || cat.icon === 'book' ?  <BsBook />  : '' || cat.icon === 'home' ?  <BsHouseDoor /> : '' || cat.icon === 'palette' ?  <LuPalette /> : '' || cat.icon === 'globe' ?  <IoGlobeSharp /> : ''}
                            </div>
                            <span className={styles.catName}>{cat.name}</span>
                            </div>
                        </td>
                        <td className={styles.slugCell}>{cat.slug}</td>
                        <td>
                            <span className={styles.postCountBadge}>{cat.post_count}</span>
                        </td>
                        <td>
                            <div className="d-flex align-items-center justify-content-end gap-3">
                            <BsPencilFill className={styles.actionIcon} />
                            <BsTrashFill className={`${styles.actionIcon} ${styles.deleteIcon}`} />
                            </div>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
            </div>

            {/* Pagination */}
            <div className={`d-flex justify-content-between align-items-center ${styles.paginationRow}`}>
            <span className={styles.showingText}>Showing 1-4 of 12 categories</span>
            <div className="d-flex align-items-center gap-2">
                <button className={styles.pageBtn}>
                <BsChevronLeft />
                </button>
                <button className={`${styles.pageBtn} ${styles.pageBtnActive}`}>1</button>
                <button className={styles.pageBtn}>2</button>
                <button className={styles.pageBtn}>3</button>
                <button className={styles.pageBtn}>
                <BsChevronRight />
                </button>
            </div>
            </div>
        </div>

        {/* Footer */}
        <div className={styles.footer}>
            <p className={styles.footerText}>© 2024 SlowLiving Blog. All rights reserved.</p>
            <div className={styles.footerLinks}>
            <a href="#">Terms of Service</a>
            <a href="#">Privacy Policy</a>
            </div>
        </div>
        </div>
        <AdminAddCategoryModel/>
    </>
  );
};

export default AdminCategories;