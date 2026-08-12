import { useState } from "react";
import AdminLayout from "../AdminLayout/AdminLayout.jsx";
import styles from "./AdminSettings.module.css";

export default function AdminSettings() {
  const [maintenance, setMaintenance] = useState(false);

  return (
    <AdminLayout
      active="settings"
      searchPlaceholder="Search settings..."
      userName="Alex Rivera"
      userRole="Administrator"
      userAvatar="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100"
    >
      <div className={styles.headerRow}>
        <div>
          <h1>General Settings</h1>
          <p>Configure your blog's core identity and global visibility options.</p>
        </div>
        <button className={styles.saveBtn}>&#128190; Save Changes</button>
      </div>

      <div className="row">
        <div className="col-lg-8">
          <div className={styles.card}>
            <h5>&#127912; BRAND IDENTITY</h5>
            <hr />
            <label>Site Title</label>
            <input defaultValue="SlowLiving Blog" />

            <label>Tagline</label>
            <textarea rows="2" defaultValue="Curating moments of mindfulness in a fast-paced digital world."></textarea>

            <label>Footer Copyright Text</label>
            <input defaultValue="© 2024 SlowLiving Blog. All rights reserved." />
          </div>
        </div>

        <div className="col-lg-4">
          <div className={styles.card}>
            <h5>&#128196; SITE LOGO</h5>
            <hr />
            <div className={styles.uploadBox}>
              <span className={styles.uploadIcon}>&#128247;</span>
              <p>Click to upload or drag &amp; drop</p>
              <span className={styles.uploadNote}>SVG, PNG, JPG (max 2MB)</span>
            </div>
            <div className={styles.currentLogoRow}>
              <span>Current Logo</span>
              <span className={styles.removeLink}>Remove</span>
            </div>
            <div className={styles.currentLogo}>SlowLiving</div>
          </div>
        </div>
      </div>

      <div className={styles.card}>
        <h5>&#128279; SOCIAL CONNECTIONS</h5>
        <hr />
        <div className="row">
          <div className="col-md-6 mb-3">
            <label>Facebook URL</label>
            <div className={styles.inputWithIcon}>
              <span>&#128279;</span>
              <input placeholder="https://facebook.com/..." />
            </div>
          </div>
          <div className="col-md-6 mb-3">
            <label>Twitter / X URL</label>
            <div className={styles.inputWithIcon}>
              <span>@</span>
              <input placeholder="https://twitter.com/..." />
            </div>
          </div>
          <div className="col-md-6 mb-3">
            <label>Instagram URL</label>
            <div className={styles.inputWithIcon}>
              <span>&#128247;</span>
              <input placeholder="https://instagram.com/..." />
            </div>
          </div>
          <div className="col-md-6 mb-3">
            <label>LinkedIn URL</label>
            <div className={styles.inputWithIcon}>
              <span>&#128279;</span>
              <input placeholder="https://linkedin.com/..." />
            </div>
          </div>
        </div>
      </div>

      <div className={`${styles.card} ${styles.maintenanceCard}`}>
        <div className={styles.maintenanceIcon}>&#128737;</div>
        <div className={styles.maintenanceText}>
          <h5>Maintenance Mode</h5>
          <p>
            When enabled, visitors will see a "Coming Soon" page while you make changes.
          </p>
        </div>
        <div className={styles.maintenanceToggleWrap}>
          <span>Status: {maintenance ? "Enabled" : "Disabled"}</span>
          <button
            className={maintenance ? styles.toggleOn : styles.toggleOff}
            onClick={() => setMaintenance(!maintenance)}
          >
            <span className={styles.knob}></span>
          </button>
        </div>
      </div>
    </AdminLayout>
  );
}
