import { Link} from "react-router-dom";
import styles from "../assets/ForgotPassword.module.css";
import { BsEnvelope, BsArrowRight, BsArrowLeft, BsKey } from "react-icons/bs";
import { useResetPassword } from "../Context/ResetPasswordContext.jsx";

const ForgotPassword = () => {

  const {
    sendResetLink,
    emailHandler,
    disabledField,
    email,
    showLoadingSpinner
  } = useResetPassword();
  
  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <div className={styles.iconBadge}>
          <BsKey />
        </div>

        <h2 className={styles.cardTitle}>Forgot your password?</h2>
        <p className={styles.cardSubtitle}>
          Enter your registered email address and we'll send you instructions
          to reset your password and restore access to your account.
        </p>

        <form onSubmit={sendResetLink}>
          <div className={styles.field}>
            <label className={styles.label}>Email Address</label>
            <div className={styles.inputWrapper}>
              <BsEnvelope className={styles.inputIcon} />
              <input
                onChange={emailHandler}
                disabled={disabledField}
                value={email}
                type="email"
                name="email"
                placeholder="name@example.com"
                className={styles.input}
              />
            </div>
          </div>

          <button
            disabled={disabledField}
            className={styles.submitBtn}
          >
            {showLoadingSpinner && (
              <span
                className="spinner-border spinner-border-sm"
                role="status"
                aria-hidden="true"
              ></span>
            )}
            <span>Send Reset Link</span>
            <BsArrowRight className={styles.submitIcon} />
          </button>
        </form>

        <div className={styles.divider} />

        <p className={styles.backLine}>
          <BsArrowLeft />
          <span>
            Remember your password? <Link to="/login">Log in</Link>
          </span>
        </p>
      </div>
    </div>
  );
};

export default ForgotPassword;