import jwt from "jsonwebtoken";
import { User } from "../models/UserModel.js";
import { JwtKey } from "../config/Constants.js";

export const verifyUser = async (req, res, next) => {
  try {
    const authToken = req.header("authToken");
    if (!authToken) {
      return res.error("Authentication Error", "Access Denied", 401);
    }
    const { id } = await jwt.verify(authToken, JwtKey);
    if (id) {
      const user = await User.findById(id);
      if (user) {
        req.user = {
          id: user.id,
          name: user.name,
          email: user.email,
        };
        next();
      } else {
        return res.error("Authentication Error", "User Doesn't Exists", 401);
      }
    } else {
      return res.error("Authentication Error", "Access Denied", 401);
    }
  } catch (error) {
    next(error);
  }
};
