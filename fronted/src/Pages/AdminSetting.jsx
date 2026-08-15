import React, { useState } from "react";
import {
  BsSave2Fill,
  BsPalette2,
  BsFileEarmarkImage,
  BsImage,
  BsShare,
  BsFacebook,
  BsTwitterX,
  BsInstagram,
  BsLinkedin,
  BsShieldFillCheck,
} from "react-icons/bs";
import styles from "../assets/AdminSetting.module.css";

const GeneralSetting = () => {
  const [maintenance, setMaintenance] = useState(false);

  return (
    <div className={styles.content}>
      {/* Heading */}
      <div className="d-flex justify-content-between align-items-start flex-wrap gap-3 mb-4">
        <div>
          <h2 className={styles.pageTitle}>General Settings</h2>
          <p className={styles.pageSubtitle}>
            Configure your blog's core identity and global visibility options.
          </p>
        </div>
        <button className={`d-flex align-items-center ${styles.saveBtn}`}>
          <BsSave2Fill className="me-2" />
          Save Changes
        </button>
      </div>

      {/* Brand Identity + Site Logo */}
      <div className="row g-4 mb-4">
        <div className="col-12 col-xl-8">
          <div className={styles.panel}>
            <div className={`d-flex align-items-center gap-2 ${styles.panelHeader}`}>
              <BsPalette2 className={styles.panelIcon} />
              <h6 className={styles.panelTitle}>BRAND IDENTITY</h6>
            </div>
            <hr className={styles.divider} />

            <div className={styles.field}>
              <label className={styles.label}>Site Title</label>
              <input
                type="text"
                className={styles.input}
                defaultValue="SlowLiving Blog"
              />
            </div>

            <div className={styles.field}>
              <label className={styles.label}>Tagline</label>
              <textarea
                className={styles.textarea}
                rows={2}
                defaultValue="Curating moments of mindfulness in a fast-paced digital world."
              ></textarea>
            </div>

            <div className={styles.field}>
              <label className={styles.label}>Footer Copyright Text</label>
              <input
                type="text"
                className={styles.input}
                defaultValue="© 2024 SlowLiving Blog. All rights reserved."
              />
            </div>
          </div>
        </div>

        <div className="col-12 col-xl-4">
          <div className={`${styles.panel} h-100`}>
            <div className={`d-flex align-items-center gap-2 ${styles.panelHeader}`}>
              <BsFileEarmarkImage className={styles.panelIcon} />
              <h6 className={styles.panelTitle}>SITE LOGO</h6>
            </div>
            <hr className={styles.divider} />

            <div className={styles.uploadBox}>
              <div className={styles.uploadIcon}>
                <BsImage />
              </div>
              <p className={styles.uploadText}>Click to upload or drag &amp; drop</p>
              <p className={styles.uploadHint}>SVG, PNG, JPG (max 2MB)</p>
            </div>

            <div className="d-flex justify-content-between align-items-center mt-4 mb-2">
              <span className={styles.currentLogoLabel}>Current Logo</span>
              <a href="#" className={styles.removeLink}>Remove</a>
            </div>
            <div className={styles.currentLogo}>SlowLiving</div>
          </div>
        </div>
      </div>

      {/* Social Connections */}
      <div className={`${styles.panel} mb-4`}>
        <div className={`d-flex align-items-center gap-2 ${styles.panelHeader}`}>
          <BsShare className={styles.panelIcon} />
          <h6 className={styles.panelTitle}>SOCIAL CONNECTIONS</h6>
        </div>
        <hr className={styles.divider} />

        <div className="row g-4">
          <div className="col-12 col-md-6">
            <label className={styles.label}>Facebook URL</label>
            <div className={styles.inputGroup}>
              <span className={`${styles.inputIcon} ${styles.iconBlue}`}>
                <BsFacebook />
              </span>
              <input
                type="text"
                className={styles.groupInput}
                placeholder="https://facebook.com/..."
              />
            </div>
          </div>

          <div className="col-12 col-md-6">
            <label className={styles.label}>Twitter / X URL</label>
            <div className={styles.inputGroup}>
              <span className={`${styles.inputIcon} ${styles.iconBlue}`}>
                <BsTwitterX />
              </span>
              <input
                type="text"
                className={styles.groupInput}
                placeholder="https://twitter.com/..."
              />
            </div>
          </div>

          <div className="col-12 col-md-6">
            <label className={styles.label}>Instagram URL</label>
            <div className={styles.inputGroup}>
              <span className={`${styles.inputIcon} ${styles.iconPink}`}>
                <BsInstagram />
              </span>
              <input
                type="text"
                className={styles.groupInput}
                placeholder="https://instagram.com/..."
              />
            </div>
          </div>

          <div className="col-12 col-md-6">
            <label className={styles.label}>LinkedIn URL</label>
            <div className={styles.inputGroup}>
              <span className={`${styles.inputIcon} ${styles.iconBlue}`}>
                <BsLinkedin />
              </span>
              <input
                type="text"
                className={styles.groupInput}
                placeholder="https://linkedin.com/..."
              />
            </div>
          </div>
        </div>
      </div>

      {/* Maintenance Mode */}
      <div className={`d-flex justify-content-between align-items-center flex-wrap gap-3 ${styles.maintenancePanel}`}>
        <div className="d-flex align-items-start gap-3">
          <div className={styles.maintenanceIcon}>
            <BsShieldFillCheck />
          </div>
          <div>
            <h5 className={styles.maintenanceTitle}>Maintenance Mode</h5>
            <p className={styles.maintenanceText}>
              When enabled, visitors will see a "Coming Soon" page while you make changes.
            </p>
          </div>
        </div>

        <div className="d-flex align-items-center gap-3">
          <div className={styles.statusLabel}>
            Status:<br />
            <span className={styles.statusValue}>
              {maintenance ? "Enabled" : "Disabled"}
            </span>
          </div>
          <label className={styles.switch}>
            <input
              type="checkbox"
              checked={maintenance}
              onChange={() => setMaintenance(!maintenance)}
            />
            <span className={styles.slider}></span>
          </label>
        </div>
      </div>
    </div>
  );
};

export default GeneralSetting;