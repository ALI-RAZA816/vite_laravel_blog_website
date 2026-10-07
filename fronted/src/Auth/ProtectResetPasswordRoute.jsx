import React, { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { apiSend } from '../services/apiClient';
import Loader from '../components/Loader';

export default function ProtectResetPasswordRoute() {
  const email = localStorage.getItem('reset_email');
  const [allowed, setAllowed] = useState(null);

  useEffect(() => {
    if (!email) {
      setAllowed(false);
      return;
    }
    const check = async () => {
      try {
        const { ok, data } = await apiSend('indexs', 'POST', { email });
        setAllowed(ok && Number(data.user?.otp_verified) === 1);
      } catch (error) {
        console.log(error);
        setAllowed(false);
      }
    };
    check();
  }, [email]);

  if (allowed === null) return <Loader/>;
  return allowed ? <Outlet /> : <Navigate to="/verify-otp" replace />;
}