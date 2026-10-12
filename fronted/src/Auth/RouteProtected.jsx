import { useUser } from '../Context/UserContext';
import { Navigate, Outlet } from 'react-router-dom';

export default function RouteProtected({children, allowRoles}) {
    const {loggedUser} = useUser();

    if(!allowRoles.includes(loggedUser.role)){
      return <Navigate to="/error/403" replace />;
    }

  return <Outlet/>;
}
