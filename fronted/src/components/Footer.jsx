import React from 'react'
import styles from '../assets/Footer.module.css'
import { usePublicSetting } from '../Context/PublicSettingContext';
import { FaFacebookF } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { IoLogoInstagram } from "react-icons/io";
import { GrLinkedinOption } from "react-icons/gr";


export default function Footer() {

  const {settingData} = usePublicSetting();

  return (
    <div>
      {/* Footer */}
      <footer className={styles.footer}>
        <div className="container">
          <div className="row">
            <div className="col-md-4">
              <h3 className={styles.footerLogo}>{settingData.site_title}</h3>
              <p className={styles.footerText}>{settingData.site_desc}
              </p>
            </div>
            <div className="col-md-4 text-center">
              <h5 className={styles.footerHeading}>NAVIGATION</h5>
              <ul className={styles.footerList}>
                <li>Home</li>
                <li>About</li>
                <li>Contact</li>
              </ul>
            </div>
            <div className="col-md-4 text-center">
              <h5 className={styles.footerHeading}>CONNECT</h5>
              <div className={styles.socialIcons}>
                <a className='text-dark' href={settingData.f_url}><FaFacebookF /></a>
                <a className='text-dark' href={settingData.t_url}><FaXTwitter /></a>
                <a className='text-dark' href={settingData.i_url}><IoLogoInstagram /></a>
                <a className='text-dark' href={settingData.l_url}><GrLinkedinOption /></a>
              </div>
            </div>
          </div>
          <hr className={styles.footerDivider} />
          <div className={styles.footerBottom}>
            <span>Terms of Service</span>
            <span>Privacy Policy</span>
          </div>
          <p className={styles.footerCopyright}>
            {settingData.site_copyright}
          </p>
        </div>
      </footer>
    </div>
  )
}
