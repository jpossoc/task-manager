import { Link } from "react-router-dom";
import "./Home.css"; // Importamos el CSS personalizado

export default function Home() {
  return (
    <div className="home-container">
      <h1 className="home-title">Bienvenido a Task Manager</h1>
      <div className="home-buttons">
        <Link to="/login" className="btn btn-login">
          Iniciar Sesión
        </Link>
        <Link to="/register" className="btn btn-register">
          Registrarse
        </Link>
      </div>
    </div>
  );
}
