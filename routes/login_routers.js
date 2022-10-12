const express = require("express");

const router = express.Router();

const login = require("../controllers/login_controllers");

router.post("/user", login.login);

module.exports = router;
