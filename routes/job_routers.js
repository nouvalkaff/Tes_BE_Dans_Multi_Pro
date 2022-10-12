const express = require("express");

const router = express.Router();

const job = require("../controllers/job_controllers");

const { isUser } = require("../middleware/authorization");

router.post("/getall", isUser, job.getAll);

module.exports = router;
