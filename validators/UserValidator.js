import joi from "joi";
import { cleanPhoneNumber } from "../utils/UserUtils.js";

export const RegisterUserSchema = joi.object({
  name: joi.string().required().empty().messages({
    "any.required": "Name is required",
    "string.empty": "Name is required",
  }),

  email: joi.string().email().required().empty().messages({
    "any.required": "Email is required",
    "string.email": "Invalid email format",
    "string.empty": "Email cannot be empty",
  }),

  password: joi.string().required().min(6).messages({
    "any.required": "Password is required",
    "string.min": "Password should be atleast of 6 chars",
  }),
});

export const LoginUserSchema = joi.object({
  email: joi.string().email().required().empty().messages({
    "any.required": "Email is required",
    "string.email": "Invalid email format",
    "string.empty": "Email cannot be empty",
  }),

  password: joi.string().required().min(6).messages({
    "any.required": "Password is required",
    "string.min": "Password should be atleast of 6 chars",
  }),
});

export const UpdateUserSchema = joi.object({
  name: joi.string().messages({
    "string.empty": "Name can not be empty",
  }),

  email: joi.string().email().messages({
    "string.empty": "Email can not be empty",
    "string.email": "Invalid email format",
  }),
  phone: joi
    .string()
    .custom((value, helpers) => {
      const cleanedPhoneNumber = cleanPhoneNumber(value);
      if (!/^(92|\\+92)?[0-9]{10}$/.test(cleanedPhoneNumber)) {
        return helpers.error("string.pattern.base");
      }
      return cleanedPhoneNumber;
    })
    .messages({
      "string.empty": "Phone number can not be empty",
      "string.pattern.base": "Invalid phone number format",
    }),
  password: joi.string().min(6).messages({
    "string.empty": "Password can not be empty",
    "string.min": "Password should be atleast of 6 chars",
  }),
});
