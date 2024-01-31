import createHttpError from"http-errors"
import  { verify } from"../utils/token.js"

export const auth = async (req, res, next) => {
  if (!req.headers["authorization"])
    return next(createHttpError.Unauthorized());
  const token = req.headers["authorization"].split(" ")[1];
  const check = await verify(token, process.env.ACCESS_TOKEN_SECRET);
  if (check) {
    req.userId = check.userId;
    next();
  } else {
    return next(createHttpError.Unauthorized());
  }
};
