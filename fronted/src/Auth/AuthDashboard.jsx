import React, { useContext, useEffect, useState } from 'react'
import { Navigate, Outlet} from 'react-router-dom';
import { apiUrl } from '../Http/Http';
import { AppContext } from '../Context/AppContext';
import { useUser } from '../Context/UserContext';

export default function AuthDashboard() {
    const token = localStorage.getItem('token');
    const {authorized, setAuthorized} = useContext(AppContext);
    const [loggedUser, setLoggedUser] = useState(null);

    useEffect(()=>{

        fetch(`${apiUrl}/user`,{
            headers:{
                'Authorization':`Bearer ${token}`
            }
        }).then(res=>{
            return res.json();
        }).then(user =>{
            setLoggedUser(user);
            if(['admin','editor','author'].includes(user.role)){
                setAuthorized('authorized');
            }else{
                // setAuthorized('aunauthorized');
                 setStatusCode(403); 
            }
        }).catch(()=>{
            localStorage.removeItem('token');
            setLoggedUser(null);
            localStorage.removeItem('UserInfo');
            setAuthorized('unauthorized');
        })
    },[]);

      
    if (authorized === 'checking') return 
    
    if (authorized === 'unauthorized' || !token) {
        return <Navigate to="/admin-login" replace />;
    }

    return token && authorized === 'authorized' ? <Outlet/> : <Navigate to ='/admin-login' replace/>
}
