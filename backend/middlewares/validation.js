import validator from "validator";
import { celebrate, Joi, Segments } from "celebrate";

/* -------------------------
   VALIDACIÓN DE URL
--------------------------*/
export const validateURL = (value, helpers) => {
  if (validator.isURL(value)) {
    return value;
  }
  return helpers.error("string.uri");
};

/* -------------------------
   REGISTER VALIDATION
--------------------------*/
export const validateRegister = celebrate({
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    about: Joi.string().min(2).max(30).required(),
    avatar: Joi.string().required().custom(validateURL),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
});

/* -------------------------
   LOGIN VALIDATION
--------------------------*/
export const validateLogin = celebrate({
  [Segments.BODY]: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
});

export const validateUserId = celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    id: Joi.string().hex().length(24).required(),
  }),
});
