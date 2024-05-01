import { compare } from "bcrypt";
import { User } from "../models/UserModel.js";
import { generateAuthToken, hashPassword } from "../utils/AuthUtils.js";

export const RegisterUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    let user = await User.findOne({ email });

    if (user) {
      return res.error("Authentication Error", "User Already Exists", 401);
    }

    const hashedPassword = await hashPassword(password);

    user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    const { id, phone } = user;
    const authToken = await generateAuthToken(id);

    res.success("User Registered Successfully", {
      authToken,
      name,
      email,
      phone,
    });
  } catch (error) {
    next(error);
  }
};

export const LoginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    let user = await User.findOne({ email });
    if (!user) {
      return res.error(
        "Authentication Error",
        "Email or Password is incorrect",
        401
      );
    }

    const comparePasswords = await compare(password, user.password);
    if (!comparePasswords) {
      return res.error(
        "Authentication Error",
        "Email or Password is incorrect",
        401
      );
    }

    const { id, name, phone } = user;
    const authToken = await generateAuthToken(id);
    res.success("Logged in Successful", { authToken, name, email, phone });
  } catch (error) {
    next(error);
  }
};

export const FetchUser = async (req, res, next) => {
  try {
    const { name, email, phone } = req.user;
    res.success("User Fetched Successfully", { name, email, phone });
  } catch (error) {
    next(error);
  }
};

export const UpdateUser = async (req, res, next) => {
  try {
    const { id } = req.user;
    const { name, email, phone, password } = req.body;
    let updatedUser = {};

    if (name) updatedUser.name = name;
    if (email) {
      if (email == req.user.email) {
        return res.error(
          "Validation Error",
          "New email cannot be same as the old one",
          401
        );
      }

      const user = await User.findOne({ email });
      if (user) {
        return res.error("Authentication Error", "Email Already Exists", 401);
      }

      updatedUser.email = email;
    }
    if (phone) updatedUser.phone = phone;
    if (password) {
      updatedUser.password = await hashPassword(password);
    }

    updatedUser = await User.findByIdAndUpdate(
      id,
      { $set: updatedUser },
      { new: true }
    );
    res.success("Updated User Successfully", { name, email, phone });
  } catch (error) {
    next(error);
  }
};

export const DeleteUser = async (req, res, next) => {
  try {
    const { id } = req.user;
    await User.findByIdAndDelete(id);
    res.success("User Deleted Successfully");
  } catch (error) {
    next(error);
  }
};
