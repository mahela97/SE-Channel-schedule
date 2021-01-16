const express = require("express");
const router = express.Router();
const user = require("./user");
const staff = require("./staff");
const { loginPage } = require("../controllers/indexController");

router.get("/", loginPage);
router.use("/user", user);
router.use("/staff", staff);

module.exports = router;
