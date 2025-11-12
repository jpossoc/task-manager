import express from "express";
import cors from "cors";
import db from "./models/index.js";
import taskRoutes from "./routes/tasks.js";
import userRoutes from "./routes/auth.js";

const app = express();
app.use(cors());
app.use(express.json());

// Rutas
app.use("/api/tasks", taskRoutes);
app.use("/api/users", userRoutes);
app.use(express.urlencoded({ extended: true }));

// Sincronizar base de datos (solo la primera vez usa { force: true })
db.sequelize.sync().then(() => {
  console.log("🗄️ Base de datos sincronizada correctamente");
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () =>
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`)
);
