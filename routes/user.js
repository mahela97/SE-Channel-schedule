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
const channel = require("../controllers/channel");
const { render } = require("ejs");
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
router.get("/schedule", channel.getschedulel);
router.post("/schedule", channel.schedulel);
router.get("/timetable", channel.get_channel);
router.get("/timetable/:id", channel.get_channel);
module.exports = router;
