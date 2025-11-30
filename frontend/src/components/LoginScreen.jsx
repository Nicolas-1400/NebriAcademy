// src/components/LoginScreen.jsx
import React from 'react';

// Componente funcional para la pantalla de inicio de sesión
const LoginScreen = () => {
  // Función de ejemplo para manejar el envío del formulario
  const handleSubmit = (event) => {
    event.preventDefault();
    // Aquí iría la lógica de autenticación (ej. llamar a una API)
    console.log('Intento de inicio de sesión...');
  };

  return (
    // Utilizamos las utilidades de Bootstrap para centrar el contenido vertical y horizontalmente
    // vh-100 asegura que ocupe todo el alto de la ventana
    <div className="d-flex align-items-center justify-content-center vh-100 bg-light">
      <div className="card shadow-lg p-4 p-md-5" style={{ maxWidth: '400px', width: '100%', borderRadius: '15px' }}>
        
        {/* Título Principal */}
        <h1 className="text-center mb-4 fw-bold">
          [cite_start]Inicia sesión [cite: 73]
        </h1>

        <form onSubmit={handleSubmit}>
          {/* Campo de Nombre de Usuario */}
          <div className="mb-3">
            <label htmlFor="username" className="form-label fw-semibold">
              [cite_start]Nombre de Usuario [cite: 74]
            </label>
            <input
              type="text"
              className="form-control form-control-lg"
              id="username"
              placeholder=""
              required
            />
          </div>

          {/* Campo de Contraseña */}
          <div className="mb-4">
            <label htmlFor="password" className="form-label fw-semibold">
              [cite_start]Contraseña [cite: 75]
            </label>
            <input
              type="password"
              className="form-control form-control-lg"
              id="password"
              placeholder=""
              required
            />
          </div>

          {/* Botón de Iniciar Sesión */}
          <button 
            type="submit" 
            className="btn btn-danger btn-lg w-100 mb-3 fw-bold" // Clase btn-danger para el color rojo del mockup
          >
            [cite_start]Inicia sesión [cite: 76]
          </button>
        </form>

        {/* Enlaces de Ayuda y Registro */}
        <div className="text-center mt-2">
          [cite_start]{/* ¿Olvidó su contraseña? [cite: 77] */}
          <p className="small mb-2">
            <a href="#" className="text-decoration-none text-muted">
              [cite_start]¿Has olvidado tu contraseña? [cite: 77]
            </a>
          </p>

          [cite_start]{/* Crear una cuenta [cite: 78] */}
          <p className="small mb-0">
            ¿No tienes cuenta?
            <a href="#" className="text-danger fw-bold ms-1 text-decoration-none">
              [cite_start]Crear una cuenta [cite: 78]
            </a>
          </p>
        </div>

      </div>
    </div>
  );
};

export default LoginScreen;