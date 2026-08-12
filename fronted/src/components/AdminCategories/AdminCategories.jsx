import { useState } from "react";
import AdminLayout from "../AdminLayout/AdminLayout.jsx";
import styles from "./AdminCategories.module.css";

const categories = [
  { icon: "\u{1F343}", name: "Wellness", slug: "wellness-and-mindfulness", count: "24 Posts" },
  { icon: "\u{1F4D6}", name: "Literature", slug: "classic-modern-literature", count: "18 Posts" },
  { icon: "\u{1F3E0}", name: "Home Decor", slug: "minimalist-living-spaces", count: "42 Posts" },
  { icon: "\u267B", name: "Sustainability", slug: "eco-friendly-habits", count: "12 Posts" },
];

const icons = ["\u267B", "\u{1F343}", "\u{1F4D6}", "\u{1F3E0}", "\u{1F3A8}", "\u{1F4F7}"];

export default function AdminCategories() {
  const [panelOpen, setPanelOpen] = useState(true);
  const [selectedIcon, setSelectedIcon] = useState(1);

  return (
    <AdminLayout active="categories" searchPlaceholder="Search categories..." userName="Admin User">
      <div className={styles.wrap}>
        <div className={styles.mainCol}>
          <div className={styles.headerRow}>
            <div>
              <h1>Manage Categories</h1>
              <p className={styles.breadcrumb}>
                Dashboard / <strong>Categories</strong>
              </p>
            </div>
            <button className={styles.addBtn} onClick={() => setPanelOpen(true)}>
              + Add Category
            </button>
          </div>

          <div className={styles.tableCard}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>NAME</th>
                  <th>SLUG</th>
                  <th>POST COUNT</th>
                  <th>ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {categories.map((c, i) => (
                  <tr key={i}>
                    <td>
                      <div className={styles.nameCell}>
                        <span className={styles.iconBox}>{c.icon}</span>
                        {c.name}
                      </div>
                    </td>
                    <td className={styles.slug}>{c.slug}</td>
                    <td><span className={styles.countPill}>{c.count}</span></td>
                    <td></td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className={styles.pagination}>
              <span>Showing 1-4 of 12 categories</span>
              <div className={styles.pageButtons}>
                <button>&lsaquo;</button>
                <button className={styles.pageActive}>1</button>
                <button>2</button>
                <button>3</button>
                <button>&rsaquo;</button>
              </div>
            </div>
          </div>
        </div>

        {panelOpen && (
          <div className={styles.panel}>
            <div className={styles.panelHeader}>
              <h4>Add New Category</h4>
              <span onClick={() => setPanelOpen(false)}>&times;</span>
            </div>

            <label>Category Name</label>
            <input placeholder="e.g., Sustainable Living" />

            <label>Slug (URL)</label>
            <div className={styles.slugRow}>
              <span>blog.com/</span>
              <input placeholder="sustainable-living" />
            </div>

            <label>Description</label>
            <textarea rows="4" placeholder="Brief overview of this category..."></textarea>

            <label>Select Icon</label>
            <div className={styles.iconGrid}>
              {icons.map((ic, i) => (
                <div
                  key={i}
                  className={i === selectedIcon ? styles.iconActive : styles.iconOption}
                  onClick={() => setSelectedIcon(i)}
                >
                  {ic}
                </div>
              ))}
            </div>

            <div className={styles.panelActions}>
              <button className={styles.cancelBtn} onClick={() => setPanelOpen(false)}>
                Cancel
              </button>
              <button className={styles.createBtn}>Create Category</button>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
