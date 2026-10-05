import { createContext, useRef, useEffect, useContext, useState} from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { apiGet, apiSend, showToast } from "../services/apiClient.js";


export const ResetPasswordContext = createContext();

const ResetPasswordContextProvider = ({ children }) => {
   
  const RESEND_SECONDS = 120;
  const [isGetLink, setisGetLink] = useState(false);
  const[isVerifiedOtp, setisVerifiedOtp] = useState(false);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [disabledField, setDisabledField] = useState(false);
  const [showLoadingSpinner, setShowLoadingSpinner] = useState(false);
  
  const emailHandler = (event) => {
    setEmail(event.target.value);
  };

  const sendResetLink = async (event) => {
    event.preventDefault();
    localStorage.setItem('reset_email', email);
    if (!email) {
      showToast("Please enter your email address", "Error", "danger");
      return;
    }

    setDisabledField(true);
    setShowLoadingSpinner(true);

    try {
      const { ok, data } = await apiSend("forgot-password", "POST", { email });

      if (ok) {
        navigate('/verify-otp');
        setEmail('');
        setisGetLink(true);
        showToast(data.message, "Success", "success");
      } else {
        const error = data?.errors;
        if (error?.email?.[0]) {
          showToast(error.email[0], "Error", "danger");
        } else if (data.message) {
          showToast(data.message, "Error", "danger");
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      setDisabledField(false);
      setShowLoadingSpinner(false);
    }
  };
    

  // verify OTP
  const OTP_LENGTH = 6;
  
  const [secondsLeft, setSecondsLeft] = useState(RESEND_SECONDS);
  const [submitting, setSubmitting] = useState(false);
  const [digits, setDigits] = useState(Array(OTP_LENGTH).fill(""));
  const inputsRef = useRef([]);
    
    
  const formatTime = (s) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m}:${sec.toString().padStart(2, "0")}`;
  };

  const focusBox = (index) => {
    const box = inputsRef.current[index];
    if (box) {
      box.focus();
      box.select();
    }
  };
  
  const updateDigits = (next) => {
    setDigits(next);
  };
    
  const handleChange = (event, index) => {
    const value = event.target.value.replace(/\D/g, "");
    const next = [...digits];
    
    // box khali kar diya
    if (!value) {
      next[index] = "";
      updateDigits(next);
      return;
    }
    
    // autofill (SMS suggestion) ya lamba input: boxes mn distribute karo
    if (value.length > 2) {
      const chars = value.slice(0, OTP_LENGTH - index).split("");
      chars.forEach((ch, i) => {
        next[index + i] = ch;
      });
      updateDigits(next);
      focusBox(Math.min(index + chars.length, OTP_LENGTH - 1));
      return;
    }
    
    // normal typing: sirf akhri digit rakho (overwrite ke liye)
    next[index] = value.slice(-1);
    updateDigits(next);
    if (index < OTP_LENGTH - 1) focusBox(index + 1);
  };
    
  const handleKeyDown = (event, index) => {
    if (event.key === "Backspace") {
      if (digits[index]) {
        // is box mn digit hy, default behavior isay clear kr dega
        return;
      }
      // box khali hy tu pichle box pe jao aur usay clear kro
      if (index > 0) {
        event.preventDefault();
        const next = [...digits];
        next[index - 1] = "";
        updateDigits(next);
        focusBox(index - 1);
      }
    } else if (event.key === "ArrowLeft" && index > 0) {
      event.preventDefault();
      focusBox(index - 1);
    } else if (event.key === "ArrowRight" && index < OTP_LENGTH - 1) {
      event.preventDefault();
      focusBox(index + 1);
    }
  };
  
  const handlePaste = (event) => {
    event.preventDefault();
    const pasted = event.clipboardData
    .getData("text")
    .replace(/\D/g, "")
    .slice(0, OTP_LENGTH);
    
    if (!pasted) return;
    
    const next = Array(OTP_LENGTH).fill("");
    pasted.split("").forEach((ch, i) => {
      next[i] = ch;
    });
    updateDigits(next);
    focusBox(Math.min(pasted.length, OTP_LENGTH - 1));
  };
  
  
  const verifyCode = async (event) => {
    event.preventDefault();
    const code = digits.join('');    
    if (code.length < 6) {
      showToast("Please enter the full 6-digit code", "Error", "danger");
      return;
    }
    
    
    setSubmitting(true);
    const email = localStorage.getItem('reset_email');
    try {
      const { ok, data } = await apiSend("verify-otp", "POST", {code, email});
      if (ok) {
        setisVerifiedOtp(true);
        showToast(data.message, "Success", "success");
        navigate("/reset-password");
      } else {
        showToast(data.message, "Error", "danger");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setSubmitting(false);
    }
  };

  // Resend code 
  const ResendCode = async (event) => {
      event.preventDefault();
  
      setDisabledField(true);
      setShowLoadingSpinner(true);
      const email = localStorage.getItem('reset_email');
      try {
        const { ok, data } = await apiSend("forgot-password", "POST", { email });
  
        if (ok) {
          setSecondsLeft(RESEND_SECONDS);
          setDigits(Array(OTP_LENGTH).fill(""));
          inputsRef.current[0]?.focus();
          showToast(data.message, "Success", "success");
        } else {
          const error = data?.errors;
          if (error?.email?.[0]) {
            showToast(error.email[0], "Error", "danger");
          } else if (data.message) {
            showToast(data.message, "Error", "danger");
          }
        }
      } catch (error) {
        console.log(error);
      } finally {
        setDisabledField(false);
        setShowLoadingSpinner(false);
      }
  };
    

  
  useEffect(() => {
    if (secondsLeft <= 0) return;
    const timer = setInterval(() => {
      setSecondsLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, [secondsLeft]);

  
  
  return (
    <ResetPasswordContext.Provider value={{
      sendResetLink,
      emailHandler,
      disabledField,
      email, 
      showLoadingSpinner,

      verifyCode,
      formatTime,
      secondsLeft,
      submitting,
      navigate,
      digits,
      inputsRef,
      handleChange,
      handleKeyDown,
      handlePaste,
      ResendCode,
      isGetLink,
      isVerifiedOtp,
      setisGetLink
    }}>
      {children}
    </ResetPasswordContext.Provider>
  );
};

// chhota hook taake har page me useContext likhna na pade
export const useResetPassword = () => {
  const ctx = useContext(ResetPasswordContext);
  if (!ctx) throw new Error("Use useResetPassword in <ResetPasswordContextProvider>");
  return ctx;
};

export default ResetPasswordContextProvider;