import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  contexts: [
    { type: mongoose.Schema.Types.ObjectId, Ref: "Context", required: true },
  ],
  project: { type: mongoose.Schema.Types.ObjectId, Ref: "Category" },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

const Task = mongoose.model("Task", taskSchema);

export default Task;
