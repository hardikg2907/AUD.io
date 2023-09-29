const Submission = require("../models/submission");

exports.getEditAccessRequests = async (req, res) => {
  try {
    const userId = req.params.userId;

    // Find submissions where the current user is the owner and there are edit access requests
    const submissions = await Submission.find({
      userId: userId,
      requests: { $not: { $size: 0 } },
    }).populate("requests", "username"); // Populate the requesting users

    const requests = [];

    for (const submission of submissions) {
      for (const request of submission?.requests) {
        requests.push({
          username: request?.username,
          userId: request?._id,
          submission: {
            name: submission?.name,
            _id: submission?._id,
          },
        });
      }
    }

    res.status(200).json(requests);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};
