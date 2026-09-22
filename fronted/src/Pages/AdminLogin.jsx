import { useContext, useState } from "react";
import styles from "../assets/AdminLogin.module.css";
import { BsShieldFillCheck, BsEnvelope, BsLock, BsEye, BsEyeSlash, BsArrowRight } from "react-icons/bs";
import { apiSend } from "../services/apiClient";
import { AppContext } from "../Context/AppContext";
import { useNavigate } from "react-router-dom";
import { useUser } from "../Context/UserContext";

const AdminLogin = () => {
  const navigate = useNavigate();
  const [showToken, setShowToken] = useState(false);
  const {setStatusCode, setAuthorized} = useContext(AppContext);
  const {loggedUser} = useUser();
  const [formData, setFormData] = useState({
    email:'',
    password:''
  });

  const formHandler = (event)=>{
    const {name, value} = event.target;
    setFormData((prev)=>({
      ...prev,
      [name]:value
    }));

  }

  const AdminPanelHandler = async (event) => {
      event.preventDefault();
      if(!formData.email){
        alert('Required Email');
        return;
      }
      if(!formData.password){
        alert('Required Password');
        return;
      }

      try {
        if(!localStorage.getItem('token')){
          navigate('/login')
          return;
        }
        const {ok, status, data} = await apiSend('login', 'POST', formData);
        if(!ok){
          setStatusCode(status);
          navigate('/aunauthorized');
          return;
        }
        if(data?.user?.role === 'user'){
          setStatusCode(403)
          navigate('/aunauthorized');
          return;
        }
        localStorage.setItem('token', data.token);
        localStorage.setItem('UserInfo', JSON.stringify(data.user));
        setAuthorized('authorized');
        navigate('/admin-panel/dashboard');

      } catch (error) {
        console.log("loginAccount:", error);
      }
    };

  return (
    <div className={styles.page}>
      {/* Background watermark labels */}
      <div className={styles.watermarks}>
        <span>SYSTEM INTEGRITY</span>
        <span>SESSION ENCRYPTED</span>
        <span>MULTI-FACTOR ACTIVE</span>
      </div>

      <div className={styles.header}>
        <div className={styles.iconWrapper}>
          <BsShieldFillCheck className={styles.shieldIcon} />
        </div>
        <h1 className={styles.title}>Admin Workspace</h1>
        <p className={styles.subtitle}>Management Portal Security Check</p>
      </div>

      <div className={styles.card}>
        <form onSubmit={AdminPanelHandler}>
          <div className={styles.field}>
            <label className={styles.label}>Work Email</label>
            <div className={styles.inputWrapper}>
              <BsEnvelope className={styles.inputIcon} />
              <input
                onChange={formHandler}
                value={formData.email}
                name="email"
                type="email"
                placeholder="name@slowliving.com"
                className={styles.input}
                />
            </div>
          </div>

          <div className={styles.field}>
            <div className={styles.labelRow}>
              <label className={styles.label}>Security Token</label>
              <a href="#" className={styles.forgotLink}>Forgot?</a>
            </div>
            <div className={styles.inputWrapper}>
              <BsLock className={styles.inputIcon} />
              <input
                name="password"
                onChange={formHandler}
                value={formData.password}
                type={showToken ? "text" : "password"}
                placeholder="Token"
                defaultValue=""
                className={styles.input}
              />
              <button
                type="button"
                className={styles.eyeButton}
                onClick={() => setShowToken((prev) => !prev)}
                aria-label={showToken ? "Hide security token" : "Show security token"}
              >
                {showToken ? <BsEyeSlash /> : <BsEye />}
              </button>
            </div>
          </div>
          <button type="submit" className={styles.submitBtn}>
            Access Management Portal
            <BsArrowRight className={styles.submitIcon} />
          </button>

          <div className={styles.divider} />

          <div className={styles.footerLinks}>
            <a href="#">Support</a>
            <span className={styles.dot}>•</span>
            <a href="#">Public Site</a>
            <span className={styles.dot}>•</span>
            <a href="#">Status</a>
          </div>

          <p className={styles.disclaimer}>
            Authorized personnel only. All access attempts are logged
            and monitored for security purposes.
          </p>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;