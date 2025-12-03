// src/components/CourseList.jsx
import React from 'react';
import CourseCard from './CourseCard.jsx'; // Asegúrate de que la extensión sea correcta (.jsx o .js)

// Datos de ejemplo basados en la Página 1
const mockCourses = [
  {
    id: 1,
    image: 'https://via.placeholder.com/300x150?text=Maquetación+Web',
    duration: '3 h. y 26 min.',
    title: 'HTML5 y CSS3: Maquetación Web',
    instructor: 'Luis Miguel Richart',
    category: 'Desarrollo Frontend',
    isPopular: true,
    ratingStars: '★★☆',
    rating: '98',
    reviews: 105,
  },
  {
    id: 2,
    image: 'https://via.placeholder.com/300x150?text=JavaScript+Moderno',
    duration: '5 h. y 15 min.',
    title: 'Introducción a JavaScript Moderno',
    instructor: 'María García',
    category: 'Desarrollo Frontend', 
    isPopular: false,
    ratingStars: '★★★',
    rating: '95',
    reviews: 240,
  },
  {
    id: 3,
    image: 'https://via.placeholder.com/300x150?text=Python+Datos',
    duration: '7 h. y 40 min.',
    title: 'Python para el Análisis de Datos',
    instructor: 'Javier Santos',
    category: 'Desarrollo Backend',
    isPopular: true, 
    ratingStars: '★★☆',
    rating: '99',
    reviews: 88,
  },
  {
    id: 4,
    image: 'https://via.placeholder.com/300x150?text=React+Hooks',
    duration: '4 h. y 5 min.',
    title: 'React desde Cero: Hooks y Router',
    instructor: 'Pedro Fernández',
    category: 'Desarrollo Frontend',
    isPopular: false, 
    ratingStars: '★★★',
    rating: '92',
    reviews: 150,
  },
];

const CourseList = () => {
  return (
    <div className="container mt-4">
      {/* --- Sección de Búsqueda y Título --- */}
      <h2 className="mb-4 fw-light">
        ¿Qué quieres aprender hoy?
      </h2>

      {/* Barra de Búsqueda (Input Group de Bootstrap) */}
      <div className="input-group mb-5 shadow-sm">
        <input 
          type="text" 
          className="form-control form-control-lg border-0" 
          placeholder="Buscar cursos..." 
          aria-label="Buscar cursos"
        />
        <button className="btn btn-danger" type="button">
          <i className="bi bi-search"></i>
          Buscar
        </button>
      </div>

      <div className="row">
        {/* --- Sidebar de Filtros (Categorías y Dificultad) --- */}
        <div className="col-12 col-lg-3">
          
          {/* Filtro por Categorías */}
          <h4 className="mb-3 text-danger">Categorías</h4>
          <div className="list-group mb-4">
            {/* Los filtros en Bootstrap se ven bien con list-group */}
            <button type="button" className="list-group-item list-group-item-action ">
              Desarrollo Frontend
            </button>
            <button type="button" className="list-group-item list-group-item-action">
              Desarrollo Backend
            </button>
            <button type="button" className="list-group-item list-group-item-action">
              Desarrollo Full-Stack
            </button>
          </div>

          {/* Filtro por Dificultad */}
          <h4 className="mb-3 text-danger">Dificultad</h4>
          <div className="list-group mb-4">
            <button type="button" className="list-group-item list-group-item-action">
              Principiante
            </button>
            <button type="button" className="list-group-item list-group-item-action ">
              Intermedio ★★
            </button>
            <button type="button" className="list-group-item list-group-item-action">
              Avanzado ★★★
            </button>
          </div>
        </div>

        {/* --- Área Principal de Tarjetas de Curso --- */}
        <div className="col-12 col-lg-9">
          <h3 className="mb-4">Cursos de Desarrollo Frontend</h3>
          
          <div className="row">
            {/* Mapeo de los datos simulados para renderizar las CourseCards */}
            {mockCourses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseList;