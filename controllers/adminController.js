const { userLoginValidation } = require("./validator/validate");
const {
  findAdmin,
  createAdmin,
  getChannel,
  addChannel,
} = require("../models/adminModel");
const bcrypt = require("bcryptjs");

module.exports = {
  //ADMIN LOGIN PAGE
  loginPageAdmin: (req, res) => {
    res.render("admin/login");
  },

  //LOGIN ADMIN
  loginAdmin: async (req, res) => {
    const body = req.body;
    const { error } = userLoginValidation(req.body);
    if (error) {
      console.log(error);
      return res.redirect(
        `admin?error=${error.details[0].message.toUpperCase()}&email=${
          body.email
        }`
      );
    }
    try {
      user = await findAdmin(body.email);
      if (!user) {
        return res.redirect(`admin?error=Incorrect email=${body.email}`);
      }
      const { email, password, type } = user;

      const validPass = await bcrypt.compareSync(body.password, password);

      if (!validPass) {
        return res.redirect(
          `admin?error=Email or Password is incorrect
        &email=${body.email}`
        );
      }
      req.session.user_id = email;
      req.session.type = type;
      return res.redirect(`admin/home`);
    } catch (err) {
      return res.redirect(
        `admin?error=Cannot connect to the database. Try Again.&email=${body.email}`
      );
    }
  },

  //Registering a admin
  addAdmin: async (req, res) => {
    console.log(req.body);
    const body = req.body;
    const { error } = userLoginValidation(req.body);
    if (error) {
      return res.send(error.details[0].message.toUpperCase());
    }

    const salt = await bcrypt.genSalt(10);
    body.password = await bcrypt.hash(body.password, salt);

    createAdmin(body, (err, result) => {
      if (err) {
        if (err.code == "ER_DUP_ENTRY") {
          return res.send(`Email is already exist`);
        } else {
          return res.send(`Cannot connect to the database.`);
        }
      } else {
        return res.send("success");
      }
    });
  },

  //RENDERING ADMIN HOMEPAGE
  adminHomepage: (req, res) => {
    return res.render("admin/home-admin");
  },

  //RENDER ADMIN CHANNEL LIST
  channelListPage: (req, res) => {
    return res.render("admin/channellist");
  },

  //RENDER ADMIN ADD CHANNEL
  addChannelPage: (req, res) => {
    return res.render("admin/addchannel");
  },

  //ADD CHANNEL
  adminAddChannel: async (req, res) => {
    const body = req.body;
    console.log(body);
    const result = await getChannel(body.channelname);
    console.log(result);
    if (result.channel_id) {
      res.redirect(`addchannel?error=Use an another name please.`);
    } else {
      try {
        const status = await addChannel(body);
        console.log(status);
        res.redirect(`addchannel?Success`);
      } catch (err) {
        console.log(err);
        res.redirect(`addchannel?error`);
      }
    }
  },

  //RENDER ACCOUNT UPDATES
  accountUpdatePage: (req, res) => {
    return res.render("admin/accountupdates");
  },

  //RENDER ADD STAFF ACCOUNT
  addStaffPage: (req, res) => {
    return res.render("admin/account");
  },
};
