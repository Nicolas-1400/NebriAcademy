// src/components/CourseProgressCard.jsx
import React from 'react';

const CourseProgressCard = ({ course }) => {
  const { title, progress, image } = course;

  return (
    // Estructura de la tarjeta, usando un ancho fijo para permitir el scroll horizontal
    <div className="card me-3 border-0 shadow-sm" style={{ minWidth: '300px' }}>
      <div className="row g-0">
        
        {/* Columna de la Imagen */}
        <div className="col-4">
          {/* Simulación de la imagen  */}
          <div style={{ backgroundColor: '#ccc', height: '100%', overflow: 'hidden', borderTopLeftRadius: '0.3rem', borderBottomLeftRadius: '0.3rem' }}>
             <img 
                src={image} 
                className="img-fluid rounded-start" 
                alt={title} 
                style={{ objectFit: 'cover', height: '100%' }}
            />
          </div>
        </div>

        {/* Columna de Contenido y Progreso */}
        <div className="col-8 d-flex flex-column justify-content-between p-3">
          <h6 className="fw-bold mb-2">
            {title}
          </h6>
          
          {/* Barra de Progreso de Bootstrap */}
          <div>
            <div className="progress" style={{ height: '8px' }}>
              <div
                className="progress-bar bg-danger" // Clase bg-danger para el color rojo
                role="progressbar"
                style={{ width: `${progress}%` }}
                aria-valuenow={progress}
                aria-valuemin="0"
                aria-valuemax="100"
              ></div>
            </div>
            <p className="text-end small fw-bold text-danger mt-1 mb-0">
              {progress}%
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseProgressCard;