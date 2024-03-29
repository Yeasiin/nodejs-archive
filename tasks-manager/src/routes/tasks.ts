import express from "express";
import {
  getAllTasks,
  createTask,
  getSingleTask,
  updateTask,
  deleteTask,
} from "../controllers/tasks";
import catchAsync from "../utils/catchAsync";

const router = express.Router();

router.get("/", catchAsync(getAllTasks));
router.post("/", catchAsync(createTask));
router.get("/:taskId", catchAsync(getSingleTask));
router.patch("/:taskId", catchAsync(updateTask));
router.delete("/:taskId", catchAsync(deleteTask));

export default router;
