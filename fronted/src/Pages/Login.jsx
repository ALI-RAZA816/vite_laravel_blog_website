import { Link } from "react-router-dom";
import styles from "../assets/Login.module.css";
import { useAuth } from "../Context/AuthContext";

export default function Login() {
  const {
    loginData,
    loginErr,
    restricted,
    loginFormHandler,
    loginAccount,
    showLoadingSpinner,
    disabledField,
  } = useAuth();

  return (
    <div className={styles.page}>
      <div className={styles.center}>
        <div className={styles.card}>
          <h2 className={styles.cardTitle}>Welcome back</h2>
          <p className={styles.cardSubtitle}>Sign in to your editorial account</p>
          <p className="text-danger">{restricted}</p>

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
              <span className="text-danger">{loginErr.emailErr}</span>
            </div>

            <div className={`${styles.passwordRow} d-flex align-items-center`}>
              <label>Password</label>
              <span className={styles.forgot}>Forgot Password?</span>
            </div>
            <input
              onChange={loginFormHandler}
              disabled={disabledField}
              name="password"
              value={loginData.password}
              type="password"
              placeholder="••••••••"
            />
            <span className="text-danger">{loginErr.passwordErr}</span>

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

          <p className="mt-2 text-center">
            <span>
              Don't have an account? <Link to="/register">Register</Link>
            </span>
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