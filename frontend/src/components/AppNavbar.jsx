import React from 'react';
import { Link, NavLink } from 'react-router-dom';

// Usamos Link y NavLink de react-router-dom para evitar recargas de página
const AppNavbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm">
      <div className="container">
        {/* Enlace al inicio */}
        <Link className="navbar-brand text-danger fw-bold fs-4" to="/">
          NebriAcademy
        </Link>
        <button 
          className="navbar-toggler" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarNav" 
          aria-controls="navbarNav" 
          aria-expanded="false" 
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              {/* NavLink añade la clase 'active' automáticamente */}
              <NavLink className="nav-link" to="/my-academy">Mi Academia</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/">Cursos</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/profile">Mi Perfil</NavLink>
            </li>
            {/* Podemos añadir un enlace para cerrar sesión o ir al login */}
            <li className="nav-item">
              <NavLink className="btn btn-outline-danger ms-2 btn-sm" to="/login">Login</NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default AppNavbar;