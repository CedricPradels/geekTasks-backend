import mongoose from "mongoose";

const contextSchema = new mongoose.Schema({
  title: { type: String, required: true },
});

const Context = mongoose.model("Context", contextSchema);

export default Context;
