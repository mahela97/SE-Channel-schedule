const express = require("express");
const router = express.Router();
const user = require("./user");
const staff = require("./staff");
const {
  loginPage,
  loginUser,
  logOut,
  recoverPage,
  getEmail,
  checkPage,
  matchQuestions,
} = require("../controllers/indexController");

const { registerPage, createUser } = require("../controllers/userController");

const { isLogged } = require("../middleware/isLogged");
const { isNotLoggedIn } = require("../middleware/isNotLoggedIn");
const { whatType } = require("../middleware/whatType");

//INDEX
router.get("/", isLogged, whatType);

//ACCOUNT RECOVERY
router.get("/forgotpw", recoverPage);
router.post("/forgotpw", getEmail);

//QUESTION PAGE
router.get("/check", checkPage);
router.post("/check", matchQuestions);

//LOGIN
router.get("/login", isNotLoggedIn, loginPage);
router.post("/login", loginUser);

//REGISTER
router.get("/register", isNotLoggedIn, registerPage);
router.post("/register", createUser);

//LOGOUT
router.get("/logout", logOut);

router.use("/user", user);
router.use("/staff", staff);

module.exports = router;
