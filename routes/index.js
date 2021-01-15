const express = require("express");
const router = express.Router();
const user = require("./user");
const staff = require("./staff");

router.use("/", user);
router.use("/staff", staff);

module.exports = router;
