import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../assets/Footer.module.css';
import { usePublicSetting } from '../Context/PublicSettingContext';
import { FaFacebookF } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { IoLogoInstagram } from "react-icons/io";
import { GrLinkedinOption } from "react-icons/gr";

export default function Footer() {
  const { settingData } = usePublicSetting();

  const socials = [
    { url: settingData?.f_url, icon: <FaFacebookF />, label: 'Facebook' },
    { url: settingData?.t_url, icon: <FaXTwitter />, label: 'X' },
    { url: settingData?.i_url, icon: <IoLogoInstagram />, label: 'Instagram' },
    { url: settingData?.l_url, icon: <GrLinkedinOption />, label: 'LinkedIn' },
  ];

  return (
    <footer className={styles.siteFooter}>
      <div className="container">
        <div className="row gy-4">
          <div className="col-md-5">
            <h3 className={styles.footerLogo}>{settingData?.site_title}</h3>
            <p className={styles.footerText}>{settingData?.site_desc}</p>
          </div>

          <div className="col-md-3 col-6">
            <h5 className={styles.footerHeading}>Navigation</h5>
            <ul className={styles.footerList}>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/about">About</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </div>

          <div className="col-md-4 col-6">
            <h5 className={styles.footerHeading}>Connect</h5>
            <div className={styles.socialIcons}>
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.url}
                  className={styles.socialLink}
                  aria-label={s.label}
                  target="_blank"
                  rel="noreferrer"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        <hr className={styles.footerDivider} />

        <div className={styles.footerBottom}>
          <p className={styles.footerCopyright}>{settingData?.site_copyright}</p>
          <div className={styles.footerLegal}>
            <span>Terms of Service</span>
            <span>Privacy Policy</span>
          </div>
        </div>
      </div>
    </footer>
  );
}