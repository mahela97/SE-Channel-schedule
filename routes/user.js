const router = require("express").Router();

const {
  userHomePage,
  accountUpdatePage,
} = require("../controllers/userController");

const { isLogged } = require("../middleware/isLogged");
const channel = require("../controllers/channel");

//Homepage
router.get("/home", isLogged, userHomePage);
router.get("/user", isLogged, userHomePage);

router.get("/timetable", channel.get_channel);
router.get("/accountupdates-user", accountUpdatePage);

router.get("/addfeedback", channel.get_program);
router.get("/timetable/:id", channel.get_channel);
router.get("/addfeedback/:id", channel.get_program);
router.post("/addfeedback/:id", channel.addfeedback);
module.exports = router;
