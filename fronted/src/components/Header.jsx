import React from 'react';
import styles from '../assets/Header.module.css';
import {Link, useLocation} from 'react-router-dom'

export default function Header() {
  const location = useLocation();
  return (
    <header className={styles.navbar}>
        <div className={styles.navInner}>
            <Link to="/" className={styles.logo}>SlowLiving Blog</Link>
            <nav className={styles.navLinks}>
              <Link to="/" className={location.pathname === '/' ? styles.navActive : ''}>Home</Link>
              <Link to="/all-posts" className={location.pathname === '/all-posts' ? styles.navActive : ''}>All Posts</Link>
              <Link to="/about" className={location.pathname === '/about' ? styles.navActive : ''}>About</Link>
              <Link to="/contact" className={location.pathname === '/contact' ? styles.navActive : ''}>Contact</Link>
            </nav>
            <div className={styles.navRight}>
              <Link to="/login" className={styles.loginLink}>Login</Link>
              <Link to="/register" className={styles.registerBtn}>Register</Link>
            </div>
        </div>
    </header>
  );
}
