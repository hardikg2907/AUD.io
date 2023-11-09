const User = require("../models/user");
const Submission = require("../models/submission");

// Create a new submission
exports.createSubmission = async (req, res) => {
  // Extract submission data from the request body
  // const {
  //   name,
  //   audioFile,
  //   genre,
  //   artist,
  //   description,
  //   releaseDate,
  //   duration,
  //   private,
  //   userId,
  // } = req.body;
  try {
    // Find the authenticated user by their ID
    let user = await User.find({ _id: req.body.userId });
    user = user[0];
    // console.log(user);
    // console.log(req.body);

    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    // Create a new submission object
    const newSubmission = await Submission.create({
      ...req.body,
    });

    // Add the new submission to the user's submissions array
    if (!user.submissions) user.submissions = [];
    user.submissions.push(newSubmission._id);

    // Save the user document with the new submission
    await user.save();

    res.json(newSubmission);
  } catch (err) {
    // console.error(err.message);
    res.status(500).send("Server Error");
  }
};

// Get all submissions for the authenticated user
exports.getAllSubmissions = async (req, res) => {
  // console.log(req.params);
  try {
    const user = await User.findOne({ _id: req.params.userId }).populate(
      "submissions"
    );

    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    res.json(user.submissions);
  } catch (err) {
    // console.error(err.message);
    res.status(500).send("Server Error");
  }
};

// Get a single submission by ID
exports.getSubmissionById = async (req, res) => {
  const { userId, submissionId } = req.params;
  // console.log(req.params);
  try {
    const user = await User.findById(userId);
    const submission = await Submission.findById(submissionId);

    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }
    if (
      !submission ||
      (submission.private &&
        submission.userId.toString() !== user._id.toString())
    ) {
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
  const { userId, submissionId } = req.params;

  try {
    const user = await User.findById(userId);
    let submission = await Submission.findById(submissionId);

    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }
    if (!submission) {
      return res.status(404).json({ msg: "Submission not found" });
    }

    submission = await Submission.findByIdAndUpdate(submissionId, req.body);

    await user.save();

    res.json(user.submissions);
  } catch (err) {
    // console.error(err.message);
    res.status(500).send("Server Error");
  }
};

// Delete a submission by ID
exports.deleteSubmission = async (req, res) => {
  const { userId, submissionId } = req.params;

  try {
    const user = await User.findById(userId).populate("submissions");

    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    const submission = await Submission.findByIdAndDelete(submissionId);

    user.submissions.pull(submissionId); // Remove the submission by its ID

    await user.save();

    res.json(submission);
  } catch (err) {
    // console.error(err.message);
    res.status(500).send("Server Error");
  }
};

exports.discover = async (req, res) => {
  try {
    let submissions = [];
    if (req.query) {
      submissions = await Submission.find({
        private: false,
        name: { $regex: req.query.name, $options: "i" },
      }).populate("userId"); // Populate the user field with the username
    } else {
      submissions = await Submission.find({ private: false }).populate(
        "userId"
      ); // Populate the user field with the username
    }

    res.json(submissions);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

exports.requestEditAccess = async (req, res) => {
  const { submissionId } = req.params;
  const { userId } = req.body;
  try {
    const submission = await Submission.findByIdAndUpdate(
      submissionId,
      {
        $push: { requests: userId },
      },
      { new: true }
    );

    res.json(submission);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.giveEditAccess = async (req, res) => {
  try {
    const { submissionId, userId } = req.params;
    const { status } = req.body;

    const submission = await Submission.findById(submissionId);

    if (!submission) {
      return res.status(404).json({ message: "Submission not found" });
    }

    // if (submission.userId.toString() !== req.user.id) {
    //   return res.status(403).json({ message: 'Permission denied' });
    // }

    if (submission.requests.includes(userId)) {
      // Grant edit access
      if (status === "accepted") submission.editAccess.push(userId);
      // Remove the request after approval
      submission.requests = submission.requests.filter(
        (requestingUserId) => requestingUserId.toString() !== userId
      );

      await submission.save();

      res.status(200).json({ message: `Edit access ${status} successfully` });
    } else {
      res.status(404).json({ message: "Edit access request not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.toggleLike = async (req, res) => {
  const { submissionId } = req.params;
  const { userId } = req.body;
  try {
    // Search in submission likedByUser Array. If userId not found, Add like else remove like
    const submission = await Submission.findById(submissionId);
    const user = await User.findById(userId);

    if (submission.likedByUser.includes(userId)) {
      submission.likedByUser = submission.likedByUser.filter(
        (e) => e.toString() !== userId
      );
      user.liked = user.liked.filter((e) => e.toString() !== submissionId);

      await Promise.all([submission.save(), user.save()]);
    } else {
      submission.likedByUser.push(userId);
      user.liked.push(submissionId);
      await Promise.all([submission.save(), user.save()]);
    }

    // res.status(200).json({ message: `Added/Removed from Favourites` });
    res.status(200).json(user.liked);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.likedSongs = async (req, res) => {
  const { userId } = req.params;
  try {
    console.log(userId);
    const user = await User.findOne({ _id: userId }).populate({
      path: "liked",
      populate: "userId",
    });

    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    res.status(200).json(user.liked);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};
