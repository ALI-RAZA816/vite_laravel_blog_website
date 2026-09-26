import React, { useContext, useEffect, useState } from 'react'
import { Navigate, Outlet, useNavigate} from 'react-router-dom';
import { apiUrl } from '../Http/Http';
import { AppContext } from '../Context/AppContext';
import { useUser } from '../Context/UserContext';

export default function AuthDashboard() {
    const token = localStorage.getItem('token');
    const {setStatusCode} = useContext(AppContext);
    const navigate = useNavigate();
    const {authorized, setAuthorized} = useContext(AppContext);
    const {setLoggedUser} = useUser();

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
                setStatusCode(403); 
                navigate('/aunauthorized');
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
