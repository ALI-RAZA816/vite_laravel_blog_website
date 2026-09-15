import React, { useContext, useState } from 'react';
import styles from '../assets/Header.module.css';
import {Link, useLocation, useNavigate} from 'react-router-dom'
import { IoLogOutOutline } from "react-icons/io5";
import { IoSettingsOutline } from "react-icons/io5";
import { HiOutlineMenuAlt3, HiOutlineX } from "react-icons/hi";
import { apiUrl, baseUrl } from '../Http/Http';
import { AppContext } from '../Context/AppContext';



export default function Header() {
  
  const location = useLocation();
  const navigate = useNavigate();
  const {logo} = useContext(AppContext);
  const {settingData} = useContext(AppContext);
  const {loggedUser} = useContext(AppContext);
  const {mobileMenuOpen, toggleMobileMenu, closeMobileMenu} = useContext(AppContext);
  const [showProfile, setShowProfile] = useState(false);
  const profileHandler = ()=>{
    setShowProfile(!showProfile);
  }

  const logout = async (event)=>{
    event.preventDefault();
    try{
      const token = localStorage.getItem('token');
      const response = await fetch(`${apiUrl}/logout`,{
        method:'POST',
        headers:{
          'Content-type':'application/json',
          'Accept':'application/json',
          'Authorization':`Bearer ${token}`
        },
      });
      const data = await response.json();
      console.log(data);
      if(data.status === true){
        localStorage.clear();
        navigate('/');
      }
    }catch(error){
      console.log(error);
    }
  }

  return (
    <header className={`${styles.navbar} shadow-sm`}>
        <div className={`${styles.navInner}`}>
          {logo ? <div className={`${styles.logoImg} overflow-hidden`}><img src={`${baseUrl}/posts-images/${logo}`} alt="" /></div> : <Link to="/" className={styles.logo}>{settingData.site_title}</Link>}

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
                <Link to="/" onClick={closeMobileMenu} className={location.pathname === '/' ? styles.navActive : ''}>Home</Link>
                <Link to="/about" onClick={closeMobileMenu} className={location.pathname === '/about' ? styles.navActive : ''}>About</Link>
                <Link to="/contact" onClick={closeMobileMenu} className={location.pathname === '/contact' ? styles.navActive : ''}>Contact</Link>
              </nav>
              {!localStorage.getItem('token') ? <div className={styles.navRight}>
                <Link to="/login" onClick={closeMobileMenu} className={styles.loginLink}>Login</Link>
                <Link to="/register" onClick={closeMobileMenu} className={styles.registerBtn}>Register</Link>
              </div>
              :<div onClick={profileHandler} className={styles.profile}>
                {loggedUser.image ? <img
                  src={`${baseUrl}/uploads/${loggedUser.image}`}
                  alt=""
                  className={styles.authorAvatar}
                />: <div className="rounded-5 text-center text-white" style={{lineHeight:'40px',height:'40px', width:'40px', backgroundColor: '#5b3fd9', overflow:'hidden'}}>
                        {loggedUser?.name?.split(' ')[0].substr(0, 1)}
                        {loggedUser?.name?.split(' ')[1].substr(0, 1)}
                    </div>
                }
                <div className={`${styles.logout} ${showProfile === true ? styles.show : ''} shadow-lg`}>
                  <button onClick={logout} className='d-flex justify-content-center align-items-center'><IoLogOutOutline className='me-2 fs-6' /><span>Logout</span></button>
                  <hr className='my-2' />
                  <button className='d-flex justify-content-center align-items-center'><IoSettingsOutline className='me-2 fs-6' /><span>Setting</span></button>
                </div>
              </div>}
            </div>
        </div>
    </header>
  );
}
