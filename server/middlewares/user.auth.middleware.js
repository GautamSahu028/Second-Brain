import jwt from "jsonwebtoken";
import { ApiError } from "../utils/ApiError.js";

export const userAuthMiddleware = (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const decoded = jwt.verify(token, process.env.JWT_USER_SECRET_KEY);
    if (decoded) {
      req.userId = decoded._id;
      // console.log(decoded._id);

      next();
    } else {
      throw new ApiError(403, "Invalid User Credentials");
    }
  } catch (error) {
    throw new ApiError(400, "Something went wrong");
  }
};
