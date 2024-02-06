import { Routes, Route } from "react-router-dom";
import { AuthLayout, SigninForm, SignupForm } from "./auth";
import { RootLayout } from "./components";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "./features/userSlice";
import { Home } from "./pages";
import { io } from "socket.io-client";
import SocketContext from "./context/SocketContext";

// socket io
const socket = io(process.env.REACT_APP_API_ENDPOINT.split("/api/v1")[0]);

function App() {
  const dispatch = useDispatch();
  // useEffect(()=>{
  //   dispatch(logout())
  // })
  return (
    <main className="dark">
      <SocketContext.Provider value = {socket}>
        <Routes>
          {/* public routes */}
          <Route element={<AuthLayout />}>
            <Route path="/sign-in" element={<SigninForm />} />
            <Route path="/sign-up" element={<SignupForm />} />
          </Route>
          {/* private routes */}
          <Route element={<RootLayout />}>
            <Route index element={<Home />} />
          </Route>
        </Routes>
      </SocketContext.Provider>
    </main>
  );
}

export default App;
