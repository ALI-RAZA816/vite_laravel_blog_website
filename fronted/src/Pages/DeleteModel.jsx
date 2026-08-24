import { useContext, useState } from "react";
import styles from "../assets/DeleteModel.module.css";
import { AppContext } from "../Context/AppContext";
import { apiUrl } from "../Http/Http";

const DeleteModel = () => {

  const {DeleteModelHandler} = useContext(AppContext);
  const {deletId} = useContext(AppContext);
  const {deleteModel} = useContext(AppContext);
  const {setDeleteModel} = useContext(AppContext);
  const {setRefresh} = useContext(AppContext);
  const [confirmDelete, setConfirmDelete] = useState(false);

  const deleteUser = async (delete_id)=>{
    const token = localStorage.getItem('token');
    try{
      const response = await fetch(`${apiUrl}/users/${delete_id}`,{
        method:'DELETE',
        headers:{
          'Content-type':'application/json',
          'Accept':'application/json',
          'Authorization':`Bearer ${token}`
        }
      })

      const data = await response.json();
      console.log(data);
      if(response.ok){
        setDeleteModel(!deleteModel);
        setConfirmDelete(false);
        setRefresh(prev => prev + 1);
      }
    }catch(error){
      console.log(error);
    }
    
  }

  const confirmDeleteHandler = ()=>{
    setConfirmDelete(true);
    if(confirmDelete === true){
      deleteUser(deletId);
    }
  }
  
  return (
    <div
      className={`${styles.overlay} d-flex align-items-center justify-content-center`}
    >
      <div
        className={`${styles.modal} bg-white rounded-3 shadow p-4`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="deleteUserModalTitle"
        aria-describedby="deleteUserModalDesc"
      >
        {/* Warning icon */}
        <div className={`${styles.iconWrapper} d-flex align-items-center justify-content-center mx-auto mb-3`}>
          <svg
            className={styles.icon}
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
            <line x1="12" y1="9" x2="12" y2="13" />
            <line x1="12" y1="17" x2="12.01" y2="17" />
          </svg>
        </div>

        {/* Title */}
        <h2 id="deleteUserModalTitle" className={`${styles.title} text-center mb-2`}>
          Delete User?
        </h2>

        {/* Description */}
        <p id="deleteUserModalDesc" className={`${styles.description} text-center mb-4`}>
          Are you sure you want to delete. This action
          cannot be undone and will permanently remove all associated data.
        </p>

        {/* Actions */}
        <div className="d-flex gap-3">
          <button onClick={confirmDeleteHandler}
            type="button"
            className={`${styles.deleteBtn} btn flex-fill fw-semibold`}
          > Delete
          </button>
          <button
          onClick={DeleteModelHandler}
            type="button"
            className={`${styles.cancelBtn} btn flex-fill fw-semibold`}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModel;