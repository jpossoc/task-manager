# 🗂️ Task Manager

Aplicación **Full Stack** para la gestión de tareas personales.  
El proyecto está dividido en dos partes principales:

- **Backend:** Node.js con Express, Sequelize y SQLite.
- **Frontend:** React con Vite.

---

## 🚀 Características principales

### 🔧 Backend
- API REST desarrollada con **Express**.
- Autenticación con **JWT** (JSON Web Token).
- Base de datos **SQLite** mediante **Sequelize ORM**.
- Control de usuarios y tareas asociados al usuario autenticado.
- Rutas protegidas para CRUD de tareas.

### 💻 Frontend
- Interfaz creada con **React + Vite**.
- Autenticación integrada con JWT.
- Sistema de registro e inicio de sesión.
- Creación, edición, completado y eliminación de tareas.
- Estilo moderno con **CSS personalizado** y diseño **responsive**.

---

## 🏗️ Estructura del proyecto

task-manager/

│

├── backend/ # Servidor Express + Sequelize

│ ├── models/ # Definición de modelos Sequelize

│ ├── routes/ # Endpoints de la API

│ ├── controllers/ # Lógica del negocio (CRUD)

│ ├── middlewares/ # Autenticación JWT

│ └── server.js # Punto de entrada del backend

│
└── frontend/ # Aplicación React (Vite)

├── src/

│ ├── pages/ # Páginas principales (Home, Login, Register, Tasks)

│ ├── api/ # Conexión con el backend

│ └── App.jsx # Estructura principal

└── vite.config.js


---

## ⚙️ Instalación y ejecución

### 🔩 1. Clonar el repositorio

```bash
git clone https://github.com/jpossoc/task-manager.git
cd task-manager
🧠 2. Instalar dependencias del backend
bash
Copiar código
cd backend
npm install
Esto instalará Express, Sequelize, JWT y SQLite3, entre otros.

🧱 3. Ejecutar el backend
bash
Copiar código
npm start
Por defecto, el servidor correrá en:
👉 http://localhost:4000

🎨 4. Instalar dependencias del frontend
Abre otra terminal y ejecuta:

bash
Copiar código
cd ../frontend
npm install
🧭 5. Ejecutar el frontend
bash
Copiar código
npm run dev
La aplicación estará disponible en:
👉 http://localhost:5173

🔐 Variables de entorno
Crea un archivo .env dentro de la carpeta backend/ con el siguiente contenido:

env
Copiar código
JWT_SECRET=tu_secreto_seguro
PORT=4000
Si deseas usar otra base de datos, puedes configurar Sequelize en config/database.js.

🧩 Endpoints principales
Método	Ruta	Descripción	Protección
POST	/api/register	Crea un nuevo usuario	❌
POST	/api/login	Inicia sesión y devuelve un token JWT	❌
GET	/api/tasks	Obtiene todas las tareas del usuario	✅
POST	/api/tasks	Crea una nueva tarea	✅
PUT	/api/tasks/:id	Actualiza una tarea existente	✅
DELETE	/api/tasks/:id	Elimina una tarea	✅

✅ = requiere token JWT válido

🤝 Contribuciones
Si deseas contribuir:

Haz un fork del repositorio.

Crea una nueva rama con tu mejora:

bash
Copiar código
git checkout -b feature/nueva-funcionalidad
Realiza tus cambios y súbelos:

bash
Copiar código
git commit -m "Agrega nueva funcionalidad"
git push origin feature/nueva-funcionalidad
Abre un Pull Request 🚀

🧑‍💻 Autor
Johan Sebastián Posso
GitHub


