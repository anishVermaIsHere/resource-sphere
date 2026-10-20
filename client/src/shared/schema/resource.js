import Joi from "joi";

export const resourceFormSchema = Joi.object({
  type: Joi.string(),
  file: Joi.any().optional().allow(null, ""),
  sheetLink: Joi.string().uri().optional().allow(""),
  sheetTitle: Joi.string().optional().allow("")
});

