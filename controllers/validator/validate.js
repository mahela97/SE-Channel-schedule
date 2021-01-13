const Joi = require("@hapi/joi");

const registerValidation = (data) => {
  const schema = {
    user_id: Joi.any(),
    email: Joi.string().min(6).max(255).required().email(),
    password: Joi.string().min(6).max(255).required(),
  };
  return Joi.validate(data, schema);
};

module.exports.registerValidation = registerValidation;
