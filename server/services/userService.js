const User = require("../models/User");

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

module.exports = { registerUser };
