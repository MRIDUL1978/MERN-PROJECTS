const mongoose = require("mongoose");

const passwordListSchema = new mongoose.Schema({
  siteName: {
    type: String,
    required: true,
  },
  password: {
    iv: String,
    content: String,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

module.exports = mongoose.model("PasswordList", passwordListSchema);
