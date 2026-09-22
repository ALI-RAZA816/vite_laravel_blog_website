import React, { useContext, useEffect, useState } from 'react'
import { Navigate, Outlet} from 'react-router-dom';
import { apiUrl } from '../Http/Http';
import { AppContext } from '../Context/AppContext';

export default function AuthDashboard() {
    const token = localStorage.getItem('token');
    const {authorized, setAuthorized} = useContext(AppContext);

    useEffect(()=>{

        fetch(`${apiUrl}/user`,{
            headers:{
                'Authorization':`Bearer ${token}`
            }
        }).then(res=>{
            return res.json();
        }).then(user =>{
            if(['admin','editor','author'].includes(user.role)){
                setAuthorized('authorized');
            }
        }).catch(()=>{
            localStorage.removeItem('token');
            localStorage.removeItem('UserInfo');
            setAuthorized('unauthorized');
        })
    },[]);
    
    if (authorized === 'unauthorized' || !token) {
        return <Navigate to="/admin-login" replace />;
    }

    return token && authorized === 'authorized' ? <Outlet/> : <Navigate to ='/admin-login' replace/>
}
