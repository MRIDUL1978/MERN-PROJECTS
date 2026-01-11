const PasswordList = require("../models/passwordListmodel");
const { encrypt, decrypt } = require("../utils/encryption");

exports.addPassword = async (req, res, next) => {
  try {
    const { siteName, password } = req.body;
    const encryptedPassword = encrypt(password);
    const passwordList = new PasswordList({
      siteName,
      password: encryptedPassword,
      user: req.session.user._id,
    });
    await passwordList.save();
    res
      .status(201)
      .json({
        _id: passwordList._id,
        siteName: passwordList.siteName,
        password,
      });
  } catch (err) {
    console.log("Error saving password", err);
    res.status(500).json({ error: err });
  }
};

exports.getAllPasswords = async (req, res, next) => {
  try {
    const passwordList = await PasswordList.find({
      user: req.session.user._id,
    });
    const decryptedPassword = passwordList.map((item) => {
      return {
        _id: item._id,
        siteName: item.siteName,
        password: decrypt(item.password),
      };
    });
    res.status(200).json(decryptedPassword);
  } catch (err) {
    console.log("Error fetching password", err);
    res.status(500).json({ error: err });
  }
};

exports.updatePassword = async (req, res, next) => {
  try {
    const id = req.params.id;
    const { siteName, password } = req.body;
    const encryptedPassword = encrypt(password);
    const passwordList = await PasswordList.findOneAndUpdate(
      { _id: id, user: req.session.user._id },
      { siteName, password: encryptedPassword },
      { new: true }
    );
    res.status(200).json({ _id: passwordList._id, siteName, password });
  } catch (err) {
    console.log("Error updating password", err);
    res.status(500).json({ error: err });
  }
};

exports.deletePassword = async (req, res, next) => {
  try {
    const id = req.params.id;
    const passwordList = await PasswordList.findOneAndDelete({
      _id: id,
      user: req.session.user._id,
    });
    res.status(200).json({ _id: passwordList._id });
  } catch (err) {
    console.log("Error deleting password", err);
    res.status(500).json({ error: err });
  }
};
