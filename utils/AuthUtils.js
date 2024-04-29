import jwt from "jsonwebtoken";
import { genSalt, hash } from "bcrypt";
import { JwtKey } from "../config/Constants.js";

export const generateAuthToken = (id) => {
  return new Promise((resolve, reject) => {
    try {
      const data = {
        user: {
          id,
        },
      };
      const authToken = jwt.sign(data.user, JwtKey);
      resolve(authToken);
    } catch (error) {
      reject(error);
    }
  });
};

export const hashPassword = async (password) => {
  return new Promise(async (resolve, reject) => {
    try {
      const salt = await genSalt(10);
      const hashedPass = await hash(password, salt);
      resolve(hashedPass);
    } catch (error) {
      reject(error);
    }
  });
};
