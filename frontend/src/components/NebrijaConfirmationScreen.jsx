import React, { useState } from 'react';

const NebrijaConfirmationScreen = () => {
  // Estado para simular la selección del usuario (opcional)
  const [isNebrijaFamily, setIsNebrijaFamily] = useState(null);

  const handleSelection = (isYes) => {
    setIsNebrijaFamily(isYes);
    // Aquí iría la lógica para navegar a la siguiente pantalla de registro o ajuste de perfil
    console.log(`Selección: ${isYes ? 'Sí (Familia Nebrija)' : 'No (No estudio actualmente)'}`);
  };

  // Clase CSS para el botón activo/seleccionado
  const activeClass = (isYes) => (
    isNebrijaFamily === isYes ? 'btn-danger' : 'btn-outline-secondary'
  );

  return (
    // Centramos el contenido en la vista
    <div className="d-flex align-items-center justify-content-center vh-100 bg-light p-3">
      <div className="text-center" style={{ maxWidth: '400px', width: '100%' }}>
        
        {/* Logo/Título de la Aplicación */}
        <h1 className="text-danger fw-bold mb-5">
            NebriAcademy
        </h1>

        {/* Pregunta Principal */}
        <h2 className="mb-5 fw-bold">
          ¿Eres de la familia Nebrija?
        </h2>

        {/* --- Opciones de Selección --- */}
        <div className="d-grid gap-4">
          
          {/* Opción SÍ */}
          <button 
            className={`btn btn-lg py-3 ${activeClass(true)} border-2`} 
            onClick={() => handleSelection(true)}
          >
            Sí
          </button>
          <p className="text-muted small mt-n3 mb-4">
            Estudio actualmente en un centro asociado a Nebrija.
          </p>

          {/* Opción NO */}
          <button 
            className={`btn btn-lg py-3 ${activeClass(false)} border-2`} 
            onClick={() => handleSelection(false)}
          >
            No
          </button>
          <p className="text-muted small mt-n3">
            No estudio actualmente en un centro asociado a Nebrija.
          </p>
        </div>

      </div>
    </div>
  );
};

export default NebrijaConfirmationScreen;