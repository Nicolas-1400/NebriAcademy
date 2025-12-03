import React from 'react';
import CourseProgressCard from './CourseProgressCard';

const savedCourses = [
  {
    id: 1,
    image: '', 
    title: 'HTML5 y CSS3: Maquetación Web', //
    progress: 74, //
  },
  {
    id: 2,
    image: '',
    title: 'JavaScript para Desarrolladores Frontend',
    progress: 30,
  },
  {
    id: 3,
    image: '',
    title: 'Introducción a Node.js y Bases de Datos',
    progress: 100,
  },
];

const recommendedCourses = [
  {
    id: 4,
    image: '',
    title: 'Diseño UX/UI desde cero', 
    progress: 0, 
  },
  {
    id: 5,
    image: '',
    title: 'Desarrollo de Apps Móviles con React Native',
    progress: 0,
  },
];

const SavedCoursesScreen = () => {
  return (
    <div className="container py-4">
      {/* --- Sección de Cursos Guardados --- */}
      <h3 className="mb-4 fw-bold">
        Cursos guardados <i className="bi bi-chevron-right small text-danger"></i>
      </h3>

      {/* Contenedor con scroll horizontal */}
      <div className="d-flex overflow-auto pb-3 mb-5">
        {savedCourses.map((course) => (
          <CourseProgressCard key={course.id} course={course} />
        ))}
      </div>

      {/* --- Sección de Cursos Recomendados --- */}
      <h3 className="mb-4 fw-bold">
        Cursos recomendados <i className="bi bi-chevron-right small text-danger"></i>
      </h3>
      
      {/* Contenedor con scroll horizontal */}
      <div className="d-flex overflow-auto pb-3">
        {recommendedCourses.map((course) => (
          <CourseProgressCard key={course.id} course={course} />
        ))}
      </div>

    </div>
  );
};

export default SavedCoursesScreen;