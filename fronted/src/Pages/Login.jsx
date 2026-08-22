import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "../assets/Login.module.css";
import { FcGoogle } from "react-icons/fc";
import { apiUrl } from "../Http/Http";
import { AppContext } from "../Context/AppContext";




export default function Login() {

  const [restricted, setRestricted] = useState(null);
  const {showLoadingSpinner} = useContext(AppContext);
  const {setShowLoadingSpinner} = useContext(AppContext);
  const {disabledField} = useContext(AppContext);
  const {setDisabledField} = useContext(AppContext);
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("login");
  // validation error
  const [formDataErr, setFormDataErr] = useState({
    emailErr:'',
    passwordErr:''
  });

  // form field
  const [formData, setFormData] = useState({
    email:'',
    password:''
  });


  // formhandler
  const formHandler = (event)=>{
    const {name, value} = event.target
    setFormData((prev)=>({
      ...prev,
      [name]:value
    }));
  }


  // login account

  const loginAccount = async (event)=>{
    event.preventDefault();
    setShowLoadingSpinner(true);
    setDisabledField(true);
    try{
      const response = await fetch(`${apiUrl}/login`,{
        method:'POST',
        headers:{
          'Content-type':'application/json',
          'Accept':'application/json'
        },
        body:JSON.stringify(formData)
      })
  
      const data = await response.json();
      
      if(!response.ok){
        const error = data.errors;
        console.log(data);
        if(error?.email?.[0]){
          setFormDataErr({
            emailErr:error.email[0]
          });
          setShowLoadingSpinner(false);
           setDisabledField(false);
        }else if(error?.password?.[0]){
          setFormDataErr({
            passwordErr:error.password[0]
          });
          setShowLoadingSpinner(false);
           setDisabledField(false);
        }else if(data.message){
          setFormDataErr({
            emailErr:data.message
          });
          setShowLoadingSpinner(false);
           setDisabledField(false);
        }else if(data.status === 404){
          setFormDataErr({
            passwordErr:data.password
          });
          setShowLoadingSpinner(false);
           setDisabledField(false);
        }
      }else if (data.status === 401){
        setRestricted(data.message);
      }else{
        navigate('/');
        console.log(data);
        localStorage.setItem('UserInfo',JSON.stringify(data.user));
        localStorage.setItem('token',data.token);
        setShowLoadingSpinner(false);
        setDisabledField(false);
      }
    }catch(error){
      console.log(error);
    }finally{
      setShowLoadingSpinner(false);
      setDisabledField(false);
    }

  }



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
              <input onChange={formHandler} disabled={disabledField && true} name="email" value={formData.email} type="email" placeholder="name@example.com" />
              <span className="text-danger">{formDataErr.emailErr}</span>
            </div>
            <div className={`${styles.passwordRow} d-flex align-items-center`}>
              <label>Password</label>
              <span className={styles.forgot}>Forgot Password?</span>
            </div>
            <input onChange={formHandler} disabled={disabledField && true} name="password" value={formData.password} type="password" placeholder="••••••••" />
            <span className="text-danger">{formDataErr.passwordErr}</span>
            <button disabled={disabledField && true} className={`${styles.loginBtn} d-flex align-items-center justify-content-center`}>
              {showLoadingSpinner && <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>}
              <span>Login</span>
            </button>
          </form>
          <p className="mt-2 text-center">
              <span>Don't have an account? <Link to="/register">Register</Link></span>
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
