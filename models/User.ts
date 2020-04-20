import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: { type: String },
  email: { type: String, unique: true },
  hash: { type: String },
  salt: { type: String },
  token: { type: String },
});

const User = mongoose.model("User", userSchema);

export default User;
