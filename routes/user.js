const router = require("express").Router();

const { userHomePage } = require("../controllers/userController");

const { isLogged } = require("../middleware/isLogged");

//Homepage
router.get("/home", isLogged, userHomePage);

router.get("/addfeedback", channel.get_program);
router.get("/timetable/:id", channel.get_channel);
router.get("/addfeedback/:id", channel.get_program);
router.post("/addfeedback/:id", channel.addfeedback);
module.exports = router;
