import {Routes,Route} from "react-router-dom"
import { AuthLayout, SigninForm, SignupForm } from "./auth";
import { RootLayout } from "./components";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "./features/userSlice";

function App() {
  const  dispatch =  useDispatch()
  // useEffect(()=>{
  //   dispatch(logout())
  // })
  return (
    <main className="">
      <Routes>
        {/* public routes */}
        <Route element={<AuthLayout />}>
          <Route path="/sign-in" element={<SigninForm />} />
          <Route path="/sign-up" element={<SignupForm />} />
        </Route>
        {/* private routes */}
        <Route element={<RootLayout />}></Route>
      </Routes>
    </main>
  );
}

export default App;
