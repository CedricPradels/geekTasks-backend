import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true, uniq: true },
  contexts: [{ type: mongoose.Schema.Types.ObjectId, Ref: "Context" }],
  project: { type: mongoose.Schema.Types.ObjectId, Ref: "Category" },
});

const Task = mongoose.model("Task", taskSchema);

export default Task;
