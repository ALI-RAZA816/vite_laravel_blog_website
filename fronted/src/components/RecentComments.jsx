import React from 'react'
import { useLocation } from 'react-router-dom'

export default function RecentComments() {
  const location = useLocation();
  return (
    <div style={{backgroundColor:'#EEEEEE', height:'450px'}} className='rounded-2 d-flex justify-content-center align-items-center'>
        <h3 style={{color:'#BFC9D1'}} >{location.pathname === '/admin-panel/comments' ? 'No Comments' : 'No Recent Comments'}</h3>
    </div>
  )
}
