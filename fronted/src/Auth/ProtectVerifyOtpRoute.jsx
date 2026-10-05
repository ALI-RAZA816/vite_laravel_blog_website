import React, { useEffect } from 'react'
import { useResetPassword } from '../Context/ResetPasswordContext'
import { Navigate, Outlet } from 'react-router-dom';
import { apiSend } from '../services/apiClient';

export default function ProtectVerifyOtpRoute() {

    const {isGetLink, setisGetLink} = useResetPassword();
    const email = localStorage.getItem('reset_email');

    useEffect(()=>{
        if(!email) return;
        const fetching = async ()=>{
            try{
                const {ok, data} = await apiSend('indexs','POST',{email});
                if(ok){
                    data.send_link === 1 ? setisGetLink(true) : setisGetLink(false);
                }
            }catch(error){
                console.log(error);
            }
        }

        fetching();
    },[email]);


    return isGetLink ? <Outlet/> : <Navigate to='/forgot-password' replace/>

}
