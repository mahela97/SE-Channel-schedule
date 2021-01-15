const router = require("express").Router();
const {
  staffLogin,
  staffLoginPage,
} = require("../controllers/staffController");

//STAFF LOGIN
router.get("/login", staffLoginPage);
router.post("/login", staffLogin);

module.exports = router;
