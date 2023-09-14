const express = require("express");
const router = express.Router();
const submissionController = require("../controllers/submission");

// Add a new submission
router.post("/add", submissionController.createSubmission);

// Get all submissions for the authenticated user
router.get("/all", submissionController.getAllSubmissions);

// Get a single submission by ID
router.get("/:submissionId", submissionController.getSubmissionById);

router.put("/:submissionId", submissionController.updateSubmission);

router.delete("/:submissionId", submissionController.deleteSubmission);

module.exports = router;
