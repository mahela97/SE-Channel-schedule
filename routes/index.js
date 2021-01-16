const express = require("express");
const router = express.Router();
const user = require("./user");
const staff = require("./staff");
const {
  loginPage,
  loginUser,
  logOut,
} = require("../controllers/indexController");

const { isLogged } = require("../middleware/isLogged");
const { isNotLoggedIn } = require("../middleware/isNotLoggedIn");
const { whatType } = require("../middleware/whatType");

//INDEX
router.get("/", isLogged, whatType);

//LOGIN
router.get("/login", isNotLoggedIn, loginPage);
router.post("/login", loginUser);

//LOGOUT
router.get("/logout", logOut);

router.use("/user", user);
router.use("/staff", staff);

module.exports = router;
