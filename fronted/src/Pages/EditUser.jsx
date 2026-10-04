import React, { useContext, useEffect, useState } from "react";
import { FiSave, FiRotateCcw } from "react-icons/fi";

import "bootstrap/dist/css/bootstrap.min.css";
import styles from "../assets/EditUser.module.css";
import { useNavigate, useParams } from "react-router-dom";
import { useUser } from "../Context/UserContext";
import { LuUserRound } from "react-icons/lu";
import { baseUrl } from "../Http/Http";
import { apiGet, apiUpload, showToast } from "../services/apiClient.js";
import { AppContext } from "../Context/AppContext.jsx";

const EditUser = () => {
  const { id } = useParams();
  const { setStatusCode } = useContext(AppContext);
  const navigate = useNavigate();
  const { triggerUserRefresh } = useUser();
  const [accountActive, setAccountActive] = useState(false);
  const [twoFactor, setTwoFactor] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    username: "",
    email: "",
    bio: "",
    role: "",
    status: "",
    image: "",
  });

  const formHandler = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const imageHandler = (event) => {
    const file = event.target.files[0];
    if (!file) return;
    setFormData((prev) => ({ ...prev, image: file }));
    setImagePreview(URL.createObjectURL(file));
  };

  // fetch single user data
  const viewSingleUser = async (id) => {
    try {
      const { ok, status, data } = await apiGet(`users/${id}`);

      if (ok) {
        if (data.user) {
          const user = data.user;
          setFormData({
            id: user.id,
            name: user.name,
            username: user.username,
            email: user.email,
            bio: user.bio,
            role: user.role,
            status: user.status,
            image: user.image,
          });
          setAccountActive(user.status === "active");
        }
      } else {
        setStatusCode(status);
        navigate("/aunauthorized");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    viewSingleUser(id);
  }, [id]);

  // update user
  const updateUser = async (event) => {
    event.preventDefault();
    if (!formData.name) return showToast("The name field is required", "Error", "danger");
    if (!formData.email) return showToast("The email field is required", "Error", "danger");
    if (!formData.role) return showToast("Please select the role", "Error", "danger");

    const form = new FormData();
    const accountStatus = accountActive === true ? "active" : "blocked";
    form.append("name", formData.name);
    form.append("username", formData.username);
    form.append("email", formData.email);
    form.append("bio", formData.bio);
    form.append("role", formData.role);
    form.append("status", accountStatus);
    if (formData.image instanceof File) {
      form.append("image", formData.image);
    }

    try {
      const { ok, data } = await apiUpload(`users/${formData.id}`, "PUT", form);
      if (ok) {
        if (data.status === 200) {
          triggerUserRefresh();
          showToast(data.message, "Success", "success");
          navigate("/admin-panel/users");
        }
      } else {
        const e = data?.errors;
        const firstError =
          e?.name?.[0] || e?.username?.[0] || e?.email?.[0] || e?.role?.[0] || data?.message;
        if (firstError) showToast(firstError, "Error", "danger");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={styles.pageWrapper}>
      <form onSubmit={updateUser} className={styles.mainContent}>
        {/* Page heading */}
        <div className={styles.pageHeading}>
          <div>
            <h1>Edit user</h1>
            <p>Update this user's profile, role and account access.</p>
          </div>
        </div>

        <div className="row g-4">
          {/* ================= LEFT COLUMN ================= */}
          <div className="col-lg-8">
            {/* Personal information */}
            <section className={styles.card}>
              <div className={styles.cardHeader}>
                <h2>Personal information</h2>
              </div>
              <div className="row align-items-start">
                {/* Profile image */}
                <div className="col-md-3">
                  <div className={styles.profileArea}>
                    <div className={`${styles.profileImage} d-flex justify-content-center align-items-center`}>
                      {imagePreview ? (
                        <img src={imagePreview} alt="Preview" />
                      ) : formData.image ? (
                        <img src={`${baseUrl}/uploads/${formData.image}`} alt="Profile" />
                      ) : (
                        <LuUserRound className="fs-1 text-secondary" />
                      )}
                    </div>
                    <label htmlFor="file" className={styles.changePhoto}>
                      Change photo
                    </label>
                    <input type="file" name="image" onChange={imageHandler} id="file" accept="image/png, image/jpeg" hidden />
                  </div>
                </div>

                {/* User information */}
                <div className="col-md-9">
                  <div className="row g-3">
                    <div className="col-md-6">
                      <label htmlFor="name" className={styles.inputLabel}>Full name</label>
                      <input
                        id="name"
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={formHandler}
                        className={styles.formInput}
                      />
                    </div>

                    <div className="col-md-6">
                      <label htmlFor="username" className={styles.inputLabel}>Username</label>
                      <input
                        id="username"
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={formHandler}
                        className={styles.formInput}
                      />
                    </div>

                    <div className="col-12">
                      <label htmlFor="email" className={styles.inputLabel}>Email address</label>
                      <input
                        id="email"
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

              <label htmlFor="bio" className={styles.inputLabel}>Short bio</label>
              <textarea
                id="bio"
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
            {/* Account */}
            <section className={styles.card}>
              <div className={styles.cardHeader}>
                <h2>Account</h2>
              </div>

              <label htmlFor="role" className={styles.inputLabel}>User role</label>
              <div className={styles.selectWrapper}>
                <select
                  id="role"
                  value={formData.role}
                  onChange={formHandler}
                  className={`${styles.formInput} ${styles.select}`}
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
                  <h3>Account active</h3>
                  <p>Turn off to block login</p>
                </div>

                <button
                  type="button"
                  role="switch"
                  aria-checked={accountActive}
                  aria-label="Account active"
                  className={`${styles.toggle} ${accountActive ? styles.toggleActive : ""}`}
                  onClick={() => setAccountActive((prev) => !prev)}
                >
                  <span></span>
                </button>
              </div>
            </section>

            {/* Security */}
            <section className={`${styles.card} ${styles.securityCard}`}>
              <div className={styles.cardHeader}>
                <h2>Security</h2>
              </div>

              <span className={styles.securityLabel}>Password</span>

              <button type="button" className={styles.resetButton}>
                <FiRotateCcw size={15} />
                Send reset link
              </button>

              <p className={styles.lastChanged}>Last changed 3 months ago</p>

              <div className={styles.divider}></div>

              <div className={styles.toggleRow}>
                <div>
                  <h3>Two-factor authentication</h3>
                  <p>{twoFactor ? "Currently on" : "Currently off"}</p>
                </div>

                <button
                  type="button"
                  role="switch"
                  aria-checked={twoFactor}
                  aria-label="Two-factor authentication"
                  className={`${styles.toggle} ${twoFactor ? styles.toggleActive : ""}`}
                  onClick={() => setTwoFactor((prev) => !prev)}
                >
                  <span></span>
                </button>
              </div>
            </section>

            <button type="submit" className={`${styles.saveButton} w-100 mt-4`}>
              <FiSave size={18} />
              Save changes
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditUser;