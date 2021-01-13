const router = require("express").Router();

const { createUser, registerPage } = require("../controllers/userController");

//GET REGISTER
router.get("/register", registerPage);

router.post("/register", createUser);

module.exports = router;
