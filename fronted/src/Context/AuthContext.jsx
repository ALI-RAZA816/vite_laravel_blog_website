import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiSend, showToast } from "../services/apiClient.js";
import { AppContext } from "./AppContext.jsx";

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const navigate = useNavigate();

  const [showLoadingSpinner, setShowLoadingSpinner] = useState(false);
  const [disabledField, setDisabledField] = useState(false);
  const {setStatusCode} = useContext(AppContext);

  const startRequest = () => {
    setShowLoadingSpinner(true);
    setDisabledField(true);
  };

  const stopRequest = () => {
    setShowLoadingSpinner(false);
    setDisabledField(false);
  };

  // =======================
  //        LOGIN
  // =======================

  const [loginData, setLoginData] = useState({
    email: "hamza.raza1@example.com",
    password: "Hamza@958Pass",
  });

  const loginFormHandler = (event) => {
    const { name, value } = event.target;
    setLoginData((prev) => ({ ...prev, [name]: value }));
  };

  const loginAccount = async (event) => {
    event.preventDefault();
    if(!loginData.email){
      showToast('Email is required','Error','danger');
      return false;
    }
    if(!loginData.password){
      showToast('Password is required','Error','danger');
      return false;
    }

    startRequest();

    try {
      const {ok, status, data} = await apiSend('login', 'POST', loginData);

      if (!ok) {
        const error = data.errors;
        if (error?.email?.[0]) {
          showToast(error.email?.[0],'Error','danger');
        } else if (error?.password?.[0]) {
          showToast(error.password?.[0],'Error','danger');
        } else if (data.message) {
          showToast(data.message,'Error','danger');
        }
        return;
      }
      
      if(status){
        setStatusCode(status);
        navigate('/aunauthorized');
      }

      localStorage.setItem("UserInfo", JSON.stringify(data.user));
      localStorage.setItem("token", data.token);
      navigate("/");
      showToast(data.message,'Success','success');
    } catch (error) {
      console.log("loginAccount:", error);
    } finally {
      stopRequest();
    }
  };

  // =======================
  //       REGISTER
  // =======================
  const [registerData, setRegisterData] = useState({
    name: "",
    emailaddress: "",
    password: "",
    password_confirmation: "",
  });

  
  const registerFormHandler = (event) => {
    const { name, value } = event.target;
    setRegisterData((prev) => ({ ...prev, [name]: value }));
  };
  
  const validateRegister = () => {
    if (!registerData.name) {
      showToast('Name is required','Error','danger');
      return false;
    }
    if (!registerData.emailaddress) {
      showToast('Email is required','Error','danger');
      return false;
    }
    if (!registerData.password) {
      showToast('Password is required','Error','danger');
      return false;
    }
    if (!registerData.password_confirmation) {
      showToast('Confirm password is required','Error','danger');
      return false;
    }
    return true;
  };

  const registerAccount = async (event) => {
    event.preventDefault();


    if (!validateRegister()) return;

    startRequest();

    try {

      const {ok, data} = await apiSend('account','POST', registerData);
      
      if (!ok) {
        const error = data.errors ?? {};

        if (error.name?.[0]) {
          showToast(error.name?.[0],'Error','danger');
        } else if (error.emailaddress?.[0]) {
          showToast(error.emailaddress?.[0],'Error','danger');
        } else if (error.password?.[0]) {
          showToast(error.password?.[0],'Error','danger');
        } else if (error.password_confirmation?.[0]) {
          showToast(error.password_confirmation?.[0],'Error','danger');
        }else if (data.message) {
          showToast(data.message,'Error','danger');
        }
        return;
      }

      navigate("/login");
      showToast(data.message,'Success','success');

    } catch (error) {
      console.log("registerAccount:", error);
    } finally {
      stopRequest();
    }
  };

  // =======================
  //        LOGOUT
  // =======================
  const logout = async (event) => {
    if (event) event.preventDefault();

    try {
      const {ok, status, data} = await apiSend('logout','POST');

    } catch (error) {
      console.log("logout:", error);
    } finally {
      localStorage.removeItem("token");
      localStorage.removeItem("UserInfo");
      navigate("/login");
    }
  };

  return (
    <AuthContext.Provider
      value={{
        // shared ui state
        showLoadingSpinner,
        disabledField,

        // login
        loginData,
        // loginErr,
        loginFormHandler,
        loginAccount,

        // register
        registerData,
        registerFormHandler,
        registerAccount,

        // logout
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("Use useAuth in the  <AuthContextProvider>");
  return ctx;
};

export default AuthContextProvider;