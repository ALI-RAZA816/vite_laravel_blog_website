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
} from "react-icons/bs";
import styles from "../assets/AdminSetting.module.css";
import { baseUrl } from "../Http/Http";
import { useSetting } from "../Context/SettingContext";
import LoadingSpinner from "../components/LoadingSpinner";

const socials = [
  { name: "f_url", label: "Facebook URL", icon: <BsFacebook />, placeholder: "https://facebook.com/..." },
  { name: "t_url", label: "Twitter / X URL", icon: <BsTwitterX />, placeholder: "https://twitter.com/..." },
  { name: "i_url", label: "Instagram URL", icon: <BsInstagram />, placeholder: "https://instagram.com/..." },
  { name: "l_url", label: "LinkedIn URL", icon: <BsLinkedin />, placeholder: "https://linkedin.com/..." },
];

const GeneralSetting = () => {
  const {
    logoPreview,
    logo,
    settingData: formData,
    settingFormHandler: formHandler,
    siteLogo,
    settingHandler,
    logoHandler,
    spinnerLoader,
  } = useSetting();

  return (
    <div className={styles.content}>
      {/* Heading */}
      <div className="d-flex justify-content-between align-items-start flex-wrap gap-3 mb-4">
        <div>
          <h2 className={styles.pageTitle}>General settings</h2>
          <p className={styles.pageSubtitle}>
            Set your blog's name, logo and social links.
          </p>
        </div>
        <button
          type="button"
          onClick={settingHandler}
          className={`d-flex align-items-center ${styles.saveBtn}`}
        >
          <BsSave2Fill className="me-2" />
          Save changes
        </button>
      </div>

      {spinnerLoader ? (
        <div style={{ height: "480px" }} className="d-flex justify-content-center align-items-center">
          <LoadingSpinner />
        </div>
      ) : (
        <>
          {/* Brand identity + Site logo */}
          <div className="row g-4 mb-4">
            <div className="col-12 col-xl-8">
              <div className={`${styles.panel} h-100`}>
                <div className={`d-flex align-items-center gap-2 ${styles.panelHeader}`}>
                  <BsPalette2 className={styles.panelIcon} />
                  <h6 className={styles.panelTitle}>Brand identity</h6>
                </div>
                <hr className={styles.divider} />

                <div className={styles.field}>
                  <label htmlFor="site_title" className={styles.label}>Site title</label>
                  <input
                    id="site_title"
                    type="text"
                    name="site_title"
                    value={formData.site_title}
                    onChange={formHandler}
                    className={styles.input}
                  />
                </div>

                <div className={styles.field}>
                  <label htmlFor="site_desc" className={styles.label}>Tagline</label>
                  <textarea
                    id="site_desc"
                    rows={2}
                    name="site_desc"
                    value={formData.site_desc}
                    onChange={formHandler}
                    className={styles.textarea}
                  ></textarea>
                </div>

                <div className={styles.field}>
                  <label htmlFor="site_copyright" className={styles.label}>Footer copyright text</label>
                  <input
                    id="site_copyright"
                    type="text"
                    name="site_copyright"
                    value={formData.site_copyright}
                    onChange={formHandler}
                    className={styles.input}
                  />
                </div>
              </div>
            </div>

            <div className="col-12 col-xl-4">
              <div className={`${styles.panel} h-100`}>
                <div className={`d-flex align-items-center gap-2 ${styles.panelHeader}`}>
                  <BsFileEarmarkImage className={styles.panelIcon} />
                  <h6 className={styles.panelTitle}>Site logo</h6>
                </div>
                <hr className={styles.divider} />

                <div className={styles.uploadBox}>
                  <label htmlFor="site-logo" className={styles.uploadLabel}>
                    {logoPreview ? (
                      <img className={styles.logoImg} src={logoPreview} alt="Logo preview" />
                    ) : logo ? (
                      <img className={styles.logoImg} src={`${baseUrl}/posts-images/${logo}`} alt="Current logo" />
                    ) : (
                      <div className={styles.uploadPlaceholder}>
                        <div className={styles.uploadIcon}>
                          <BsImage />
                        </div>
                        <p className={styles.uploadText}>Click to upload a logo</p>
                        <p className={styles.uploadHint}>SVG, PNG or JPG, up to 2MB</p>
                      </div>
                    )}
                    <input type="file" onChange={siteLogo} name="site_logo" id="site-logo" hidden />
                  </label>
                </div>

                <div className={styles.logoRow}>
                  <span className={styles.currentLogoLabel}>Current logo</span>
                  <button type="button" onClick={logoHandler} className={styles.removeLink}>
                    Remove
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Social connections */}
          <div className={`${styles.panel} mb-4`}>
            <div className={`d-flex align-items-center gap-2 ${styles.panelHeader}`}>
              <BsShare className={styles.panelIcon} />
              <h6 className={styles.panelTitle}>Social links</h6>
            </div>
            <hr className={styles.divider} />

            <div className="row g-4">
              {socials.map((s) => (
                <div key={s.name} className="col-12 col-md-6">
                  <label htmlFor={s.name} className={styles.label}>{s.label}</label>
                  <div className={styles.inputGroup}>
                    <span className={styles.inputIcon}>{s.icon}</span>
                    <input
                      id={s.name}
                      type="text"
                      name={s.name}
                      value={formData[s.name]}
                      onChange={formHandler}
                      className={styles.groupInput}
                      placeholder={s.placeholder}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default GeneralSetting;