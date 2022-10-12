const express = require("express");

const router = express.Router();

const job = require("../controllers/job_controllers");

const { isUser } = require("../middleware/authorization");

router.post("/tes", isUser, job.test);

module.exports = router;
