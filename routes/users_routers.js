const express = require("express");

const router = express.Router();

const user = require("../controllers/user_controllers");

router.get("/getall", user.getAllUser);

router.get("/id/:id", user.getUserById);

router.post("/create", user.createUser);

router.patch("/update/:id", user.updateUser);

router.delete("/delete/:id", user.deleteUser);

module.exports = router;
