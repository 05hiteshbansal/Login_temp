const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  name: {
    type: String,
  },
  googleId: {
    type: String,
  },
  email: {
    type: String,
  },
});

module.exports = mongoose.model("users", userSchema);
