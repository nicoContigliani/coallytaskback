import Task from '../models/Task.js';

export const findAllTasks = async () => {
  return await Task.find();
};

export const findTaskById = async (id) => {
  return await Task.findById(id);
};

export const createNewTask = async (taskData) => {
  return await Task.create(taskData);
};

export const updateTaskById = async (id, updatedData) => {
  return await Task.findByIdAndUpdate(id, updatedData, { new: true });
};

export const deleteTaskById = async (id) => {
  const task = await Task.findById(id);
  if (task) {
    await task.deleteOne();
    return true;
  }
  return false;
};
