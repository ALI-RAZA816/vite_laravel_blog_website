import React from 'react'
import styles from '../assets/Footer.module.css'
import { FaEarthAfrica } from "react-icons/fa6";
import { FiCamera } from "react-icons/fi";
import { MdOutlineMail } from "react-icons/md";


export default function Footer() {
  return (
    <div>
      {/* Footer */}
      <footer className={styles.footer}>
        <div className="container">
          <div className="row">
            <div className="col-md-4">
              <h3 className={styles.footerLogo}>SlowLiving</h3>
              <p className={styles.footerText}>
                A digital garden dedicated to the pursuit of intentionality, simplicity, and the
                beauty found in the everyday. We explore what it means to live well in a
                fast-paced world.
              </p>
            </div>
            <div className="col-md-4 text-center">
              <h5 className={styles.footerHeading}>NAVIGATION</h5>
              <ul className={styles.footerList}>
                <li>Home</li>
                <li>Archive</li>
                <li>The Shop</li>
                <li>About Us</li>
              </ul>
            </div>
            <div className="col-md-4 text-center">
              <h5 className={styles.footerHeading}>CONNECT</h5>
              <div className={styles.socialIcons}>
                <span><FaEarthAfrica /></span>
                <span><FiCamera /></span>
                <span><MdOutlineMail /></span>
              </div>
            </div>
          </div>
          <hr className={styles.footerDivider} />
          <div className={styles.footerBottom}>
            <span>Terms of Service</span>
            <span>Privacy Policy</span>
          </div>
          <p className={styles.footerCopyright}>
            © 2024 SlowLiving Blog. All rights reserved. Crafting quiet moments for your screen.
          </p>
        </div>
      </footer>
    </div>
  )
}
