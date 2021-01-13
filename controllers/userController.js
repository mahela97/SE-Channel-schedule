const { createRegisteredUser } = require("../models/userModel");
const { registerValidation } = require("./validator/validate");
const bcrypt = require("bcryptjs");

module.exports = {
  registerPage: (req, res) => {
    res.render("login_register");
  },

  createUser: async (req, res) => {
    const body = req.body;
    console.log(body);
    const { error } = registerValidation(req.body);
    if (error) {
      return res.json({ err: error.details[0].message });
    }
    const salt = await bcrypt.genSalt(10);
    body.password = await bcrypt.hash(body.password, salt);
    createRegisteredUser(body, (err, result) => {
      if (err) {
        console.log(err);
      } else {
        return res.json({
          success: true,
          data: result,
        });
      }
    });
  },
};
