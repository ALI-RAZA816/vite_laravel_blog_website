import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "../assets/Login.module.css";
import { FcGoogle } from "react-icons/fc";
import { apiUrl } from "../Http/Http";
import { AppContext } from "../Context/AppContext";




export default function Register() {

  const navigate = useNavigate();
  const {showLoadingSpinner} = useContext(AppContext);
  const {setShowLoadingSpinner} = useContext(AppContext);
  const {disabledField} = useContext(AppContext);
  const {setDisabledField} = useContext(AppContext);
  const [activeTab, setActiveTab] = useState("login");


  // validation error
  const [formDataErr, setFormDataErr] = useState({
    nameErr:'',
    emailaddressErr:'',
    passwordErr:'',
    password_confirmationErr:'',
  });

  // create new account 
  const [formData, setFormData] = useState({
    name:'',
    emailaddress:'',
    password:'',
    password_confirmation:'',
  });


  const FormHandler = (event)=>{
    const {name, value} = event.target
    setFormData((prev) =>({
      ...prev,
      [name]:value
    }));
  }

  const submitHandler = async (event)=>{
    event.preventDefault();
    if(!formData.name){
      setFormDataErr({
        nameErr:'The name field is required'
      });
      return;
    }
    if(!formData.emailaddress){
      setFormDataErr({
        emailaddressErr:'The name field is required'
      });
      return;
    }
    if(!formData.password){
      setFormDataErr({
        passwordErr:'The name field is required'
      });
      return;
    }
    if(!formData.password_confirmation){
      setFormDataErr({
        password_confirmationErr:'The name field is required'
      });
      return;
    }
    setShowLoadingSpinner(true);
    setDisabledField(true);
    try{
      const response = await fetch(`${apiUrl}/account`,{
        method:'POST',
        headers:{
          'Content-type':'application/json',
          'Accept':'application/json'
        },
        body:JSON.stringify(formData)
      });

      const data = await response.json();
      console.log(data);
      const error = data.errors;
      if(!response.ok){
        if(data.message && error.name?.[0]){
          setFormDataErr({
            nameErr:error.name[0]
          });
          setShowLoadingSpinner(false);
           setDisabledField(false);
          }else if( data.message && error.emailaddress?.[0]){
            setFormDataErr({
              emailaddressErr:error.emailaddress[0],
            })
            setShowLoadingSpinner(false);
            setDisabledField(false);
          }else if( data.message && error.password?.[0]){
            setFormDataErr({
              passwordErr:error.password[0],
            })
            setShowLoadingSpinner(false);
            setDisabledField(false);
          }else if( data.message && error.password?.[0]){
            setFormDataErr({
              password_confirmationErr:error.password[0],
            })
            setShowLoadingSpinner(false);
            setDisabledField(false);
          }
        }else{
          navigate('/login');
          setShowLoadingSpinner(false);
          setDisabledField(false);
      }
    }catch(error){
      console.log('Error:',error);
    }finally{
      setShowLoadingSpinner(false);
      setDisabledField(false);
    }
  }

  return (
    <div className={styles.page}>

      <div className={styles.center}>

        <div className={styles.card}>
          <h2 className={styles.cardTitle}>Create Account</h2>
          <p className={styles.cardSubtitle}>Create your editorial account</p>
          <form onSubmit={submitHandler}>
            <div>
                <label>Full Name</label>
                <input  disabled={disabledField && true} type="text" onChange={FormHandler} value={formData.name} name="name" placeholder="Enter full name" />
                <span className="text-danger">{formDataErr.nameErr}</span>
            </div>
            <div>
                <label>Email Address</label>
                <input disabled={disabledField && true} type="email"  onChange={FormHandler} value={formData.emailaddress} name="emailaddress" placeholder="name@example.com" />
                <span className="text-danger">{formDataErr.emailaddressErr}</span>
            </div>
            <div>
                <label>Password</label>
                <input disabled={disabledField && true} type="password"  onChange={FormHandler} value={formData.password} name="password" placeholder="••••••••" />
                <span className="text-danger">{formDataErr.passwordErr}</span>
            </div>
            <div>
                <label>Confirm Password</label>
                <input disabled={disabledField && true} type="password"  onChange={FormHandler} value={formData.password_confirmation} name="password_confirmation" placeholder="••••••••" />
                <span className="text-danger">{formDataErr.password_confirmationErr}</span>
            </div>
            <button disabled={disabledField && true} type='submit' className={`${styles.loginBtn} d-flex justify-content-center align-items-center`}>
              {showLoadingSpinner && <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>}
              <span>Create Account</span>
            </button>
            <p className="mt-2 text-center">
            <span>Already have an account? <Link to="/login">Login</Link></span>
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
