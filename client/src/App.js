import {Routes,Route} from "react-router-dom"
import { AuthLayout, SigninForm, SignupForm } from "./auth";
import { RootLayout } from "./components";

function App() {
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
