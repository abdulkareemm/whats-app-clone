import React from 'react'
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "../../utils/validations";
import {AuthInput} from "../../components";
import { useDispatch, useSelector } from "react-redux";
import PluseLoader from "react-spinners/PulseLoader";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../../features/userSlice";

const Signin = () => {
  const { status, error } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
  });
  const Submit = async (data) => {
    let res;
    res = await dispatch(loginUser(data));
    if (res?.payload?.user) navigate("/");
  };
  return (
    <div className="h-screen dark:bg-dark_bg_1 flex items-center justify-center py-[19px] overflow-hidden">
      {/* Container */}
      <div className="flex w-[1600px] mx-auto h-full">
        {/* Login form */}
        <div className="h-screen w-full flex items-center justify-center overflow-hidden">
          {/* Container */}
          <div className="max-w-md space-y-8 p-10 dark:bg-dark_bg_2 rounded-xl">
            {/* Heading */}
            <div className="text-center text-dark_text_1">
              <h2 className="mt-6 text-3xl font-bold">Welcome Back</h2>
              <p className="mt-2 text-sm">Sign in</p>
            </div>
            {/* Form */}
            <form className="mt-6 space-y-6" onSubmit={handleSubmit(Submit)}>
              <AuthInput
                name="email"
                type="text"
                placeholder="Email address"
                register={register}
                error={errors?.email?.message}
              />
              <AuthInput
                name="password"
                type="password"
                placeholder="Password"
                register={register}
                error={errors?.password?.message}
              />
              {/* if we have error */}
              {error && (
                <div>
                  <p className="text-red-400">{error}</p>
                </div>
              )}
              {/* Submit Button */}
              <button
                type="submit"
                className="w-full flex justify-center bg-green_1 text-gray-100 p-4 rounded-full tracking-wide
          font-semibold focus:outline-none hover:bg-green_2 shadow-lg cursor-pointer transition ease-in duration-300"
              >
                {status === "loading" ? (
                  <PluseLoader color="#36d7b7" />
                ) : (
                  "Login"
                )}
              </button>
              {/* Sign up link */}
              <p className="flex flex-col items-center justify-center mt-10 text-center text-md dark:text-dark_text_1">
                <span>Have an account ?</span>
                <Link
                  className="hover:underline cursor-pointer transition ease-in duration-300 hover:text-blue-500"
                  to="/sign-up"
                >
                  Sign up
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signin