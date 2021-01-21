const router = require("express").Router();
const { loginPageAdmin } = require("../controllers/adminController");

router.get("/", loginPageAdmin);

module.exports = router;
