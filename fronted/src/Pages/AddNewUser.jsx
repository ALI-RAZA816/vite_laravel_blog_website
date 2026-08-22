import React, { useContext, useState } from "react";
import styles from "../assets/AddNewUser.module.css";
import { apiUrl } from "../Http/Http";
import { AppContext } from "../Context/AppContext";
import { useNavigate } from "react-router-dom";

/**
 * AddNewUser
 * Right-hand content area of the "Add New User" admin screen.
 * (Sidebar is intentionally excluded — this component starts at the top header.)
 */
const AddNewUser = () => {


  const navigate = useNavigate();
  const {setRefresh} = useContext(AppContext);
  const [image, setImage] = useState(null);
  const [imageErr, setImageErr] = useState(null);
  const [Status, setStatus] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [formDataErr, setFormDataErr] = useState({
    nameErr:'',
    usernameErr:'',
    emailaddressErr:'',
    bioErr:'',
    roleErr:'',
    statusErr:'',
    passwordErr:'',
    password_confirmationErr:'',
    imageErr:'',
  });

  const [formData, setFormData] = useState({
    name:'',
    username:'',
    emailaddress:'',
    bio:'',
    role:'',
    status:'',
    password:'',
    password_confirmation:'',
    image:'',
  });

  const statuHandler = (event)=>{
    const checkbox = event.target.checked;
    if(checkbox){
      setStatus('active');
    }else{
      setStatus('inactive');
    }
  }

  const imageHandler = (event)=>{
    const file = event.target.files[0];
    if(!file) return;
    const image = URL.createObjectURL(file);
    setImage(file);
    setImagePreview(image);
  }


  const formHandler = (event)=>{
    const {name, value} = event.target;
    setFormData((prev)=>({
      ...prev,
      [name]:value
    }));
  }


  const addUser = async (event)=>{

    event.preventDefault();
    if(!formData.name){
      setFormDataErr((prev)=>({
        ...prev,
        nameErr:'The name field is required'
      }));
      return;
    }
    if(!formData.emailaddress){
      setFormDataErr((prev)=>({
        ...prev,
        emailaddressErr:'The emailaddress field is required'
      }));
      return;
    }
    if(!formData.role){
      setFormDataErr((prev)=>(
        {
        ...prev,
        roleErr:'The role field is required'
        }
      ));
      return;
    }
    if(!Status){
      setFormDataErr((prev)=>(
        {
          ...prev,
        statusErr:'The status field is required'
      }
      ));
      return;
    }
    if(!formData.password){
      setFormDataErr((prev)=>({
        ...prev,
        passwordErr:'The password field is required'
      }));
      return;
    }
    if(!formData.password_confirmation){
      setFormDataErr((prev)=>(
        {
          ...prev,
        password_confirmationErr:'The confirm password field is required'
      }
      ));
      return;
    }
    if(formData.password != formData.password_confirmation ){
      setFormDataErr((prev)=>({
        ...prev,
        password_confirmationErr:'The password field confirmation does not match'
      }))
    }
    const form = new FormData();
    form.append("name",formData.name);
    form.append("username",formData.username);
    form.append("emailaddress",formData.emailaddress);
    form.append("bio",formData.bio);
    form.append("role",formData.role);
    form.append("password",formData.password);
    form.append("password_confirmation",formData.password_confirmation);
    form.append("status",Status);
    if(image instanceof File){
      form.append("image",image);
    }
    const token = localStorage.getItem('token');
    const response = await fetch(`${apiUrl}/account`,{
      method:'POST',
      headers:{
        'Authorization':`Bearer ${token}`
      },
      body:form
    });

    const data = await response.json();
    console.log(data);
    if(!response.ok){
      if(response.status === 422){
        if(data?.errors?.image[0]){
          setImageErr(data?.errors?.image[0]);
        }
      }
    }else{
      setRefresh(prev => prev + 1);
      navigate('/admin-panel/users');
    }

  }
  
  return (
    <div className={styles.page}>

      {/* Body */}
      <div className={styles.body}>
        {/* Breadcrumb */}
        <nav className={`${styles.breadcrumb} d-flex align-items-center gap-2`} aria-label="breadcrumb">
          <span>Users</span>
          <span className={styles.breadcrumbSep}>&gt;</span>
          <span className={styles.breadcrumbActive}>Add New User</span>
        </nav>

        <h2 className={styles.pageTitle}>Add New User</h2>

        <form onSubmit={addUser} className={`${styles.grid} d-flex align-items-start gap-4`}>
          {/* Left column */}
          <div className={styles.leftCol}>
            {/* Personal Information card */}
            <section className={`${styles.card} mb-4`}>
              <h3 className={styles.cardTitle}>Personal Information</h3>

              <div className={`${styles.photoRow} d-flex align-items-center`}>
                <label htmlFor="photoUpload" className={styles.photoUpload}>
                    {imagePreview ? <img src={imagePreview} alt="Profile preview" className={styles.photoPreview} />:
                    <>
                      <svg
                        width="22"
                        height="22"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
                        <circle cx="12" cy="13" r="4" />
                      </svg>
                      <span className={styles.uploadLabel}>UPLOAD</span>
                    </>}
                  <input
                    id="photoUpload"
                    type="file"
                    name="image"
                    onChange={imageHandler}
                    accept="image/png, image/jpeg"
                    className="d-none"
                  />
                </label>

                <div className={styles.photoText}>
                  <div className={styles.photoTitle}>Profile Photo</div>
                  <div className={styles.photoHint}>
                    Recommended: Square image, at least 400x400px. JPG or PNG.
                    <br />
                    <span className="text-danger">{imageErr}</span>
                  </div>
                </div>
              </div>

              <div className="row mt-4 gx-4">
                <div className="col-12 col-md-6">
                  <label htmlFor="fullName" className={styles.label}>
                    Full Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={formHandler}
                    className={styles.input}
                    placeholder="e.g. Jane Doe"
                  />
                  <span className="text-danger">{formDataErr.nameErr}</span>
                </div>
                <div className="col-12 col-md-6">
                  <label htmlFor="username" className={styles.label}>
                    Username
                  </label>
                  <input
                    id="username"
                    name="username"
                    type="text"
                    onChange={formHandler}
                    value={formData.username}
                    className={styles.input}
                    placeholder="jdoe88"
                  />
                </div>
              </div>

              <div className="mt-4">
                <label htmlFor="email" className={styles.label}>
                  Email Address
                </label>
                <input
                  id="email"
                  name="emailaddress"
                  type="email"
                  onChange={formHandler}
                  value={formData.emailaddress}
                  className={styles.input}
                  placeholder="jane.doe@example.com"
                />
                <span className="text-danger">{formDataErr.emailaddressErr}</span>
              </div>
            </section>

            {/* Biography card */}
            <section className={styles.card}>
              <div className="d-flex align-items-center justify-content-between mb-3">
                <h3 className={`${styles.cardTitle} mb-0`}>Biography</h3>
                <span className={styles.optionalTag}>Optional</span>
              </div>

              <textarea
                className={styles.textarea}
                placeholder="Write a short biography about the user..."
                rows={5}
                onChange={formHandler}
                value={formData.bio}
                name="bio"
              />
              <div className={styles.charCount}>
              </div>
            </section>
          </div>

          {/* Right column */}
          <div className={styles.rightCol}>
            {/* Account Status card */}
            <section className={`${styles.card} mb-4`}>
              <h3 className={styles.cardTitle}>Account Status</h3>

              <div className="mt-3">
                <label htmlFor="userRole" className={styles.label}>
                  User Role
                </label>
                <select
                  id="userRole"
                  name="role"
                  onChange={formHandler}
                  value={formData.role}
                  className={styles.select}
                >
                  <option disabled defaultValue>Select Role</option>
                  <option value="user">User</option>
                  <option value="editor">Editor</option>
                  <option value="admin">Admin</option>
                  <option value="author">Author</option>
                </select>
                <span className="text-danger">{formDataErr.roleErr}</span>
              </div>

              <div className="d-flex align-items-center justify-content-between mt-4">
                <div>
                  <div className={styles.label}>Account Active</div>
                  <div className={styles.hint}>Allow user to log in</div>
                </div>
                <label htmlFor="status" className={styles.switch}>
                  <input
                    type="checkbox" id="status" onChange={statuHandler}
                  />
                  <span className={styles.slider} />
                </label>
              </div>
                  <span className="text-danger">{formDataErr.statusErr}</span>
            </section>

            {/* Security card */}
            <section className={styles.card}>
              <h3 className={styles.cardTitle}>Security</h3>

              <div className="mt-3">
                <label htmlFor="initialPassword" className={styles.label}>
                  Initial Password
                </label>
                <input
                  name="password"
                  id="initialPassword"
                  type="password"
                  onChange={formHandler}
                  value={formData.password}
                  className={styles.input}
                />
                <span className="text-danger">{formDataErr.passwordErr}</span>
              </div>
              <div className="mt-3">
                <label htmlFor="confirm" className={styles.label}>
                  Confirm Password
                </label>
                <input
                  name="password_confirmation"
                  id="confirm"
                  type="password"
                  onChange={formHandler}
                  value={formData.password_confirmation}
                  className={styles.input}
                />
                <span className="text-danger">{formDataErr.password_confirmationErr}</span>
              </div>
              <div className={`${styles.checkboxRow} d-flex align-items-start gap-2 mt-4`}>
                <input
                  id="sendWelcome"
                  type="checkbox"
                  className={styles.checkbox}
                />
                <label htmlFor="sendWelcome" className={styles.checkboxLabel}>
                  Send welcome instructions.
                </label>
              </div>
            </section>
            <button type="submit" className={`${styles.adduser} mt-2`}>Add User</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddNewUser;