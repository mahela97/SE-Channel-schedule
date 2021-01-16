const { createRegisteredUser } = require("../models/userModel");

const { userRegisterValidation } = require("./validator/validate");

const bcrypt = require("bcryptjs");

module.exports = {
  //User Homepage
  userHomePage: (req, res) => {
    res.render("user/home-user");
  },

  //Rendering the register page
  registerPage: (req, res) => {
    res.render("register", {
      error: req.query.error,
      username: req.query.email,
      email: req.query.email,
    });
  },

  //Registering a user
  createUser: async (req, res) => {
    const body = req.body;
    const { error } = userRegisterValidation(req.body);
    if (error) {
      return res.redirect(
        `register?error=${error.details[0].message}
        &email=${req.body.email}
        &user_id=${req.body.user_id}`
      );
    }

    const salt = await bcrypt.genSalt(10);
    body.password = await bcrypt.hash(body.password, salt);

    createRegisteredUser(body, (err, result) => {
      if (err) {
        if (err.code == "ER_DUP_ENTRY") {
          return res.redirect(
            `register?error=Email is already exist&email=${body.email}&user_id=${body.user_id}`
          );
        }
      } else {
        return res.redirect("/login");
      }
    });
  },
};
