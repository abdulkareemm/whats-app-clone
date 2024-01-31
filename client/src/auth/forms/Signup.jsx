import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { signupSchema } from "../../utils/validations";
import {AuthInput} from "../../components";
import { useDispatch, useSelector } from "react-redux";
import PluseLoader from "react-spinners/PulseLoader";
import { Link, useNavigate } from "react-router-dom";
import {
  changeError,
  changeStatus,
  registerUser,
} from "../../features/userSlice";
import {Picture} from "../../components";
import axios from "axios";

const Signup = () => {
  const { status, error } = useSelector((state) => state.user);
  const [picture, setPicture] = useState();
  const [readablePicture, setReadablePicture] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(signupSchema),
  });
  //   dispatch(changeStatus(""));
  // dispatch(changeError(""))

  const Submit = async (data) => {
    let res;
    dispatch(changeStatus("loading"));
    if (picture) {
      // Upload to cloudinary and then register user
      let image_url = await uploadImage();
      if (image_url === "error") {
        return;
      }
      res = await dispatch(registerUser({ ...data, picture: image_url }));
    } else {
      res = await dispatch(registerUser({ ...data, picture: "" }));
    }
    if (res?.payload?.user) {
      navigate("/");
    }
  };
  const uploadImage = async () => {
    try {
      let formData = new FormData();
      formData.append("upload_preset", process.env.REACT_APP_CLOUD_SECRET);
      formData.append("file", picture);
      const { data } = await axios.post(
        `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUD_NAME}/image/upload`,
        formData
      );
      return data.secure_url;
    } catch (err) {
      dispatch(
        changeError({
          status: "failed",
          error: `${err.message} ,The image doesn't upload please check your connections.`,
        })
      );
      return "error";
    }
  };
  return (
    <div className="min-h-screen dark:bg-dark_bg_1 flex items-center justify-center py-[19px] overflow-hidden">
      {/* Container */}
      <div className="flex w-[1600px] mx-auto h-full">
        {/* Register form */}
        <div className="min-h-screen w-full flex items-center justify-center overflow-hidden">
          {/* Container */}
          <div className="w-full max-w-md space-y-8 p-10 dark:bg-dark_bg_2 rounded-xl">
            {/* Heading */}
            <div className="text-center text-dark_text_1">
              <h2 className="mt-6 text-3xl font-bold">Welcome</h2>
              <p className="mt-2 text-sm">Sign up</p>
            </div>
            {/* Form */}
            <form className="mt-6 space-y-6" onSubmit={handleSubmit(Submit)}>
              <AuthInput
                name="name"
                type="text"
                placeholder="Full Name"
                register={register}
                error={errors?.name?.message}
              />
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
              {/* Picture */}
              <Picture
                readablePicture={readablePicture}
                setReadablePicture={setReadablePicture}
                setPicture={setPicture}
              />
              {/* if we have error */}
              {error && (
                <div>
                  <p className="text-red-400">{error}</p>
                </div>
              )}
              {/* Submit Button */}

              {status === "loading" ? (
                <div className="w-full flex justify-center p-2">
                  <PluseLoader color="#36d7b7" />
                </div>
              ) : (
                <button
                  type="submit"
                  className="w-full flex justify-center bg-green_1 text-gray-100 p-4 rounded-full tracking-wide
          font-semibold focus:outline-none hover:bg-green_2 shadow-lg cursor-pointer transition ease-in duration-300 
          "
                >
                  Sign Up
                </button>
              )}
              {/* Sign in link */}
              <p className="flex flex-col items-center justify-center mt-10 text-center text-md dark:text-dark_text_1">
                <span>Have an account ?</span>
                <Link
                  className="hover:underline cursor-pointer transition ease-in duration-300 hover:text-blue-500"
                  to="/sign-in"
                >
                  Sign in
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
