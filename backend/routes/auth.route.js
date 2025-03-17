const router = require("express").Router();
const auth = require("../controllers/auth.controller");

router.post("/signup", auth.signup).post("/login", auth.login);

module.exports = router;
