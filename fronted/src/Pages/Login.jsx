import { Link } from "react-router-dom";
import { useState } from "react";
import styles from "../assets/Login.module.css";
import { useAuth } from "../Context/AuthContext";
import { BsLockFill } from "react-icons/bs";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function Login() {
  const {
    loginData,
    loginFormHandler,
    loginAccount,
    showLoadingSpinner,
    disabledField,
  } = useAuth();

  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className={styles.page}>
      <div className={styles.topBar}>
        <Link to="/" className={styles.brandLogo}>SlowLiving Blog</Link>
      </div>

      <div className={styles.center}>
        <div className={styles.card}>
          <div className={styles.iconBadge}>
            <BsLockFill />
          </div>
          <h2 className={styles.cardTitle}>Welcome back</h2>
          <p className={styles.cardSubtitle}>Sign in to your editorial account</p>

          <form onSubmit={loginAccount}>
            <div>
              <label>Email Address</label>
              <input
                onChange={loginFormHandler}
                disabled={disabledField}
                name="email"
                value={loginData.email}
                type="email"
                placeholder="name@example.com"
              />
            </div>

            <div className={`${styles.passwordRow} d-flex align-items-center`}>
              <label className="mb-0">Password</label>
              <span className={styles.forgot}>Forgot Password?</span>
            </div>
            <div className={styles.passwordWrap}>
              <input
                onChange={loginFormHandler}
                disabled={disabledField}
                name="password"
                value={loginData.password}
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
              />
              <button
                type="button"
                className={styles.eyeBtn}
                onClick={() => setShowPassword((prev) => !prev)}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>

            <button
              disabled={disabledField}
              className={`${styles.loginBtn} d-flex align-items-center justify-content-center`}
            >
              {showLoadingSpinner && (
                <span
                  className="spinner-border spinner-border-sm me-2"
                  role="status"
                  aria-hidden="true"
                ></span>
              )}
              <span>Login</span>
            </button>
          </form>

          <p className={styles.signupLine}>
            Don't have an account? <Link to="/register">Register</Link>
          </p>
        </div>

        <p className={styles.terms}>
          By continuing, you agree to our <a href="#!">Terms of Service</a> and{" "}
          <a href="#!">Privacy Policy</a>.
        </p>
      </div>
    </div>
  );
}