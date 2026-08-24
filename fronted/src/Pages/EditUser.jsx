import React, { useContext, useEffect, useState } from "react";
import {
  FiSearch,
  FiBell,
  FiSave,
  FiRotateCcw,
  FiUser,
  FiChevronDown,
} from "react-icons/fi";

import "bootstrap/dist/css/bootstrap.min.css";
import styles from "../assets/EditUser.module.css";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../Context/AppContext";
import { LuUserRound } from "react-icons/lu";
import { apiUrl, baseUrl } from "../Http/Http";



const EditUser = () => {

    const {id} = useParams();
    const navigate = useNavigate();
    const {setRefresh} = useContext(AppContext);
    const [imageErr, setImageErr]= useState(null);
    const [accountActive, setAccountActive] = useState(false);
    const [twoFactor, setTwoFactor] = useState(false);
    const [imagePreview, setImagePreview] = useState(null);
    const [formData, setFormData] = useState({
        id:'',
        name:'',
        username:'',
        email:'',
        bio:'',
        role:'',    
        status:'',    
        image:'',
    });

    
    const formHandler = (event)=>{
        const {name, value} = event.target;
        setFormData((prev)=>({
            ...prev,
            [name]:value
        }));
    }

    const imageHandler = (event)=>{
        const file = event.target.files[0];
        if(!file) return;
        setFormData((prev)=>({
            ...prev,
            image:file
        }));
        const imgURL = URL.createObjectURL(file);
        setImagePreview(imgURL);
    }

    // fetch single user data
    const viewSingleUser = async (id)=>{
        try{

            const token = localStorage.getItem('token');
            const response = await fetch(`${apiUrl}/users/${id}`,{
            method:'GET',
            headers:{
                'Content-type':'application/json',
                'Accept':'application/json',
                'Authorization':`Bearer ${token}`
            }
            });
            const data = await response.json();
            if(response.ok){
                if(data.user){
                    const user = data.user;
                    setFormData({
                        id:user.id,
                        name:user.name,
                        username:user.username,
                        email:user.email,
                        bio:user.bio,
                        role:user.role,
                        status:user.status,
                        image:user.image
                    })
                }
            }
        }catch(error){
            console.log(error);
        }
    }

    useEffect(()=>{
        viewSingleUser(id);
    },[id]);


    // update user
    const updateUser = async (event)=>{
        event.preventDefault();
        const token = localStorage.getItem('token');
        const form = new FormData();
        const accountStatus = accountActive === true ? 'active' : 'blocked';
        form.append('name',formData.name);
        form.append('username',formData.username);
        form.append('email',formData.email);
        form.append('bio',formData.bio);
        form.append('role',formData.role);
        form.append('status',accountStatus);
        if (formData.image instanceof File) {
            form.append('image', formData.image);
        }
        try{
            const response = await fetch(`${apiUrl}/users/${formData.id}`,{
                method:'PUT',
                headers:{
                    'Authorization':`Bearer ${token}`
                },
                body:form
            });
            const data = await response.json();
            console.log(data);
            if(response.ok){
                if(data.status === 200){
                    setRefresh(prev => prev + 1);
                    navigate('/admin-panel/users');
                }
            }else if(response.status === 422){
                // if (data?.errors?.image[0]) {
                    setImageErr(data?.errors?.image[0]);
                // }
            }

        }catch(error){
            console.log(error);
        }
    }
    

  return (
    <>
        <div className={styles.pageWrapper}>
            {/* ================= MAIN CONTENT ================= */}
            <form onSubmit={updateUser} className={styles.mainContent}>
                {/* Page Heading */}
                <div className={styles.pageHeading}>
                    <div>
                        <h1>Edit User</h1>
                        <p>
                        Manage profile details, roles, and security settings for this
                        user.
                        </p>
                    </div>
                </div>

                {/* ================= CONTENT GRID ================= */}
                <div className="row g-4">
                {/* ================= LEFT COLUMN ================= */}
                <div className="col-lg-8">
                    {/* Personal Information */}
                    <section className={styles.card}>
                    <div className={styles.cardHeader}>
                        <h2>Personal Information</h2>
                    </div>
                    <div className="row align-items-start">
                        {/* Profile Image */}
                        <div className="col-md-3">
                        <div className={styles.profileArea}>
                            <div className={`${styles.profileImage} d-flex justify-content-center align-items-center`}>
                               {imagePreview ? ( <img src={imagePreview} alt="Preview" />) : formData.image ? (
                                        <img src={`${baseUrl}/uploads/${formData.image}`} alt="Profile"/>
                                    ) : (
                                        <LuUserRound className="fs-1 text-secondary" />
                                    )}
                            </div>
                            <label htmlFor="photo">
                                <label htmlFor="file" className={styles.changePhoto}>
                                Change Photo
                                </label>
                                <input type="file" name="image" onChange={imageHandler} id="file" hidden/>
                            </label>
                            <span className="text-danger">{imageErr}</span>
                        </div>
                        </div>

                        {/* User Information */}
                        <div className="col-md-9">
                        <div className="row g-3">
                            <div className="col-md-6">
                            <label className={styles.inputLabel}>
                                FULL NAME
                            </label>

                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={formHandler}
                                className={styles.formInput}
                            />
                            </div>

                            <div className="col-md-6">
                            <label className={styles.inputLabel}>
                                USERNAME
                            </label>

                            <input
                                type="text"
                                name="username"
                                value={formData.username}
                                onChange={formHandler}
                                className={styles.formInput}
                            />
                            </div>

                            <div className="col-12">
                            <label className={styles.inputLabel}>
                                EMAIL ADDRESS
                            </label>

                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={formHandler}
                                className={styles.formInput}
                            />
                            </div>
                        </div>
                        </div>
                    </div>
                    </section>

                    {/* Biography */}
                    <section className={`${styles.card} ${styles.bioCard}`}>
                    <div className={styles.cardHeader}>
                        <h2>Biography</h2>
                    </div>

                    <label className={styles.inputLabel}>SHORT BIO</label>

                    <textarea
                        name="bio"
                        value={formData.bio}
                        onChange={formHandler}
                        maxLength={300}
                        className={styles.bioTextarea}
                    />
                    </section>
                </div>

                {/* ================= RIGHT COLUMN ================= */}
                <div className="col-lg-4">
                    {/* Account Status */}
                    <section className={styles.card}>
                    <div className={styles.cardHeader}>
                        <h2>Account Status</h2>
                    </div>

                    <div className={styles.statusContent}>
                        <label className={styles.inputLabel}>USER ROLE</label>

                        <div className={styles.selectWrapper} >
                            <select value={formData.role} onChange={formHandler} 
                                className="form-select"
                                name="role"
                            >
                                <option value="admin">Admin</option>
                                <option value="editor">Editor</option>
                                <option value="author">Author</option>
                                <option value="user">User</option>
                            </select>
                        </div>

                        <div className={styles.toggleRow}>
                            <div>
                                <h3>Account Active</h3>
                                <p>Disable to prevent login</p>
                            </div>

                            <button type="button" className={`${styles.toggle} ${accountActive ? styles.toggleActive : " "}`} onClick={() => setAccountActive((prev) => !prev)}><span></span></button>
                        </div>
                    </div>
                    </section>

                    {/* Security */}
                    <section className={`${styles.card} ${styles.securityCard}`}>
                    <div className={styles.cardHeader}>
                        <h2>Security</h2>
                    </div>

                    <div className={styles.securityContent}>
                        <label className={styles.securityLabel}>
                        Password
                        </label>

                        <button className={styles.resetButton}>
                        <FiRotateCcw size={15} />
                        Send Reset Link
                        </button>

                        <p className={styles.lastChanged}>
                        Last changed 3 months ago
                        </p>

                        <div className={styles.divider}></div>

                        <div className={styles.toggleRow}>
                        <div>
                            <h3>Two-Factor Auth</h3>
                            <p>
                            {twoFactor
                                ? "Currently enabled"
                                : "Currently disabled"}
                            </p>
                        </div>

                        <button
                            type="button"
                            className={`${styles.toggle} ${
                            twoFactor ? styles.toggleActive : ""
                            }`}
                            onClick={() =>
                            setTwoFactor((prev) => !prev)
                            }
                        >
                            <span></span>
                        </button>
                        </div>
                    </div>
                    </section>
                    <button
                        type="submit"
                        className={`${styles.saveButton} w-100 mt-2`}
                    >
                        <FiSave size={18} />
                        Save Changes
                    </button>
                </div>
                </div>
            </form>
        </div>
    </>
  );
};

export default EditUser;