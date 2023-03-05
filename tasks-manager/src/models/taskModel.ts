import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
  task: String,
  isCompleted: { type: Boolean, default: false },
});

const Task = mongoose.model("Task", taskSchema);

export default Task;
