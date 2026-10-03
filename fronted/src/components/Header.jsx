import React, { useContext, useState } from 'react';
import styles from '../assets/Header.module.css';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { IoLogOutOutline, IoSettingsOutline } from "react-icons/io5";
import { HiOutlineMenuAlt3, HiOutlineX } from "react-icons/hi";
import { apiUrl, baseUrl } from '../Http/Http';
import { AppContext } from '../Context/AppContext';
import { usePublicSetting } from '../Context/PublicSettingContext';
import { useUser } from '../Context/UserContext';
import { showToast } from '../services/apiClient';

export default function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const { logo, settingData } = usePublicSetting();
  const { loggedUser } = useUser();
  const { mobileMenuOpen, toggleMobileMenu, closeMobileMenu } = useContext(AppContext);
  const [showProfile, setShowProfile] = useState(false);

  const profileHandler = () => setShowProfile(!showProfile);

  // Name se initials (single word name par bhi crash nahi karega)
  const initials = (loggedUser?.name || '')
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0])
    .join('')
    .toUpperCase();

  const logout = async (event) => {
    event.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${apiUrl}/logout`, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Bearer ${token}`
        },
      });
      const data = await response.json();
      if (response.ok) {
        showToast(data?.message, 'Success', 'success');
      } else {
        showToast(data?.message, 'Error', 'error');
      }
      if (data.status === true) {
        localStorage.clear();
        navigate('/');
      }
    } catch (error) {
      console.log(error);
    }
  };

  const navItems = [
    { to: '/', label: 'Home' },
    { to: '/about', label: 'About' },
    { to: '/contact', label: 'Contact' },
  ];

  return (
    <header className={styles.siteHeader}>
      <div className={styles.navInner}>
        {logo ? (
          <Link to="/" className={styles.logoImg}>
            <img src={`${baseUrl}/posts-images/${logo}`} alt={settingData?.site_title || 'Logo'} />
          </Link>
        ) : (
          <Link to="/" className={styles.logo}>{settingData?.site_title}</Link>
        )}

        <button
          type="button"
          className={styles.menuToggle}
          onClick={toggleMobileMenu}
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? <HiOutlineX /> : <HiOutlineMenuAlt3 />}
        </button>

        {mobileMenuOpen && <div className={styles.menuOverlay} onClick={closeMobileMenu}></div>}

        <div className={`${styles.menuWrapper} ${mobileMenuOpen ? styles.menuOpen : ''}`}>
          <nav className={styles.navLinks}>
            {navItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={closeMobileMenu}
                className={location.pathname === item.to ? styles.navActive : ''}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {!localStorage.getItem('token') ? (
            <div className={styles.navRight}>
              <Link to="/login" onClick={closeMobileMenu} className={styles.loginLink}>Login</Link>
              <Link to="/register" onClick={closeMobileMenu} className={styles.registerBtn}>Register</Link>
            </div>
          ) : (
            <div onClick={profileHandler} className={styles.profile}>
              <div className={styles.avatar}>
                {loggedUser?.image ? (
                  <img
                    src={`${baseUrl}/uploads/${loggedUser.image}`}
                    alt=""
                    className={styles.avatarImg}
                  />
                ) : (
                  initials
                )}
              </div>
              <div className={`${styles.dropdownMenu} ${showProfile ? styles.open : ''}`}>
                <button onClick={logout}>
                  <IoLogOutOutline className="me-2 fs-6" /><span>Logout</span>
                </button>
                <hr className="my-2" />
                <button>
                  <IoSettingsOutline className="me-2 fs-6" /><span>Setting</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}