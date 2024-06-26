const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    let user = await User.findOne({ $or: [{ email }, { username }] });

    if (user) {
      return res.status(400).json({ msg: "User already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    let hash = await bcrypt.hash(password, salt);

    user = await User.create({
      ...req.body,
      password: hash,
    });
    const payload = {
      user: {
        id: user._id,
      },
    };

    jwt.sign(payload, "yoursecretkey", { expiresIn: 3600 }, (err, token) => {
      if (err) throw err;
      res.json({
        token,
        _id: user._id,
        username: user.username,
        pfp: user.pfp,
        email,
      });
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};
const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ msg: "Invalid Credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid Credentials" });
    }

    const payload = {
      user: {
        id: user._id,
      },
    };

    jwt.sign(payload, "yoursecretkey", { expiresIn: 3600 }, (err, token) => {
      if (err) throw err;
      res.json({
        token,
        _id: user._id,
        username: user.username,
        pfp: user.pfp,
        email,
      });
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

module.exports = {
  register,
  login,
};
