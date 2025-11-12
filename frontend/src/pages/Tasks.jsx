import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Tasks.css";

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const token = localStorage.getItem("token");

  // Cargar tareas al iniciar
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await axios.get("http://localhost:4000/api/tasks", {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        setTasks(res.data);
      } catch (err) {
        console.error("Error al cargar tareas:", err);
        alert("Error al cargar tareas, revisa tu autenticación");
      }
    };
    fetchTasks();
  }, [token]);

  // Crear tarea
  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:4000/api/tasks",
        { title, description, status: false }, // Envía status por defecto
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      setTasks([...tasks, res.data]);
      setTitle("");
      setDescription("");
    } catch (err) {
      console.error(err);
      alert("Error al crear la tarea");
    }
  };

  // Eliminar tarea
  const handleDelete = async (id) => {
    if (!confirm("¿Seguro que deseas eliminar esta tarea?")) return;
    try {
      await axios.delete(`http://localhost:4000/api/tasks/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      setTasks(tasks.filter((t) => t.id !== id)); // Usa id
    } catch (err) {
      console.error(err);
      alert("Error al eliminar la tarea");
    }
  };

  // Actualizar estado (completado / pendiente)
  const toggleComplete = async (task) => {
    try {
      const res = await axios.put(
        `http://localhost:4000/api/tasks/${task.id}`, // Usa id
        { status: !task.status }, // Envía status
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      // Actualiza el estado local (corrección aquí: operador spread correcto)
      setTasks(
        tasks.map((t) =>
          t.id === task.id ? { ...t, status: res.data.status } : t // Corrección: ...t (spread operator)
        )
      );
    } catch (err) {
      console.error(err);
      alert("Error al actualizar tarea");
    }
  };

  return (
    <div className="tasks-container">
      <div className="tasks-header">
        <h1>Mis Tareas</h1>
        <button
          className="logout-btn"
          onClick={() => {
            localStorage.removeItem("token");
            window.location.href = "/";
          }}
        >
          Cerrar sesión
        </button>
      </div>

      <form className="task-form" onSubmit={handleCreate}>
        <input
          type="text"
          placeholder="Título de la tarea"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Descripción"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button type="submit">Agregar</button>
      </form>

      <div className="task-list">
        {tasks.length === 0 ? (
          <p className="no-tasks">No tienes tareas aún 📝</p>
        ) : (
          tasks.map((task) => (
            <div
              key={task.id} // Usa id
              className={`task-card ${task.status ? "completed" : ""}`} // Usa status
            >
              <div className="task-info">
                <h3>{task.title}</h3>
                <p>{task.description}</p>
              </div>
              <div className="task-actions">
                <button onClick={() => toggleComplete(task)}>
                  {task.status ? "Reabrir" : "Completar"} {/* Usa status */}
                </button>
                <button
                  className="delete-btn"
                  onClick={() => handleDelete(task.id)} // Usa id
                >
                  Eliminar
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Tasks;
