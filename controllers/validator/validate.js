const Joi = require("@hapi/joi");

const userRegisterValidation = (data) => {
  const schema = {
    user_id: Joi.any(),
    email: Joi.string().min(6).max(255).required().email(),
    firstname: Joi.any(),
    lastname: Joi.any(),
    firstq: Joi.any(),
    secq: Joi.any(),
    password: Joi.string().min(6).max(255).required(),
    password_repeat: Joi.any().valid(Joi.ref("password")).required(),
  };
  return Joi.validate(data, schema);
};

const userLoginValidation = (data) => {
  const schema = {
    email: Joi.string().max(255).required().email(),
    password: Joi.string().max(255).required(),
  };
  return Joi.validate(data, schema);
};

const staffLoginValidation = (data) => {
  const schema = {
    email: Joi.string().max(255).required().email(),
    password: Joi.string().max(255).required(),
  };
  return Joi.validate(data, schema);
};

const validatePassword = (data) => {
  const schema = {
    newpass: Joi.string().min(6).max(255).required(),
    newpass1: Joi.any().valid(Joi.ref("newpass")).required(),
  };
};

module.exports.userRegisterValidation = userRegisterValidation;
module.exports.userLoginValidation = userLoginValidation;
module.exports.staffLoginValidation = staffLoginValidation;
module.exports.validatePassword = validatePassword;
