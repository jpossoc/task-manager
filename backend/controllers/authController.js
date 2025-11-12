require('dotenv').config();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { User } = require('../models');

// 🔹 Generar token JWT
const generateToken = (user) => {
  const payload = { id: user.id, email: user.email };
  const secret = process.env.JWT_SECRET || 'tu_super_secreto_aqui';
  const expiresIn = process.env.JWT_EXPIRES_IN || '7d';
  return jwt.sign(payload, secret, { expiresIn });
};

// 🔹 Registro de usuario
exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password)
      return res.status(400).json({ message: 'name, email and password are required' });

    const exists = await User.findOne({ where: { email } });
    if (exists)
      return res.status(409).json({ message: 'Email already in use' });

    // ✅ Encriptar contraseña antes de guardar
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({ name, email, password: hashedPassword });
    const token = generateToken(user);

    res.status(201).json({
      message: 'Usuario registrado correctamente',
      user: { id: user.id, name: user.name, email: user.email },
      token
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// 🔹 Login de usuario
exports.login = async (req, res) => {
  try {
    console.log("Body recibido:", req.body); // 👈 agrega esto
    const { email, password } = req.body;

    if (!email || !password)
      return res.status(400).json({ message: 'email and password are required' });

    // Buscar usuario por email
    const user = await User.findOne({ where: { email } });
    if (!user)
      return res.status(401).json({ message: 'Invalid credentials' });

    // ✅ Comparar contraseñas con bcrypt
    const valid = await bcrypt.compare(password, user.password);
    if (!valid)
      return res.status(401).json({ message: 'Invalid credentials' });

    const token = generateToken(user);
    res.json({
      message: 'Login exitoso',
      user: { id: user.id, name: user.name, email: user.email },
      token
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};
