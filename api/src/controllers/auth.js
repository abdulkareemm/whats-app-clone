import  createHttpError from"http-errors"
import { createUser, signUser } from "../services/auth.service.js";
import { generateToken } from "../services/token.service.js";



export const register = async (req, res, next) => {
  try {
    const { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } = process.env;
    const newUser = await createUser(req.body);

    const access_token = await generateToken(
      { userId: newUser._id },
      "1d",
      ACCESS_TOKEN_SECRET
    );
    const refresh_token = await generateToken(
      { userId: newUser._id },
      "30d",
      REFRESH_TOKEN_SECRET
    );
    res.cookie("refreshtoken", refresh_token, {
      httpOnly: true,
      path: "/api/v1/auth/refresh_token",
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });

    res.json({
      msg: "register success",
      user: {
        _id: newUser._id,
        name: newUser.name,
        status: newUser.status,
        picture: newUser.picture,
        email: newUser.email,
        token: access_token,
      },
    });
  } catch (error) {
    console.log(error)
    next(error);
  }
};
export const login = async (req, res, next) => {
  try {
    const user = await signUser(req.body);
    const access_token = await generateToken(
      { userId: user._id },
      "1d",
      process.env.ACCESS_TOKEN_SECRET
    );
    const refresh_token = await generateToken(
      { userId: user._id },
      "30d",
      process.env.REFRESH_TOKEN_SECRET
    );
    res.cookie("refreshtoken", refresh_token, {
      httpOnly: true,
      path: "/api/v1/auth/refresh_token",
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });
    res.json({
      msg: "login success",
      user: {
        _id: user._id,
        name: user.name,
        status: user.status,
        picture: user.picture,
        email: user.email,
        token: access_token,
      },
    });
  } catch (error) {
    next(error);
  }
};
