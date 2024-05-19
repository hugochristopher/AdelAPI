import Joi from 'joi';

export const bodySchemaLogin = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(4).required(),
})

export const bodySchemaRegister = Joi.object({
  nickName: Joi.string().min(3).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(4).required(),
})

export const bodySchemaUpdate = Joi.object({
  name: Joi.string().min(4).optional().allow(''),
  email: Joi.string().email().optional().allow(''),
  password: Joi.string().min(4).optional().allow(''),
}).or('name', 'email', 'password');

export const paramsSchemaUpdate = Joi.object({
  id: Joi.string().required(),
})