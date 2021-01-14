const {
  createRegisteredUser,
  findUserByEmail,
} = require("../models/userModel");

const { registerValidation, loginValidation } = require("./validator/validate");

const bcrypt = require("bcryptjs");

module.exports = {
  //User Homepage
  userHomePage: (req, res) => {
    res.render("user/home-user");
  },

  //Rendering login page
  loginPage: (req, res) => {
    res.render("login", {
      error: req.query.error,
      email: req.query.email,
    });
  },

  //Login page
  loginUser: async (req, res) => {
    const body = req.body;
    console.log(body);
    const { error } = loginValidation(req.body);
    if (error) {
      return res.redirect(`login?error=${error}&email=${body.email}`);
    }
    const user = await findUserByEmail(body.email);
    if (!user) {
      return res.redirect(`login?error=User is not exist&email=${body.email}`);
    }
    const { email, password } = user;

    const validPass = await bcrypt.compareSync(body.password, password);

    if (!validPass) {
      return res.redirect(
        `login?error=Email or Password is incorrect
        &email=${body.email}`
      );
    }
    req.session.user_id = body.email;
    return res.redirect(`/`);
  },

  //LogOut user
  logOut: (req, res) => {
    req.session.user_id = null;
    return res.redirect("/login");
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
    const { error } = registerValidation(req.body);
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
