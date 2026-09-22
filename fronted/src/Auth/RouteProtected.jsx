import React from 'react'
import { useUser } from '../Context/UserContext';
import { Navigate, Outlet } from 'react-router-dom';

export default function RouteProtected({children, allowRoles}) {
    const {loggedUser} = useUser();


  return allowRoles.includes(loggedUser.role) ? <Outlet/> : <Navigate to="/admin-login" replace />;
}
