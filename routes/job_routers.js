const express = require("express");

const router = express.Router();

const job = require("../controllers/job_controllers");

const { isUser } = require("../middleware/authorization");

router.get("/getall", isUser, job.getAll);
router.get("/get/:id", isUser, job.getByID);

module.exports = router;
