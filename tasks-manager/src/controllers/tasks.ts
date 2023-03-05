import { Request, Response, NextFunction } from "express";
import Task from "../models/taskModel";

export async function getAllTasks(req: Request, res: Response) {
  const results = await Task.find({});
  res.json({
    success: true,
    data: results,
  });
}

export async function createTask(req: Request, res: Response) {
  const { task } = req.body;
  const results = await Task.create({ task: task });
  res.json({ success: true, data: results });
}

export async function getSingleTask(req: Request, res: Response) {
  const { taskId } = req.params;
  const result = await Task.find({ _id: taskId });
  res.json({ success: true, data: result });
}

export async function updateTask(req: Request, res: Response) {
  const { taskId } = req.params;
  const { isCompleted, task } = req.body;
  const result = await Task.findByIdAndUpdate(
    taskId,
    {
      isCompleted: isCompleted,
      task: task,
    },
    { new: true }
  );

  res.json({
    success: true,
    data: result,
  });
}

export async function deleteTask(req: Request, res: Response) {
  const { taskId } = req.params;
  const result = await Task.findByIdAndDelete(taskId);
  res.json({ success: true, data: result });
}
