import Joi from "joi";

export const bodySchemaNewsCreation = Joi.object({
  title: Joi.string().min(3).required(),
  description: Joi.string().min(10).required(),
})