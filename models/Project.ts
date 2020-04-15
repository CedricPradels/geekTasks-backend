import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
  title: { type: String, uniq: true, required: true },
});

const Project = mongoose.model("Project", projectSchema);

export default Project;
