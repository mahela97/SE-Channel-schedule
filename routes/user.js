const router = require("express").Router();

const {
  createUser,
  registerPage,

  userHomePage,
} = require("../controllers/userController");

const { isLoggedin } = require("../middleware/isLogged");
const { isNotLoggedIn } = require("../middleware/isNotLoggedIn");

//Homepage
router.get("/", isLoggedin, userHomePage);

//REGISTER
router.get("/register", isNotLoggedIn, registerPage);
router.post("/register", createUser);

module.exports = router;
