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
            console.log(user);
            if(['admin','editor','author'].includes(user.role)){
                setAuthorized('authorized');
            }else{
                setAuthorized('unauthorized');
            }
        }).catch(()=>{
            localStorage.removeItem('token');
            localStorage.removeItem('UserInfo');
            setAuthorized('unauthorized');
        })
    },[]);

    return token && authorized === 'authorized' ? <Outlet/> : <Navigate to ='/admin-login' replace/>
}
