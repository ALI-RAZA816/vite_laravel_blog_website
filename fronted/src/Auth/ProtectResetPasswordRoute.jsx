import React from 'react'
import { useResetPassword } from '../Context/ResetPasswordContext';
import { Navigate } from 'react-router-dom';

export default function ProtectResetPasswordRoute() {

    const {isVerifiedOtp} = useResetPassword();
    const email = localStorage.getItem('reset_email');

        useEffect(()=>{
            if(!email) return;
            const fetching = async ()=>{
                try{
                    const {ok, data} = await apiSend('indexs','POST',{email});
                    if(ok){
                        data.otp_verified === 1 ? setisGetLink(true) : setisGetLink(false);
                    }
                }catch(error){
                    console.log(error);
                }
            }
    
            fetching();
        },[email]);

    return isVerifiedOtp ? <Outlet/> : <Navigate to='/verify-otp' replace/>

}
