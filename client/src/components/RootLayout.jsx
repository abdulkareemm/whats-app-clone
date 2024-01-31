import React from 'react'
import { useSelector } from 'react-redux';
import { Outlet, Navigate } from "react-router-dom";


const RootLayout = () => {
  const { user } = useSelector((state) => state.user);
  return (
    <>
      {user?.token !== "" ? (
        <section>
          <Outlet />
        </section>
      ) : (
        <Navigate to="/sign-in" />
      )}
    </>
  );
}

export default RootLayout