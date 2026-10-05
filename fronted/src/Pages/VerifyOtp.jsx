import styles from "../assets/VerifyOtp.module.css";
import { BsLockFill, BsArrowRight } from "react-icons/bs";
import { useResetPassword } from "../Context/ResetPasswordContext.jsx";


const VerifyOtp = () => {

  const {
    verifyCode,
    formatTime,
    secondsLeft,
    submitting,
    navigate,
    token

  } = useResetPassword();
  
  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <div className={styles.iconBadge}>
          <BsLockFill />
        </div>

        <h2 className={styles.cardTitle}>Verify your identity</h2>
        <p className={styles.cardSubtitle}>
          We sent a 6-digit code to: <b>{localStorage.getItem('reset_email')}</b> {" "}
          <button
            type="button"
            className={styles.changeLink}
            onClick={() => navigate(-1)}
          >
            Change email
          </button>
        </p>

        <form onSubmit={verifyCode}>
          <div className={styles.otpRow}>
              <input
                name="token"
                ref={token}
                className={styles.otpBox}
                type="text"
                inputMode="numeric"
              />
          </div>

          <div className={styles.resendRow}>
            <span className={styles.resendLeft}>
              Resend code in <span className={styles.timer}>{formatTime(secondsLeft)}</span>
            </span>
            <button
              type="button"
              className={styles.resendBtn}
              disabled={secondsLeft > 0}
            >
              Resend Code
            </button>
          </div>

          <button disabled={submitting} className={styles.submitBtn}>
            {submitting && (
              <span
                className="spinner-border spinner-border-sm"
                role="status"
                aria-hidden="true"
              ></span>
            )}
            <span>Verify &amp; Continue</span>
            <BsArrowRight className={styles.submitIcon} />
          </button>
        </form>
      </div>
    </div>
  );
};

export default VerifyOtp;