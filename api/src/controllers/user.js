import createHttpError from "http-errors";
import { searchUsers as search} from "../services/user.service.js";

export const searchUsers = async (req, res, next) => {
  try {
    const keywords = req.query.search;
    if (!keywords) {
      throw createHttpError.BadRequest("Please add a search term first.");
    }
    const users = await search(keywords)
    return res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};
