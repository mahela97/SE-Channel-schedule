const router = require("express").Router();
const { staffHomepage } = require("../controllers/staffController");

router.get("/home", staffHomepage);

module.exports = router;
