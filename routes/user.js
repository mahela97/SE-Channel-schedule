const router = require("express").Router();

const {
  createUser,
  registerPage,
  loginPage,
  loginUser,
  userHomePage,
  logOut,
} = require("../controllers/userController");

const { isLoggedin } = require("../middleware/isLogged");
const { isNotLoggedIn } = require("../middleware/isNotLoggedIn");

//Homepage
router.get("/", isLoggedin, userHomePage);

//REGISTER
router.get("/register", isNotLoggedIn, registerPage);
router.post("/register", createUser);

//LOGIN
router.get("/login", isNotLoggedIn, loginPage);
router.post("/login", loginUser);

//LOGOUT
router.get("/logout", logOut);

module.exports = router;
