import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true, uniq: true },
  categories: [{ type: mongoose.Schema.Types.ObjectId, Ref: "Category" }],
  project: { type: mongoose.Schema.Types.ObjectId, Ref: "Category" },
});

const Task = mongoose.model("Task", taskSchema);

export default Task;
