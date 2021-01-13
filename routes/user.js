const router = require("express").Router();

const { createUser, registerPage } = require("../controllers/userController");

//GET REGISTER
router.get("/login_register", registerPage);

router.post("/login_register", createUser);

module.exports = router;
