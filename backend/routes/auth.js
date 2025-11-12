import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import db from "../models/index.js";

const router = express.Router();
const User = db.User;

// Registro de usuario
router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password)
      return res.status(400).json({ message: "Todos los campos son obligatorios" });

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser)
      return res.status(400).json({ message: "El usuario ya existe" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({ name, email, password: hashedPassword });

    res.status(201).json({ message: "Usuario registrado exitosamente", user: newUser });
  } catch (error) {
    console.error("Error en /register:", error);
    res.status(500).json({ message: "Error al registrar usuario" });
  }
});

// Login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(400).json({ message: "Usuario no encontrado" });

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid)
      return res.status(400).json({ message: "Contraseña incorrecta" });

    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET || "secret_key",
      { expiresIn: "1h" }
    );

    res.json({ message: "Login exitoso", token });
  } catch (error) {
    console.error("Error en /login:", error);
    res.status(500).json({ message: "Error al iniciar sesión" });
  }
});

export default router;
