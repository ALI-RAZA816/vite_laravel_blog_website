import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "../assets/ResetPassword.module.css";
import { BsUnlockFill, BsEye, BsEyeSlash, BsArrowRight, BsCheckCircleFill, BsCircle, BsCheck2 } from "react-icons/bs";
import { apiSend, showToast } from "../services/apiClient.js";

const ResetPassword = () => {
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);



  const passwordsMatch = password && confirmPassword && password === confirmPassword;

  const resetPassword = async (event) => {
    event.preventDefault();

    if (!password || !confirmPassword) {
      showToast("Please fill in both password fields", "Error", "danger");
      return;
    }

    if (password.length < 8) {
      showToast("Password must be at least 8 characters long", "Error", "danger");
      return;
    }

    if (password !== confirmPassword) {
      showToast("Passwords do not match", "Error", "danger");
      return;
    }

    setSubmitting(true);
    const email = localStorage.getItem('reset_email');
    try {
      const { ok, data } = await apiSend("reset-password", "POST", {
        email,
        password,
        password_confirmation: confirmPassword,
      });

      if (ok) {
        showToast(data.message, "Success", "success");
        navigate("/login");
        localStorage.removeItem('reset_email');
      } else {
        const error = data?.errors;
        if (error?.password?.[0]) {
          showToast(error.password[0], "Error", "danger");
        } else if (data.message) {
          showToast(data.message, "Error", "danger");
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <div className={styles.iconBadge}>
          <BsUnlockFill />
        </div>

        <h2 className={styles.cardTitle}>Create new password</h2>

        <form onSubmit={resetPassword}>
          <div className={styles.field}>
            <div className={styles.fieldHeader}>
              <span className={styles.label}>New Password</span>
            </div>
            <div className={styles.inputWrapper}>
              <BsUnlockFill className={styles.inputIcon} />
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter new password"
                className={styles.input}
              />
              <button
                type="button"
                className={styles.eyeButton}
                onClick={() => setShowPassword((prev) => !prev)}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <BsEyeSlash /> : <BsEye />}
              </button>
            </div>
          </div>

          <div className={styles.field}>
            <div className={styles.fieldHeader}>
              <span className={styles.label}>Confirm New Password</span>
              {passwordsMatch && (
                <span className={styles.matchText}>
                  <BsCheck2 /> Passwords match
                </span>
              )}
            </div>
            <div className={styles.inputWrapper}>
              <BsUnlockFill className={styles.inputIcon} />
              <input
                type={showConfirmPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm new password"
                className={styles.input}
              />
              <button
                type="button"
                className={styles.eyeButton}
                onClick={() => setShowConfirmPassword((prev) => !prev)}
                aria-label={showConfirmPassword ? "Hide password" : "Show password"}
              >
                {showConfirmPassword ? <BsEyeSlash /> : <BsEye />}
              </button>
            </div>
          </div>

          <button disabled={submitting} className={styles.submitBtn}>
            {submitting && (
              <span
                className="spinner-border spinner-border-sm"
                role="status"
                aria-hidden="true"
              ></span>
            )}
            <span>Reset Password &amp; Sign In</span>
            <BsArrowRight className={styles.submitIcon} />
          </button>
        </form>

        <button type="button" className={styles.cancelLink} onClick={() => navigate("/login")}>
          Cancel and return to Sign In
        </button>
      </div>
    </div>
  );
};

export default ResetPassword;