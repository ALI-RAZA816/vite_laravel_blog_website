import { Link } from "react-router-dom";
import styles from "../assets/Login.module.css";
import { useAuth } from "../Context/AuthContext";

export default function Register() {
  const {
    registerData,
    registerErr,
    registerFormHandler,
    registerAccount,
    showLoadingSpinner,
    disabledField,
  } = useAuth();

  return (
    <div className={styles.page}>
      <div className={styles.center}>
        <div className={styles.card}>
          <h2 className={styles.cardTitle}>Create Account</h2>
          <p className={styles.cardSubtitle}>Create your editorial account</p>

          <form onSubmit={registerAccount}>
            <div>
              <label>Full Name</label>
              <input
                disabled={disabledField}
                type="text"
                onChange={registerFormHandler}
                value={registerData.name}
                name="name"
                placeholder="Enter full name"
              />
              <span className="text-danger">{registerErr.nameErr}</span>
            </div>

            <div>
              <label>Email Address</label>
              <input
                disabled={disabledField}
                type="email"
                onChange={registerFormHandler}
                value={registerData.emailaddress}
                name="emailaddress"
                placeholder="name@example.com"
              />
              <span className="text-danger">{registerErr.emailaddressErr}</span>
            </div>

            <div>
              <label>Password</label>
              <input
                disabled={disabledField}
                type="password"
                onChange={registerFormHandler}
                value={registerData.password}
                name="password"
                placeholder="••••••••"
              />
              <span className="text-danger">{registerErr.passwordErr}</span>
            </div>

            <div>
              <label>Confirm Password</label>
              <input
                disabled={disabledField}
                type="password"
                onChange={registerFormHandler}
                value={registerData.password_confirmation}
                name="password_confirmation"
                placeholder="••••••••"
              />
              <span className="text-danger">{registerErr.password_confirmationErr}</span>
            </div>

            <button
              disabled={disabledField}
              type="submit"
              className={`${styles.loginBtn} d-flex justify-content-center align-items-center`}
            >
              {showLoadingSpinner && (
                <span
                  className="spinner-border spinner-border-sm me-2"
                  role="status"
                  aria-hidden="true"
                ></span>
              )}
              <span>Create Account</span>
            </button>

            <p className="mt-2 text-center">
              <span>
                Already have an account? <Link to="/login">Login</Link>
              </span>
            </p>
          </form>
        </div>

        <p className={styles.terms}>
          By continuing, you agree to our <a href="#!">Terms of Service</a> and{" "}
          <a href="#!">Privacy Policy</a>.
        </p>
      </div>
    </div>
  );
}