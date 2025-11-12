import db from "../models/index.js";
const Task = db.Task;

export const getTasks = async (req, res) => {
  try {
    const tasks = await Task.findAll({ where: { user_id: req.user.id } });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener las tareas" });
  }
};

export const createTask = async (req, res) => {
  try {
    const { title, description, status } = req.body;
    const task = await Task.create({ title, description, status, user_id: req.user.id });
    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ message: "Error al crear la tarea" });
  }
};

export const updateTask = async (req, res) => {
  try {
    const task = await Task.findOne({ where: { id: req.params.id, user_id: req.user.id } });
    if (!task) return res.status(404).json({ message: "Tarea no encontrada" });
    await task.update(req.body);
    res.json(task);
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar la tarea" });
  }
};

export const deleteTask = async (req, res) => {
  try {
    const task = await Task.findOne({ where: { id: req.params.id, user_id: req.user.id } });
    if (!task) return res.status(404).json({ message: "Tarea no encontrada" });
    await task.destroy();
    res.json({ message: "Tarea eliminada correctamente" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar la tarea" });
  }
};

