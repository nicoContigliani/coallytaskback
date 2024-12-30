import Task from '../../models/Task.js';

export const findAllTasks = async () => {
  try {
    return await Task.find();
  } catch (error) {
    console.log("🚀 ~ findAllTasks ~ error:", error)

  }
};

export const findTaskById = async (id) => {
  try {
    return await Task.findById(id);
  } catch (error) {
    console.log("🚀 ~ findTaskById ~ error:", error)

  }
};

export const createNewTask = async (taskData) => {
  try {
    return await Task.create(taskData);
  } catch (error) {
    console.log("🚀 ~ createNewTask ~ error:", error)
  }
};

export const filterTasks = async (filter) => {
  try {
    const tasks = await Task.find(filter);
    return tasks;
  } catch (error) {
    console.error('Error fetching tasks from the database:', error);
    throw new Error('Database query failed.');
  }
};

export const updateTaskById = async (id, updatedData) => {
  try {
    return await Task.findByIdAndUpdate(id, updatedData, { new: true });
  } catch (error) {
    console.log("🚀 ~ updateTaskById ~ error:", error)
  }
};

export const deleteTaskById = async (id) => {
  try {
    const task = await Task.findById(id);
    if (task) {
      await task.deleteOne();
      return true;
    }
    return false;
  } catch (error) {
    console.log("🚀 ~ deleteTaskById ~ error:", error)
  }
};
