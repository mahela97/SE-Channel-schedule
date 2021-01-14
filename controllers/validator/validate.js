const Joi = require("@hapi/joi");

const registerValidation = (data) => {
  const schema = {
    user_id: Joi.any(),
    email: Joi.string().min(6).max(255).required().email(),
    password: Joi.string().min(6).max(255).required(),
    password_repeat: Joi.any().valid(Joi.ref("password")).required(),
  };
  return Joi.validate(data, schema);
};

const loginValidation = (data) => {
  const schema = {
    email: Joi.string().min(6).max(255).required().email(),
    password: Joi.string().min(6).max(255).required(),
  };
  return Joi.validate(data, schema);
};

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
