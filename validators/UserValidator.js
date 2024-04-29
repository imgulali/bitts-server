import joi from "joi";

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
    "any.required": "Name is required",
    "string.empty": "Name is required",
  }),

  email: joi.string().email().messages({
    "any.required": "Email is required",
    "string.email": "Invalid email format",
  }),

  password: joi.string().min(6).messages({
    "any.required": "Password is required",
    "string.min": "Password should be atleast of 6 chars",
  }),
});