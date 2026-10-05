import { createContext, useRef, useEffect, useContext, useState} from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { apiSend, showToast } from "../services/apiClient.js";


export const ResetPasswordContext = createContext();

const ResetPasswordContextProvider = ({ children }) => {
   
  
  const RESEND_SECONDS = 120;
 
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
          // console.log(data);
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
    
    
    const [secondsLeft, setSecondsLeft] = useState(RESEND_SECONDS);
    const [submitting, setSubmitting] = useState(false);
    const token = useRef(null);
    
    
    const formatTime = (s) => {
      const m = Math.floor(s / 60);
      const sec = s % 60;
      return `${m}:${sec.toString().padStart(2, "0")}`;
    };

  
  const verifyCode = async (event) => {
    event.preventDefault();
    const code = token.current.value;    
    if (code.length < 6) {
      showToast("Please enter the full 6-digit code", "Error", "danger");
      return;
    }
    
    
    setSubmitting(true);
    const email = localStorage.getItem('reset_email');
    try {
      const { ok, data } = await apiSend("verify-otp", "POST", {code, email});
      console.log(data);
      if (ok) {
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
      token
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