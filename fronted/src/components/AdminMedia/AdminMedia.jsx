import AdminLayout from "../AdminLayout/AdminLayout.jsx";
import styles from "./AdminMedia.module.css";

const media = [
  { type: "img", src: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=300" },
  { type: "img", src: "https://images.unsplash.com/photo-1499638673689-79a0b5115d87?w=300" },
  { type: "img", src: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=300" },
  { type: "img", src: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=300" },
  { type: "img", src: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=300" },
  { type: "img", src: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=300" },
  { type: "img", src: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=300" },
  { type: "img", src: "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?w=300" },
  { type: "file", name: "Terms_v2.pdf" },
  { type: "img", src: "https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?w=300" },
  { type: "img", src: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=300" },
  { type: "img", src: "https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?w=300" },
];

export default function AdminMedia() {
  return (
    <AdminLayout active="media" searchPlaceholder="Search media library..." userName="Admin User">
      <div className={styles.headerRow}>
        <div>
          <h1>Media Library</h1>
          <p>Manage images, headers, and product assets</p>
        </div>
        <div className={styles.headerActions}>
          <button className={styles.filterBtn}>&#9776; Filter</button>
          <button className={styles.uploadBtn}>&#8679; Upload New Media</button>
        </div>
      </div>

      <div className={styles.toolbar}>
        <label>
          <input type="checkbox" /> Select All
        </label>
        <span className={styles.selectedCount}>12 Items Selected</span>
        <div className={styles.toolbarRight}>
          <span className={styles.deleteBtn}>&#128465; Delete Selected</span>
          <span>&#8681; Download</span>
        </div>
      </div>

      <div className={styles.grid}>
        {media.map((m, i) =>
          m.type === "img" ? (
            <img key={i} src={m.src} alt="" className={styles.item} />
          ) : (
            <div key={i} className={styles.fileItem}>
              <span>&#128196;</span>
              <p>{m.name}</p>
            </div>
          )
        )}
      </div>

      <button className={styles.fab}>+</button>
    </AdminLayout>
  );
}
