const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      minlength: 8,
    },
    githubId: {
      type: String,
      unique: true,
      sparse: true,
    },
    username: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true },
);
const User = model("User", userSchema);

module.exports = User;
