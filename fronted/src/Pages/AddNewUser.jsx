import React, { useState } from "react";
import styles from "../assets/AddNewUser.module.css";
import { apiUpload, showToast } from "../services/apiClient.js";
import { useUser } from "../Context/UserContext";
import { useNavigate } from "react-router-dom";

const AddNewUser = () => {
  const navigate = useNavigate();
  const { triggerUserRefresh } = useUser();
  const [image, setImage] = useState(null);
  const [Status, setStatus] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [instruction, setInstruction] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    username: "",
    emailaddress: "",
    bio: "",
    role: "",
    status: "",
    password: "",
    password_confirmation: "",
    image: "",
  });

  const statuHandler = (event) => {
    setStatus(event.target.checked ? "active" : "inactive");
  };

  const imageHandler = (event) => {
    const file = event.target.files[0];
    if (!file) return;
    setImage(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const formHandler = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const instructionHandler = (event) => {
    setInstruction(event.target.checked);
  };

  const addUser = async (event) => {
    event.preventDefault();
    if (!formData.name) return showToast("The name is required", "Error", "danger");
    if (!formData.emailaddress) return showToast("The email is required", "Error", "danger");
    if (!formData.role) return showToast("Please select user role", "Error", "danger");
    if (!Status) return showToast("Select acount status Active or Block", "Error", "danger");
    if (!formData.password) return showToast("Password is required", "Error", "danger");
    if (!formData.password_confirmation) return showToast("Confirm password is required", "Error", "danger");
    if (formData.password != formData.password_confirmation) {
      return showToast("Password doesn't match", "Error", "danger");
    }

    const form = new FormData();
    form.append("name", formData.name);
    form.append("username", formData.username);
    form.append("emailaddress", formData.emailaddress);
    form.append("bio", formData.bio);
    form.append("role", formData.role);
    form.append("password", formData.password);
    form.append("password_confirmation", formData.password_confirmation);
    form.append("status", Status);
    form.append("instruction", instruction);
    if (image instanceof File) {
      form.append("image", image);
    }

    try {
      const { ok, data } = await apiUpload("users", "POST", form);
      if (!ok) {
        const e = data?.errors;
        const firstError =
          e?.name?.[0] || e?.username?.[0] || e?.emailaddress?.[0] ||
          e?.bio?.[0] || e?.role?.[0] || e?.password?.[0] || e?.image?.[0];
        if (firstError) showToast(firstError, "Error", "danger");
      } else {
        showToast(data.message, "Success", "success");
        triggerUserRefresh();
        navigate("/admin-panel/users");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={styles.page}>
      <div className={styles.body}>
        {/* Breadcrumb */}
        <nav className={`${styles.breadcrumb} d-flex align-items-center gap-2`} aria-label="breadcrumb">
          <span>Users</span>
          <span className={styles.breadcrumbSep}>/</span>
          <span className={styles.breadcrumbActive}>Add new user</span>
        </nav>

        <h2 className={styles.pageTitle}>Add new user</h2>

        <form onSubmit={addUser} className={`${styles.grid} d-flex align-items-start gap-4`}>
          {/* Left column */}
          <div className={styles.leftCol}>
            {/* Personal information */}
            <section className={`${styles.card} mb-4`}>
              <h3 className={styles.cardTitle}>Personal information</h3>

              <div className={`${styles.photoRow} d-flex align-items-center`}>
                <label htmlFor="photoUpload" className={styles.photoUpload}>
                  {imagePreview ? (
                    <img src={imagePreview} alt="Profile preview" className={styles.photoPreview} />
                  ) : (
                    <>
                      <svg
                        width="22"
                        height="22"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                      >
                        <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
                        <circle cx="12" cy="13" r="4" />
                      </svg>
                      <span className={styles.uploadLabel}>Upload</span>
                    </>
                  )}
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
                  <div className={styles.photoTitle}>Profile photo</div>
                  <div className={styles.photoHint}>
                    Square image, at least 400x400px. JPG or PNG.
                  </div>
                </div>
              </div>

              <div className="row mt-4 gx-4 gy-4">
                <div className="col-12 col-md-6">
                  <label htmlFor="name" className={styles.label}>Full name</label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={formHandler}
                    className={styles.input}
                    placeholder="e.g. Jane Doe"
                  />
                </div>
                <div className="col-12 col-md-6">
                  <label htmlFor="username" className={styles.label}>Username</label>
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
                <label htmlFor="email" className={styles.label}>Email address</label>
                <input
                  id="email"
                  name="emailaddress"
                  type="email"
                  onChange={formHandler}
                  value={formData.emailaddress}
                  className={styles.input}
                  placeholder="jane.doe@example.com"
                />
              </div>
            </section>

            {/* Biography */}
            <section className={styles.card}>
              <div className="d-flex align-items-center justify-content-between mb-3">
                <h3 className={`${styles.cardTitle} mb-0 flex-grow-1 me-3`}>Biography</h3>
                <span className={styles.optionalTag}>Optional</span>
              </div>

              <textarea
                className={styles.textarea}
                placeholder="A short biography about the user"
                rows={5}
                onChange={formHandler}
                value={formData.bio}
                name="bio"
                aria-label="Biography"
              />
            </section>
          </div>

          {/* Right column */}
          <div className={styles.rightCol}>
            {/* Account status */}
            <section className={`${styles.card} mb-4`}>
              <h3 className={styles.cardTitle}>Account</h3>

              <div className="mt-3">
                <label htmlFor="userRole" className={styles.label}>User role</label>
                <select
                  id="userRole"
                  name="role"
                  onChange={formHandler}
                  value={formData.role}
                  className={styles.select}
                >
                  <option value="" disabled>Select role</option>
                  <option value="user">User</option>
                  <option value="editor">Editor</option>
                  <option value="admin">Admin</option>
                  <option value="author">Author</option>
                </select>
              </div>

              <div className="d-flex align-items-center justify-content-between mt-4">
                <div>
                  <label htmlFor="status" className={`${styles.label} mb-0`}>Account active</label>
                  <div className={styles.hint}>Allow user to log in</div>
                </div>
                <label htmlFor="status" className={styles.switch}>
                  <input type="checkbox" name="status" id="status" onChange={statuHandler} />
                  <span className={styles.slider} />
                </label>
              </div>
            </section>

            {/* Security */}
            <section className={styles.card}>
              <h3 className={styles.cardTitle}>Security</h3>

              <div className="mt-3">
                <label htmlFor="initialPassword" className={styles.label}>Initial password</label>
                <input
                  name="password"
                  id="initialPassword"
                  type="password"
                  onChange={formHandler}
                  value={formData.password}
                  className={styles.input}
                />
              </div>
              <div className="mt-3">
                <label htmlFor="confirm" className={styles.label}>Confirm password</label>
                <input
                  name="password_confirmation"
                  id="confirm"
                  type="password"
                  onChange={formHandler}
                  value={formData.password_confirmation}
                  className={styles.input}
                />
              </div>
              <div className={`${styles.checkboxRow} d-flex align-items-start gap-2 mt-4`}>
                <input
                  disabled={formData.role === "user"}
                  onChange={instructionHandler}
                  id="sendWelcome"
                  type="checkbox"
                  className={styles.checkbox}
                />
                <label htmlFor="sendWelcome" className={styles.checkboxLabel}>
                  Send welcome instructions
                </label>
              </div>
            </section>

            <button type="submit" className={`${styles.adduser} mt-4`}>Add user</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddNewUser;