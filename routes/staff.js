const router = require("express").Router();
const {
  staffHomepage,
  accountUpdatePage,
  accountUpdate,
} = require("../controllers/staffController");
const channel = require("../controllers/channel");

router.get("/home", staffHomepage);
router.get("/schedule", channel.getschedulel);
router.post("/schedule", channel.schedulel);

router.get("/AddProgram", channel.AddProgram);

router.get("/accountupdates", accountUpdatePage);
router.post("/accountupdates", accountUpdate);
module.exports = router;
