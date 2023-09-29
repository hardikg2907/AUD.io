const Submission = require("../models/submission");

exports.getEditAccessRequests = async (req, res) => {
  try {
    const userId = req.params.userId;

    // Find submissions where the current user is the owner and there are edit access requests
    const submissions = await Submission.find({
      userId: userId,
      requests: { $exists: true, $not: { $size: 0 } },
    })
      .populate("requests", "name") // Populate the requesting users
      .exec();

    res.status(200).json(submissions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};
