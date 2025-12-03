import React from 'react';

// Datos de ejemplo para simular el perfil del usuario
const userData = {
  name: '',
  lastName: '',
  email: '',
  phone: '',
};

const ProfileScreen = () => {
  // Función de ejemplo para manejar el envío del formulario
  const handleSave = (event) => {
    event.preventDefault();
    // Aquí iría la lógica para enviar los datos actualizados a un servidor
    console.log('Guardando cambios del perfil...');
  };

  return (
    <div className="container mt-4">
      {/* --- Encabezado General (Similar a la Página 1/6) --- */}
      <div className="row mb-5">
        <div className="col-12">
          <h1 className="fw-bold mb-1">Mi perfil</h1> {/* Título de la sección */}
          <h2 className="text-muted fs-4">¿Qué quieres aprender hoy?</h2> {/* Subtítulo */}
        </div>
      </div>

      <div className="row">
        {/* --- Menú de Navegación Lateral (Columna Izquierda) --- */}
        <div className="col-12 col-lg-3 mb-4">
          [cite_start]<h4 className="mb-3 text-danger">Nombre</h4> {/* Nombre de usuario [cite: 124] */}
          
          <div className="list-group">
            <a href="#" className="list-group-item list-group-item-action">
              <i className="bi bi-person-fill me-2"></i>
              [cite_start]Mis datos {/* [cite: 125] */}
            </a>
            <a href="#" className="list-group-item list-group-item-action">
              <i className="bi bi-gear-fill me-2"></i>
              [cite_start]Ajustes {/* [cite: 127] */}
            </a>
            <a href="#" className="list-group-item list-group-item-action">
              <i className="bi bi-shield-lock-fill me-2"></i>
              [cite_start]Privacidad {/* [cite: 128] */}
            </a>
            {/* Puedes añadir más opciones aquí */}
          </div>
        </div>

        {/* --- Formulario de Edición (Columna Derecha) --- */}
        <div className="col-12 col-lg-9">
          [cite_start]<h3 className="mb-4">Mis datos</h3> {/* [cite: 125] */}

          <form onSubmit={handleSave}>
            {/* Campo Nombre */}
            <div className="mb-3">
              [cite_start]<label htmlFor="name" className="form-label fw-semibold">Nombre</label> {/* [cite: 124] */}
              <input
                type="text"
                className="form-control form-control-lg"
                id="name"
                defaultValue={userData.name}
                required
              />
            </div>
            
            {/* Campo Apellidos */}
            <div className="mb-3">
              [cite_start]<label htmlFor="lastName" className="form-label fw-semibold">Apellidos</label> {/* [cite: 132] */}
              <input
                type="text"
                className="form-control form-control-lg"
                id="lastName"
                defaultValue={userData.lastName}
              />
            </div>

            {/* Campo Correo Electrónico */}
            <div className="mb-3">
              [cite_start]<label htmlFor="email" className="form-label fw-semibold">Correo Electrónico</label> {/* [cite: 126] */}
              <input
                type="email"
                className="form-control form-control-lg"
                id="email"
                defaultValue={userData.email}
                required
                disabled // Deshabilitado porque suele ser la clave de la cuenta
              />
            </div>

            {/* Campo Teléfono */}
            <div className="mb-4">
              [cite_start]<label htmlFor="phone" className="form-label fw-semibold">Teléfono</label> {/* [cite: 133] */}
              <input
                type="tel"
                className="form-control form-control-lg"
                id="phone"
                defaultValue={userData.phone}
              />
            </div>

            {/* Botón de Guardar Cambios */}
            <button 
              type="submit" 
              className="btn btn-danger btn-lg px-5 fw-bold" 
            >
              Guardar cambios
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProfileScreen;