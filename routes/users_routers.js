const express = require("express");

const router = express.Router();

const user = require("../controllers/user_controllers");

// router.get("/userPayment/getAll", user.getAllUserPayment);

// router.get("/userPayment", user.getUserPaymentById);

router.post("/create", user.createUser);

// router.put("/userPayment/upd", user.updateUserPayment);

// router.delete("/userPayment/del", user.deleteUserPayment);

module.exports = router;
