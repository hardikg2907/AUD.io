const User = require("../models/user");

// Create a new submission
exports.createSubmission = async (req, res) => {
  // Extract submission data from the request body
  const { name, audioFile, genre, artist, description, releaseDate, duration } =
    req.body;

  try {
    // Find the authenticated user by their ID
    const user = await User.findById(req.body.userId);

    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    // Create a new submission object
    const newSubmission = {
      name,
      audioFile,
      genre,
      artist,
      description,
      releaseDate,
      duration,
    };

    // Add the new submission to the user's submissions array
    user.submissions.push(newSubmission);

    // Save the user document with the new submission
    await user.save();

    res.json(user.submissions);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

// Get all submissions for the authenticated user
exports.getAllSubmissions = async (req, res) => {
  try {
    const user = await User.findById(req.body.userId);

    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    res.json(user.submissions);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

// Get a single submission by ID
exports.getSubmissionById = async (req, res) => {
  const { submissionId } = req.params;

  try {
    const user = await User.findById(req.body.userId);

    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    const submission = user.submissions.id(submissionId);

    if (!submission) {
      return res.status(404).json({ msg: "Submission not found" });
    }

    res.json(submission);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

// Update a submission by ID
exports.updateSubmission = async (req, res) => {
  const { submissionId } = req.params;

  try {
    const user = await User.findById(req.body.userId);
    const submissionBody = req.body;
    delete submissionBody.userId;

    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    let submission = user.submissions.id(submissionId);

    if (!submission) {
      return res.status(404).json({ msg: "Submission not found" });
    }

    // Update submission fields (example: updating the name)
    if (req.body.name) {
      submission.name = req.body.name;
    }
    if (req.body.audioFile) {
      submission.audioFile = req.body.audioFile;
    }
    if (req.body.genre) {
      submission.genre = req.body.genre;
    }
    await user.save();

    res.json(submission);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

// Delete a submission by ID
exports.deleteSubmission = async (req, res) => {
  const { submissionId } = req.params;

  try {
    const user = await User.findById(req.body.userId);

    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    user.submissions.pull(submissionId); // Remove the submission by its ID

    await user.save();

    res.json(user.submissions);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};
