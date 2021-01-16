const { findUserByEmail } = require("../models/userModel");
const { userLoginValidation } = require("./validator/validate");
const bcrypt = require("bcryptjs");

module.exports = {
  //RENDER LOGIN PAGE

  loginPage: (req, res) => {
    res.render("login", {
      error: req.query.error,
      email: req.query.email,
    });
  },

  loginUser: async (req, res) => {
    const body = req.body;
    console.log(body);
    const { error } = userLoginValidation(req.body);
    if (error) {
      return res.redirect(`login?error=${error}&email=${body.email}`);
    }
    const user = await findUserByEmail(body.email);
    if (!user) {
      return res.redirect(`login?error=User is not exist&email=${body.email}`);
    }
    const { email, password, type } = user;

    const validPass = await bcrypt.compareSync(body.password, password);

    if (!validPass) {
      return res.redirect(
        `login?error=Email or Password is incorrect
        &email=${body.email}`
      );
    }
    req.session.user_id = email;
    req.session.type = type;
    console.log("here", req.session);
    return res.redirect(`/`);
  },

  //LogOut user
  logOut: (req, res) => {
    req.session.user_id = null;
    req.session.type = null;
    return res.redirect("/login");
  },
};
