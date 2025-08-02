import Joi from "joi";

export const loginSchema = Joi.object({
    username: Joi.alternatives().try(
    Joi.string().email({ tlds: false }),
    Joi.string().alphanum().min(3).max(30)
  ).required().messages({
    "alternatives.match": "Username must be a valid email or alphanumeric username.",
    "any.required": "Username is required.",
    "string.empty": "Username must not be empty.",
  }),
  password: Joi.string()
    .min(8)
    .max(16)
    .required()
    .pattern(new RegExp("^[a-zA-Z0-9#]+$"))
    .messages({
      "string.base": "Password should be a string.",
      "string.empty": "Password is required.",
      "string.min": "Password should have at least 8 characters.",
      "string.max": "Password should not exceed 16 characters.",
      "any.required": "Password is required.",
      "string.pattern.base": "Password must contain only letters and numbers.",
    }),
});
