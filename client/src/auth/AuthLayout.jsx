import React from "react";
import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";

const AuthLayout = () => {
  const {user} = useSelector(state=>state.user)

  return <>{user?.token!=="" ? <Navigate to="/" /> : <>
  <section><Outlet /></section>
  </>}</>;
};

export default AuthLayout;
