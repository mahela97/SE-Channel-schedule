const router = require("express").Router();

const { userHomePage } = require("../controllers/userController");

const { isLogged } = require("../middleware/isLogged");

//Homepage
router.get("/home", isLogged, userHomePage);

module.exports = router;
