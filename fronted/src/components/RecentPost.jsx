import React from 'react'
import { useLocation } from 'react-router-dom'

export default function RecentPost() {
    const location = useLocation();
  return (
     <div style={{backgroundColor:'#EEEEEE',height:'500px'}} className='rounded-2 d-flex justify-content-center align-items-center'>
        <h3 style={{color:'#BFC9D1'}} >{location.pathname === '/admin-panel/dashboard' ? 'No Recent Posts' : 'No Posts'}</h3>
    </div>
  )
}
