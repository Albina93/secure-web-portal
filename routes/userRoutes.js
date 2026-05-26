const router = require("express").Router();
const bcrypt = require("bcrypt");
const User = require("../models/User");
const Bookmark = require("../models/Bookmark");
const { signToken } = require("../utils/auth");

router.post("/register", async (req, res) => {
  try {
    //pull email & password from req.body
    const { email, password } = req.body;
    // validate they exist
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }
    // check for duplicate email
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "Email already in use" });
    }
    // hash password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // create user
    const newUser = await User.create({ email, password: hashedPassword });
    // sign token
    const token = signToken(newUser);
    // send response
    res
      .status(201)
      .json({ token, user: { id: newUser._id, email: newUser.email } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error during registration." });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    // validate they exist
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    // find the user by email
    const user = await User.findOne({ email });
    // if no user found...
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = signToken(user);
    res.json({ token, user: { id: user._id, email: user.email } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error during login" });
  }
});

module.exports = router;
