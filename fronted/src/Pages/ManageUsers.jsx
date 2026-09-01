import React, { useContext, useEffect, useRef } from "react";
import { BsDownload, BsPersonPlusFill, BsPeopleFill, BsShieldFillCheck, BsGraphUpArrow, BsSlashCircleFill, BsFilter,
  BsThreeDotsVertical,
  BsChevronLeft,
  BsChevronRight,
} from "react-icons/bs";
import styles from "../assets/ManageUsers.module.css";
import { MdOutlineModeEdit } from "react-icons/md";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { AppContext } from "../Context/AppContext";
import { Link, useNavigate, useParams } from "react-router-dom";
import { apiUrl, baseUrl } from "../Http/Http";


const ManageUsers = () => {

  const {allUsers} = useContext(AppContext);
  const {totalUsers} = useContext(AppContext);
  const {pagination} = useContext(AppContext);
  const {currentPage} = useContext(AppContext);
  const {setCurrentPage} = useContext(AppContext);
  const {setAllUsers} = useContext(AppContext);
  const {thisWeek} = useContext(AppContext);
  const {Blocked} = useContext(AppContext);
  const {allEditors} = useContext(AppContext);
  const {DeleteModelHandler} = useContext(AppContext);
  
  const statCards = [
    {
      icon: <BsPeopleFill />,
      iconBg: "#e6e0f8",
      iconColor: "#5b3fd9",
      label: "TOTAL USERS",
      value: totalUsers.length <= 1000 ? `${totalUsers.length}` : `${(totalUsers.length/1000).toFixed(1)}k`,
    },
    {
      icon: <BsShieldFillCheck />,
      iconBg: "#faf1d8",
      iconColor: "#c98a1a",
      label: "EDITORS",
      value: allEditors.length <= 1000 ? `${allEditors.length}` : `${(allEditors.length/1000).toFixed(1)}k`,
    },
    {
      icon: <BsGraphUpArrow />,
      iconBg: "#e6e0f8",
      iconColor: "#5b3fd9",
      label: "NEW THIS WEEK",
      value: thisWeek.length <= 1000 ? `${thisWeek.length}` :`${(thisWeek.length/1000).toFixed(1)}k`,
    },
    {
      icon: <BsSlashCircleFill />,
      iconBg: "#fbe1e1",
      iconColor: "#d94f4f",
      label: "BLOCKED",
      value: Blocked.length <= 1000 ? `+${Blocked.length}` : `${(Blocked.length/1000).toFixed(1)}k`
    },
  ];


  const searchTimeout = useRef(null);
  const searchHandler = async (searchTerm)=>{
    const token = localStorage.getItem('token');
    const response = await fetch(`${apiUrl}/search?query=${searchTerm}`,{
      method:'POST',
      headers:{
        'Content-type':'application/json',
        'Accept':'application/json',
        'Authorization':`Bearer ${token}`,
      }
    });
    const data = await response.json();
    if(response.ok){
      setAllUsers(data.users.data);
    }

  }


  const getValue = (event)=>{
    const searchTerm = event.target.value;
    clearTimeout(searchTimeout.current);
    searchTimeout.current =  setTimeout(()=>{
      searchHandler(searchTerm);
    },600);
  }

  const getRole = (event)=>{
    const searchTerm = event.target.value;
    clearTimeout(searchTimeout.current);
    searchTimeout.current =  setTimeout(()=>{
      searchHandler(searchTerm);
    },600);
  }
  const getStatus = (event)=>{
    const searchTerm = event.target.value;
    clearTimeout(searchTimeout.current);
    searchTimeout.current =  setTimeout(()=>{
      searchHandler(searchTerm);
    },600);
  }

  const pages = [];
  const start = Math.max(1, pagination.currentPage - 2);
  const end = Math.min(pagination.lastPage, pagination.currentPage + 2);
  if(start > 1){
    pages.push(1);
    if(start > 2) pages.push('...');
  }

  for (let i = start; i<=end; i++  ){
    pages.push(i);
  }
 
  if(end < pagination.lastPage){
    if(end < pagination.lastPage - 1) pages.push("...");
    pages.push(pagination.lastPage);
  }
  return (
    <div className={styles.content}>
      {/* Heading */}
      <div className={`d-flex justify-content-between align-items-start flex-wrap gap-3 ${styles.headingRow}`}>
        <div>
          <h2 className={styles.pageTitle}>Manage Users</h2>
          <p className={styles.pageSubtitle}>
            Overview and moderation of the blog community.
          </p>
        </div>
        <div className="d-flex align-items-center gap-3">
          <button className={`d-flex align-items-center ${styles.exportBtn}`}>
            <BsDownload className="me-2" />
            Export List
          </button>
          <Link to="/admin-panel/users/add-new-user"><button className={`d-flex align-items-center ${styles.addBtn}`}>
            <BsPersonPlusFill className="me-2" />
            Add New User
          </button></Link>
        </div>
      </div>

      {/* Stat cards */}
      <div className="row g-4 mb-4">
        {statCards.map((card, index) => (
          <div className="col-12 col-sm-6 col-xl-3" key={index}>
            <div className={`d-flex align-items-center gap-3 ${styles.statCard}`}>
              <div
                className={styles.statIcon}
                style={{ backgroundColor: card.iconBg, color: card.iconColor }}
              >
                {card.icon}
              </div>
              <div>
                <p className={styles.statLabel}>{card.label}</p>
                <h3 className={styles.statValue}>{card.value}</h3>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Registered users table */}
      <div className={styles.tableCard}>
        <div className={`d-flex justify-content-between align-items-center ${styles.tableHeader}`}>
          <h6 className={styles.tableTitle}>REGISTERED USERS</h6>
          <div className="d-flex align-items-center gap-3">
            <input type="text" onChange={getValue} className="form-control bg-none shadow-none" style={{width:'200px'}}  placeholder="Search user, email" />
            {/* <div> */}
              <select onChange={getRole} className="form-select" name="" id="">
                <option value="all">Role: All</option>
                <option value="editor">Editor</option>
                <option value="admin">Admin</option>
                <option value="user">User</option>
                <option value="author">Author</option>
              </select>
            {/* </div> */}
            {/* <div> */}
              <select onChange={getStatus}  className="form-select" name="" id="">
                <option value="all">Status: All</option>
                <option value="blocked">Blocked</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            {/* </div> */}
          </div>
        </div>

        <div className="table-responsive">
          <table className={`table mb-0 ${styles.usersTable}`}>
            <thead>
              <tr>
                <th>NAME</th>
                <th>EMAIL</th>
                <th>ROLE</th>
                <th>JOIN DATE</th>
                <th>STATUS</th>
                <th>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {allUsers.map((user, index) => (
                <tr key={index} className={user.highlight ? styles.rowHighlight : ""}>
                  <td>
                    <div className="d-flex align-items-center gap-3">
                      <div
                        className={`${styles.avatar} overflow-hidden`}
                        style={{ backgroundColor: '#c5c2d6', }}
                      >
                       {user.image !== null ? (
                              <img
                                  src={`${baseUrl}/uploads/${user.image}`}
                                  alt=""
                              />
                          ) : (
                              <>
                                  {user.name.split(' ')[0].substr(0, 1)}
                                  {user.name.split(' ')[1]?.substr(0, 1)}
                              </>
                          )}
                      </div>
                      <div>
                        <p className={styles.userName}>{user.name}</p>
                      </div>
                    </div>
                  </td>
                  <td className={styles.emailCell}>{user.email}</td>
                  <td>
                    <span style={{color:user.role === 'admin' ? '#165823' :'' || user.role ==='user' ? '#2E2910' :'' || user.role === 'editor' ? '#464B71':'',backgroundColor:user.role === 'admin' ? 'rgba(22, 88, 35,.30)' :'' || user.role ==='user' ? 'rgba(242, 242, 237,.50)' :'' || user.role === 'editor' ? 'rgba(70, 75, 113,.30)':''}} className={`${styles.roleBadge} text-capitalize`}>{user.role}</span>
                  </td>
                  <td className={styles.dateCell}>{user.join_date}</td>
                  <td>
                    <span
                      className={`d-flex align-items-center text-capitalize ${styles.statusText} ${
                        user.status === "Active" ? styles.statusActive : styles.statusBlocked
                      }`}
                    >
                      <span style={{backgroundColor:user.status === 'active' ? '#165823' : '' || user.status === 'blocked' ? '#DF301C':'' || user.status === 'inactive' ? '#A8A492':'' }} className={styles.statusDot}></span>
                      <span style={{color:user.status === 'active' ? '#165823' : '' || user.status === 'blocked' ? '#DF301C':'' || user.status === 'inactive' ? '#A8A492':'' }}>{user.status}</span>
                    </span>
                  </td>
                  <td>
                    <Link to={`/admin-panel/users/edituser/${user.id}`}>
                      <MdOutlineModeEdit className={styles.editpencil}/>
                    </Link>
                    <button className="p-0" disabled={user.role === 'admin'} style={{background:'none !important',color:'none',backgroundColor:'none !important',outline:'none',border:'none'}}>
                      <RiDeleteBin5Fill  onClick={()=>DeleteModelHandler(user.id)} className={styles.deleteIcon}  />
                    </button>
                    {/* <BsThreeDotsVertical className={styles.actionsIcon} /> */}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className={`d-flex justify-content-between align-items-center ${styles.paginationRow}`}>
          <span className={styles.showingText}>Showing {pagination.from} to {pagination.to} of {pagination.total} users</span>
          <div className="d-flex align-items-center gap-2">
            <button disabled={pagination.currentPage === 1} onClick={()=> setCurrentPage(pagination.currentPage - 1)} className={styles.pageBtn}>
              <BsChevronLeft />
            </button>
            {pages.map((page, index)=>{
              return page === '...' ?(
                <span className={styles.pageDots}>...</span>
              ):(<button onClick={()=> setCurrentPage(page)} className={`${styles.pageBtn} ${currentPage === page ? `${styles.pageBtnActive}`: ''}`}>{page}</button>)
            })}
            <button onClick={()=> setCurrentPage(pagination.currentPage + 1)} disabled={pagination.currentPage === pagination.lastPage} className={styles.pageBtn}>
              <BsChevronRight />
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className={`d-flex justify-content-between align-items-center flex-wrap gap-2 ${styles.footer}`}>
        <p className={styles.footerCopy}>© 2024 SlowLiving Blog. All rights reserved.</p>
        <div className={styles.footerLinks}>
          <a href="#">Terms of Service</a>
          <a href="#">Privacy Policy</a>
          <a href="#">Support</a>
        </div>
      </div>
    </div>
  );
};

export default ManageUsers;