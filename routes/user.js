const router = require("express").Router();

const {
  createUser,
  registerPage,
  userHomePage,
} = require("../controllers/userController");

const { isLogged } = require("../middleware/isLogged");
const { isNotLoggedIn } = require("../middleware/isNotLoggedIn");

//Homepage
router.get("/home", isLogged, userHomePage);

module.exports = router;
