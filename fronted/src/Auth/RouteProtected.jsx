import React, { useContext } from 'react'
import { useUser } from '../Context/UserContext';
import { Navigate, Outlet } from 'react-router-dom';
import { AppContext } from '../Context/AppContext';

export default function RouteProtected({children, allowRoles}) {
    const {loggedUser} = useUser();
    const {setStatusCode} = useContext(AppContext);

    if(!allowRoles.includes(loggedUser.role)){
      setStatusCode(403);
        return <Navigate to="/aunauthorized" replace />;
    }

  return <Outlet/>;
}
