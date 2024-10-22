const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../../models/user");

//register

const registerUser = async (req, res) => {
  const { userName, email, password } = req.body;
  try {
    const checkUser = await User.findOne({ email });

    if (checkUser)
      return res.json({
        success: false,
        message: "User already exits ",
      });

    const hashPassword = await bcrypt.hash(password, 12);
    const newUser = new User({
      userName,
      email,
      password: hashPassword,
    });

    await newUser.save();
    res.status(200).json({
      success: true,
      message: "Registration successfull",
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "some error occured",
    });
  }
};

//login

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  const checkUser = await User.findOne({ email });

  if (!checkUser)
    return res.json({
      success: false,
      message: "User doesnt exits ! Please register first",
    });

  const checkPasswordMatch = await bcrypt.compare(password, checkUser.password);
  if (!checkPasswordMatch)
    return res.json({
      success: false,
      message: "Incorrect password! Please try again",
    });

  const token = jwt.sign(
    {
      id: checkUser._id,
      role: checkUser.role,
      email: checkUser.email, // we need to pass key here
    },
    "CLIENT_SECRET_KEY",
    { expiresIn: "60m" }
  );

  res.cookie("token", token, { httpOnly: true, secure: false }).json({
    success: true,
    message: "Logged in Successfully",
    user: {
      email: checkUser.email,
      role: checkUser.role,
      id: checkUser._id,
    },
  });
  try {
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "some error occured",
    });
  }
};

//logout

//auth middleware

module.exports = { registerUser, loginUser };
