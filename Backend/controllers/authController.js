const User = require("../models/userModel");
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");

exports.postSignUp = [
  check("userName")
    .trim()
    .isLength({ min: 2 })
    .withMessage("Name must be at least 2 characters long")
    .matches(/^[a-zA-Z0-9_ ]+$/)
    .withMessage("Name can only contain letters, numbers, and underscores"),

  check("email")
    .trim()
    .isEmail()
    .withMessage("Please enter a valid email address"),

  check("password")
    .trim()
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
    )
    .withMessage(
      "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
    ),

  check("confirmPassword")
    .trim()
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Passwords do not match");
      }
      return true;
    }),

  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ message: errors.array()[0].msg });
    }
    try {
      const { userName, email, password } = req.body;
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: "User already exists" });
      } else {
        const hashedPassword = await bcrypt.hash(password, 12);
        const user = new User({ userName, email, password: hashedPassword });
        await user.save();
        res.status(201).json({ message: "User created successfully" });
      }
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "Internal Server Error" });
    }
  },
];

exports.postSignIn = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid password" });
    } else {
      const sessionUser = user.toObject();
      sessionUser._id = sessionUser._id.toString();
      delete sessionUser.password;

      req.session.isLoggedIn = true;
      req.session.user = sessionUser;
      req.session.save((err) => {
        if (err) {
          console.log(err);
          res.status(500).json({ message: "Internal Server Error" });
          return;
        }
        res
          .status(200)
          .json({ message: "Login successful", user: sessionUser });
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.postLogout = async (req, res, next) => {
  try {
    req.session.destroy((err) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ message: "Internal Server Error" });
      }
      res.clearCookie("connect.sid");
      res.status(200).json({ message: "Logout Successfull" });
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.checkSessions = async (req, res, next) => {
  try {
    if (req.session && req.session.user) {
      return res
        .status(200)
        .json({ isAuthenticated: true, user: req.session.user });
    } else {
      return res.status(200).json({ isAuthenticated: false });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
