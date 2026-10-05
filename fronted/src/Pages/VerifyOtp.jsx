import styles from "../assets/VerifyOtp.module.css";
import { BsLockFill, BsArrowRight } from "react-icons/bs";
import { useResetPassword } from "../Context/ResetPasswordContext.jsx";
import { useEffect } from "react";


const VerifyOtp = () => {

  const {
    verifyCode,
    formatTime,
    secondsLeft,
    submitting,
    ResendCode,
    navigate,
    digits,
    inputsRef,
    handleChange,
    handleKeyDown,
    handlePaste

  } = useResetPassword();

  useEffect(() => {
    inputsRef.current[0]?.focus();
  }, []);

  
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
            {/* verifyCode isi se pura code read karta hy */}

            {digits.map((digit, index) => (
              <input
                key={index}
                ref={(el) => (inputsRef.current[index] = el)}
                className={styles.otpBox}
                type="text"
                inputMode="numeric"
                autoComplete={index === 0 ? "one-time-code" : "off"}
                value={digit}
                onChange={(event) => handleChange(event, index)}
                onKeyDown={(event) => handleKeyDown(event, index)}
                onPaste={handlePaste}
                onFocus={(event) => event.target.select()}
                aria-label={`Digit ${index + 1}`}
              />
            ))}
          </div>

          <div className={styles.resendRow}>
            <span className={styles.resendLeft}>
              Resend code in <span className={styles.timer}>{formatTime(secondsLeft)}</span>
            </span>
            <button
              type="button"
              onClick={ResendCode}
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