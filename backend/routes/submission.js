const express = require("express");
const router = express.Router();
const submissionController = require("../controllers/submission");

// Add a new submission
router.post("/add", submissionController.createSubmission);

// Get all submissions for the authenticated user
router.get("/all/:userId", submissionController.getAllSubmissions);

// Get a single submission by ID
router.get("/:submissionId/:userId", submissionController.getSubmissionById);

router.put("/:submissionId/:userId", submissionController.updateSubmission);

router.delete("/:submissionId/:userId", submissionController.deleteSubmission);

router.get("/discover", submissionController.discover);

module.exports = router;
