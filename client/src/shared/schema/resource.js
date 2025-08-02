import Joi from "joi";

export const resourceFormSchema = Joi.object({
  type: Joi.string(),
  sheet: Joi.any(),
  sheetLink: Joi.string().uri().optional()
});

