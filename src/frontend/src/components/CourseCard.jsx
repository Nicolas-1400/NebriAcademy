// src/components/CourseCard.jsx
import React from 'react';
import { Link } from 'react-router-dom'; // Importamos Link para la navegación

const CourseCard = ({ course }) => {
  const { 
    id, // Usamos el ID para el enlace de detalle
    image, 
    duration, 
    title, 
    instructor, 
    isPopular, 
    ratingStars, 
    reviews 
  } = course;

  return (
    // Envolvemos la tarjeta con Link para que sea navegable al detalle
    <div className="col-12 col-sm-6 col-md-4 mb-4">
      <Link to={`/course/${id}`} className="text-decoration-none text-dark">
        <div className="card h-100 shadow-sm border-0 transition-shadow hover-shadow-lg"> {/* Clase de Bootstrap para sombra y una clase personalizada para efecto hover */}
          
          {/* Imagen del Curso */}
          <div style={{ backgroundColor: '#ccc', height: '150px', overflow: 'hidden' }}>
              <img 
                  src={image} 
                  className="card-img-top w-100 h-100" 
                  alt={title} 
                  style={{ objectFit: 'cover' }}
              />
          </div>
          
          {/* Etiqueta POPULAR */}
          {isPopular && (
            <span className="badge bg-danger position-absolute top-0 end-0 mt-2 me-2" style={{ zIndex: 1, fontSize: '0.8rem' }}>
              POPULAR
            </span>
          )}

          <div className="card-body d-flex flex-column">
            <p className="text-muted small mb-1">{course.category}</p>
            <h5 className="card-title fw-bold mb-2">{title}</h5>
            <p className="card-subtitle mb-3 text-muted small">
              {instructor}
            </p>

            {/* Duración y Calificación */}
            <div className="mt-auto">
               <p className="card-text small mb-1">
                  <i className="bi bi-clock me-1"></i> 
                  {duration}
              </p>
              <div className="d-flex justify-content-between align-items-center">
                  <span className="text-warning fw-bold">{ratingStars}</span> 
                  <span className="text-muted small">
                      {course.rating}% ({reviews})
                  </span> 
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default CourseCard;