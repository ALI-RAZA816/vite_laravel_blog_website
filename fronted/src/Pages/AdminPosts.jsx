import React, { useContext, useEffect, useRef, useState } from "react";
import {
  BsPlusLg,
  BsChevronDown,
  BsFilter,
  BsChevronLeft,
  BsChevronRight,
  BsPencilFill,
  BsTrashFill,
  BsStars,
} from "react-icons/bs";
import styles from "../assets/AdminPosts.module.css";
import { Link } from "react-router-dom";
import { AppContext } from "../Context/AppContext";
import { apiUrl, baseUrl } from "../Http/Http";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);
import { Bar } from "react-chartjs-2";

const post = [
  {
    categoryColor: "",
  }
];


const AdminPosts = () => {
  const chartData2 = [30, 45, 40, 90, 55, 48, 62];
  const months =  ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul",'Aug','Sep','Oct','Nov','Dec']
  
  const {posts} = useContext(AppContext);
  const {setPosts} = useContext(AppContext);
  const {categories} = useContext(AppContext);
  const {setRefresh} = useContext(AppContext);
  const chartData = {
    labels:months,
    datasets: [
      {
        label: "Posts",
        data: chartData2,
        borderWidth: 1,
      },
    ],
  };
  // const maxValue = Math.max(...chartData);
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };
  const deletePost = async (event, id)=>{
    event.preventDefault();
    const token = localStorage.getItem('token');
    try{
      const response = await fetch(`${apiUrl}/posts/${id}`,{
        method:'DELETE',
        headers:{
          'Content-type':'application/json',
          'Accept':'application/json',
          'Authorization':`Bearer ${token}`
        }
      });
      const data = await response.json();
      if(response.ok){
        setRefresh(prev => prev + 1);
      }
    }catch(error){
      console.log(error);
    }
  }

  const [active, setActive] = useState(null);
  const activeFilter = (name)=>{
    setActive(name);
  }

  const searchTimeout = useRef(null);
  const searchHandler = async (searchTerm)=>{
    const token = localStorage.getItem('token');
    const response = await fetch(`${apiUrl}/search-post?query=${searchTerm}`,{
      method:'POST',
      headers:{
        'Content-type':'application/json',
        'Accept':'application/json',
        'Authorization':`Bearer ${token}`,
      }
    });
    const data = await response.json();
    // console.log(data);
    if(response.ok){
      setPosts(data.post);
    }

  }

  const getValue = (event)=>{
    const searchTerm = event.target.value;
    clearTimeout(searchTimeout.current);
    searchTimeout.current =  setTimeout(()=>{
      searchHandler(searchTerm);
    },600);
  }

  const getCategory= (event)=>{
    const searchTerm = event.target.value;
    clearTimeout(searchTimeout.current);
    searchTimeout.current =  setTimeout(()=>{
      searchHandler(searchTerm);
    },600);
  }

  const statusFilter = (searchTerm)=>{
    searchHandler(searchTerm);
  }


  const [checkDeleted, setCheckDeleted] = useState([]);
  const DeletedChecked = (event, id)=>{
    const checked = event.target
    if(checked.checked){
      setCheckDeleted([...checkDeleted,id]);
      console.log(checkDeleted);
    }else{
      setCheckDeleted(checkDeleted.filter(item => item !== id));
      console.log(checkDeleted);
    }
  }


  const [checkedall, setCheckedAll] = useState(false);
  const checkedAll = (event)=>{
    const checked = event.target;
    if(checked.checked){
      setCheckedAll(true);
      setCheckDeleted(posts.map(post => post.id));
      console.log(checkDeleted);
    }else{
      setCheckedAll(false);
      console.log(checkDeleted);
    }

  }


  const multiDeletePost = async (event)=>{
    event.preventDefault();
    const token = localStorage.getItem('token');
    try{
      const response = await fetch(`${apiUrl}/multi-delete-post`,{
        method:'POST',
        headers:{
          'Content-type':'application/json',
          'Accept':'application/json',
          'Authorization':`Bearer ${token}`
        },
        body:JSON.stringify({
          ids:checkDeleted
        })
      });
      const data = await response.json();
      console.log(data);
      if(response.ok){
        setRefresh(prev => prev + 1);
        setCheckDeleted([]);
      }
    }catch(error){
      console.log(error);
    }
  }

  useEffect(()=>{
    setActive('all');
  },[]);

  return (
    <div className={styles.content}>
      {/* Heading */}
      <div className="d-flex justify-content-between align-items-start mb-4">
        <div>
          <h2 className={styles.pageTitle}>Manage Posts</h2>
          <div className={styles.breadcrumb}>
            <span>Dashboard</span>
            <span className={styles.crumbSep}>›</span>
            <span className={styles.crumbActive}>Posts</span>
          </div>
        </div>
        <Link to="/admin-panel/posts/add-post"><button className={`d-flex align-items-center ${styles.addBtn}`}>
          <BsPlusLg className="me-2" />
          Add New Post
        </button></Link>
      </div>

      {/* Filters */}
      <div className={`d-flex flex-wrap align-items-center gap-3 ${styles.filterBar}`}>
        <div className={`d-flex align-items-center ${styles.selectBox}`}>
          <input type="text" onChange={getValue} placeholder="Search post" className="form-control border-0 shadow-none" />
        </div>
        <div className={`d-flex align-items-center ${styles.selectBox}`}>
          <select name="" id="" onChange={getCategory} className="form-select border-0 shadow-none">
          <option value="all">All Categories</option>
            {categories.map((category, index)=>{
              return <option index={index} value={category.id}>{category.name}</option>
            })}
          </select>
        </div>
        <div className={styles.statusTabs}>
          <span onClick={()=>{activeFilter('all'), statusFilter('all')}} className={`${styles.statusTab} ${active === 'all' ? `${styles.statusTabActive}` : ''}`}>All</span>
          <span onClick={()=>{activeFilter('published'), statusFilter('published')}} className={`${styles.statusTab} ${active === 'published' ? `${styles.statusTabActive}` : ''}`}>Published</span>
          <span onClick={()=>{activeFilter('draft'), statusFilter('draft')}} className={`${styles.statusTab} ${active === 'draft' ? `${styles.statusTabActive}` : ''}`}>Draft</span>
        </div>
      </div>

      {/* Table */}
      <div className={styles.tableCard}>
        <div className="table-responsive">
          <table className={`table mb-0 ${styles.postsTable}`}>
            <thead>
              <tr>
                <th style={{ width: "40px" }}>
                  <input disabled={posts.length === 0 && 'disabled' }  onChange={checkedAll} type="checkbox" className={styles.checkbox} />
                </th>
                {checkDeleted.length >=1 ? <th><span onClick={multiDeletePost} className="text-danger" style={{cursor:'pointer'}}>Delete</span></th>:<th>POST TITLE</th>}
                <th>CATEGORY</th>
                <th>AUTHOR</th>
                <th>STATUS</th>
                <th>DATE</th>
                <th>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {posts?.map((post, index) => (
                <tr key={index}>
                  <td>
                    <input onChange={(event)=>DeletedChecked(event, post.id)} type="checkbox" checked={checkedall && true} className={styles.checkbox} />
                  </td>
                  <td>
                    <p className={styles.postTitle}>{post.title}</p>
                    <p className={styles.postUrl}>{post.category.slug}</p>
                  </td>
                  <td>
                    <span
                      className={styles.categoryBadge}
                      style={{ backgroundColor: '#f7d774'}}
                    >
                      {post.category.name}
                    </span>
                  </td>
                  <td>
                    <div className="d-flex align-items-center gap-2">
                      <div
                        className={styles.avatar}
                        style={{ backgroundColor: '#5b3fd9', overflow:'hidden'}}
                      >
                        {post.author.image ? <img src={`${baseUrl}/uploads/${post.author.image}`} alt="" />:
                          <>
                              {post.author.name.split(' ')[0].substr(0, 1)}
                              {post.author.name.split(' ')[1]?.substr(0, 1)}
                          </>
                        }
                      </div>
                      <span className={styles.authorName}>{post.author.name}</span>
                    </div>
                  </td>
                  <td>
                    <span
                      className={`d-flex align-items-center ${styles.statusBadge} ${
                        post.published === "published"
                          ? styles.statusPublished
                          : styles.statusDraft
                      }`}
                    >
                      <span className={`${styles.statusDot}`}></span>
                      <span className='text-capitalize'>{post.published}</span>
                      
                    </span>
                  </td>
                  <td className={styles.dateCell}>{post.date}</td>
                  <td>
                    <div className="d-flex align-items-center gap-3">
                      <Link to={`/admin-panel/posts/edit-post/${post.id}`}><BsPencilFill className={styles.actionIcon} /></Link>
                      <BsTrashFill onClick={(event)=> deletePost(event, post.id)} className={`${styles.actionIcon} ${styles.deleteIcon}`} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className={`d-flex justify-content-between align-items-center ${styles.paginationRow}`}>
          <span className={styles.showingText}>Showing 1 to 4 of 24 posts</span>
          <div className="d-flex align-items-center gap-2">
            <button className={styles.pageBtn}>
              <BsChevronLeft />
            </button>
            <button className={`${styles.pageBtn} ${styles.pageBtnActive}`}>1</button>
            <button className={styles.pageBtn}>2</button>
            <button className={styles.pageBtn}>3</button>
            <span className={styles.pageDots}>...</span>
            <button className={styles.pageBtn}>6</button>
            <button className={styles.pageBtn}>
              <BsChevronRight />
            </button>
          </div>
        </div>
      </div>

      {/* Bottom panels */}
      <div className="row g-4 mt-1">
        <div className="col-12 col-lg-7">
          <div className={styles.velocityCard}>
            <h5 className={styles.velocityTitle}>Content Velocity</h5>
            <p className={styles.velocitySubtitle}>
              Your publishing frequency is up 12% this month.
            </p>
          <div className={styles.velocityChart}>
            <Bar data={chartData} options={chartOptions} />
          </div>
          </div>
        </div>

        <div className="col-12 col-lg-5">
          <div className={styles.aiCard}>
            <div className={styles.aiIcon}>
              <BsStars />
            </div>
            <h5 className={styles.aiTitle}>AI Suggestions</h5>
            <p className={styles.aiText}>
              Generate SEO optimized meta descriptions for your drafts automatically.
            </p>
            <button className={styles.aiBtn}>Try Magic Write</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPosts;