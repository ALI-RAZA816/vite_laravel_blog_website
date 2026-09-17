import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiUrl } from "../Http/Http";
import { apiSend } from "../services/apiClient.js";

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const navigate = useNavigate();

  // spinner + fields disable (login aur register dono ke liye)
  const [showLoadingSpinner, setShowLoadingSpinner] = useState(false);
  const [disabledField, setDisabledField] = useState(false);

  // request shuru / khatam hone par ek hi jagah se control
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
  const [restricted, setRestricted] = useState(null);

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const [loginErr, setLoginErr] = useState({
    emailErr: "",
    passwordErr: "",
  });

  const loginFormHandler = (event) => {
    const { name, value } = event.target;
    setLoginData((prev) => ({ ...prev, [name]: value }));
  };

  const loginAccount = async (event) => {
    event.preventDefault();
    setLoginErr({ emailErr: "", passwordErr: "" });
    setRestricted(null);
    startRequest();

    try {
      const {ok, data} = await apiSend('login', 'POST', loginData);

      if (!ok) {
        const error = data.errors;

        if (error?.email?.[0]) {
          setLoginErr({ emailErr: error.email[0], passwordErr: "" });
        } else if (error?.password?.[0]) {
          setLoginErr({ emailErr: "", passwordErr: error.password[0] });
        } else if (data.status === 404) {
          setLoginErr({ emailErr: "", passwordErr: data.password });
        } else if (data.message) {
          setLoginErr({ emailErr: data.message, passwordErr: "" });
        }
        return;
      }

      if (data.status === 401) {
        setRestricted(data.message);
        return;
      }

      localStorage.setItem("UserInfo", JSON.stringify(data.user));
      localStorage.setItem("token", data.token);
      navigate("/");
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

  const emptyRegisterErr = {
    nameErr: "",
    emailaddressErr: "",
    passwordErr: "",
    password_confirmationErr: "",
  };

  const [registerErr, setRegisterErr] = useState(emptyRegisterErr);

  const registerFormHandler = (event) => {
    const { name, value } = event.target;
    setRegisterData((prev) => ({ ...prev, [name]: value }));
  };

  // submit se pehle khali fields check karna
  const validateRegister = () => {
    if (!registerData.name) {
      setRegisterErr({ ...emptyRegisterErr, nameErr: "The name field is required" });
      return false;
    }
    if (!registerData.emailaddress) {
      setRegisterErr({ ...emptyRegisterErr, emailaddressErr: "The email field is required" });
      return false;
    }
    if (!registerData.password) {
      setRegisterErr({ ...emptyRegisterErr, passwordErr: "The password field is required" });
      return false;
    }
    if (!registerData.password_confirmation) {
      setRegisterErr({
        ...emptyRegisterErr,
        password_confirmationErr: "The confirm password field is required",
      });
      return false;
    }
    return true;
  };

  const registerAccount = async (event) => {
    event.preventDefault();
    setRegisterErr(emptyRegisterErr);

    if (!validateRegister()) return;

    startRequest();

    try {

      const {ok, data} = await apiSend('account','POST', registerData);

      if (!ok) {
        const error = data.errors ?? {};

        if (error.name?.[0]) {
          setRegisterErr({ ...emptyRegisterErr, nameErr: error.name[0] });
        } else if (error.emailaddress?.[0]) {
          setRegisterErr({ ...emptyRegisterErr, emailaddressErr: error.emailaddress[0] });
        } else if (error.password?.[0]) {
          setRegisterErr({ ...emptyRegisterErr, passwordErr: error.password[0] });
        } else if (error.password_confirmation?.[0]) {
          setRegisterErr({
            ...emptyRegisterErr,
            password_confirmationErr: error.password_confirmation[0],
          });
        } else if (data.message) {
          setRegisterErr({ ...emptyRegisterErr, emailaddressErr: data.message });
        }
        return;
      }

      navigate("/login");
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
      const {ok, data} = await apiSend('logout','POST');

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
        loginErr,
        restricted,
        loginFormHandler,
        loginAccount,

        // register
        registerData,
        registerErr,
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

// chhota hook taake har page me useContext likhna na pade
export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth ko <AuthContextProvider> ke andar use karein.");
  return ctx;
};

export default AuthContextProvider;