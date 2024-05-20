import Joi from "joi";

export const signupSchema = Joi.object({
  name: Joi.string().required().error(new Error("Provide a valid name")),
  email: Joi.string()
    .email({ tlds: false })
    .required()
    .error(new Error("Provide a valid email address")),
  dob: Joi.date().required().error(new Error("Provide a valid date of birth")),
  phone: Joi.string()
    .required()
    .error(new Error("Provide a valid phone number")),
  address: Joi.string().required().error(new Error("Provide a valid address")),
  password: Joi.string()
    .required()
    .error(new Error("Provide a valid password")),
});

export const signinSchema = Joi.object({
  email: Joi.string()
    .email({ tlds: false })
    .required()
    .error(new Error("Provide a valid email address")),
  password: Joi.string()
    .required()
    .error(new Error("Provide a valid password")),
});

export const addSchema = Joi.object({
  name: Joi.string().required().error(new Error("Provide a valid name")),
  email: Joi.string()
    .email({ tlds: false })
    .required()
    .error(new Error("Provide a valid email address")),
  dob: Joi.date().required().error(new Error("Provide a valid date of birth")),
  phone: Joi.string()
    .required()
    .error(new Error("Provide a valid phone number")),
  address: Joi.string().required().error(new Error("Provide a valid address")),
  password: Joi.string()
    .required()
    .error(new Error("Provide a valid password")),
  mother_id: Joi.optional(),
  father_id: Joi.optional(),
});

export const updateSchema = Joi.object({
  name: Joi.string().optional().error(new Error("Provide a valid name")),
  email: Joi.string()
    .email({ tlds: false })
    .optional()
    .error(new Error("Provide a valid email address")),
  dob: Joi.date().optional().error(new Error("Provide a valid date of birth")),
  phone: Joi.string()
    .optional()
    .error(new Error("Provide a valid phone number")),
  address: Joi.string().optional().error(new Error("Provide a valid address")),
  password: Joi.string()
    .optional()
    .error(new Error("Provide a valid password")),
  mother_id: Joi.optional(),
  father_id: Joi.optional(),
});
