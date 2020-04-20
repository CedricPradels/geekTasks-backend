import mongoose from "mongoose";

const contextSchema = new mongoose.Schema({
  title: { type: String, required: true },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

const Context = mongoose.model("Context", contextSchema);

export default Context;
