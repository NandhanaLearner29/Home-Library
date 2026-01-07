const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const registerUser = async (req, res) => {
  try {
    const { email, userName, password } = req.body;
    const userExists = await User.findOne({ userName });

    const emailExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({ message: "User Already Exist" });
    }

    if (emailExists) {
      return res.status(400).json({ message: "Email Already Exist" });
    }

    const user = await User.create({
      userName,
      email,
      password,
    });

    res
      .status(201)
      .json({ message: "User Successfully Registered!", user_id: user._id });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Error in User Registration" });
  }
};

const loginUser = async (req, res) => {
  try {
    const { identifier, password } = req.body;

    const user = await User.findOne({
      $or: [{ email: identifier }, { userName: identifier }],
    });

    if (!user) {
      return res.status(400).json({ message: "User Name/Email doesn't exist" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Password doesn't match" });
    }

    const token = jwt.sign({ user_id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    return res.status(200).json({ message: "Login Successfull", token });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Error in User Sign in" });
  }
};

module.exports = { registerUser, loginUser };
