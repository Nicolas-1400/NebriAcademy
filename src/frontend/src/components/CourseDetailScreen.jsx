// src/components/CourseDetailScreen.jsx

// Datos de ejemplo para el curso 'HTML5 y CSS3: Maquetación Web' basados en la Página 2
const courseData = {
  title: 'HTML5 y CSS3: Maquetación Web', // [cite: 35]
  category: 'Desarrollo Frontend', // [cite: 36]
  difficulty: 'Intermedio', // [cite: 37]
  duration: '3 horas y 26 minutos', // [cite: 47]
  lessonsTotal: 45, // [cite: 48]
  students: 897, // [cite: 49]
  rating: '98%', // [cite: 46]
  reviewsCount: 207, // [cite: 46]
  description: [
    "Incluso las ilustraciones más llamativas se basan en los conceptos más básicos del diseño.",
    "Aprende cómo hacer funcionar el contraste y el color juntos, usando herramientas mínimas para crear mundos visuales potentes que estimulen la imaginación y que conecten con los espectadores.",
    // Se omite el texto del profesor Pietari Posti para simplificar y centrarse en el diseño.
  ],
  instructor: {
    name: 'Luis Miguel Richart', // [cite: 43]
    role: 'Profesor de Desarrollo Frontend especializado en HTML5 y CSS3.', // [cite: 44]
  },
  chapters: [
    {
      id: 1,
      title: 'Introducción: Primeros pasos en HTML5', // [cite: 28]
      lessons: 3, // [cite: 30]
      duration: '24 min', // [cite: 31]
      content: [
        'Presentación', // [cite: 32]
        'Primeros pasos con el lenguaje', // [cite: 33]
        'Mi primera página Web', // [cite: 34]
      ],
    },
    {
      id: 2,
      title: 'Capítulo 2: Estructura Básica', // Simulación [cite: 38]
      lessons: 5,
      duration: '40 min',
      content: ['Etiquetas básicas', 'La estructura head y body', 'Enlaces'],
    },
    // Se pueden añadir más capítulos basados en [cite: 57, 59]
  ],
  studentReviews: [
    { name: 'Nombre Apellido 1', text: 'Valoración sobre la formación de forma textual.' }, // [cite: 52, 53, 56]
    { name: 'Nombre Apellido 2', text: 'Excelente curso, muy bien explicado.' }, // Simulación [cite: 60, 62, 64]
  ],
};

const CourseDetailScreen = () => {
  const { 
    title, 
    category, 
    difficulty, 
    duration, 
    lessonsTotal, 
    students, 
    rating, 
    reviewsCount, 
    description, 
    instructor, 
    chapters, 
    studentReviews 
  } = courseData;

  return (
    <div className="container mt-4">
      {/* --- Encabezado del Curso --- */}
      <div className="row mb-4">
        <div className="col-12">
          <h1 className="fw-bold mb-1">{title}</h1> {/* [cite: 35] */}
          <p className="lead text-muted">{category} - Dificultad: {difficulty}</p> {/* [cite: 36, 37] */}
        </div>
      </div>

      <div className="row">
        {/* --- Columna Principal (Descripción y Contenido) --- */}
        <div className="col-lg-8">
          
          {/* Descripción del Curso */}
          <h3 className="mb-3 text-danger">Descripción</h3>
          {description.map((text, index) => (
            <p key={index} className="mb-3">{text}</p>
          ))}
          
          <hr />

          {/* Sección de Contenidos (Acordeón de Bootstrap) */}
          <h3 className="mb-3 text-danger">Contenidos:</h3> {/* [cite: 29] */}
          <div className="accordion" id="chaptersAccordion">
            {chapters.map((chapter) => (
              <div key={chapter.id} className="accordion-item mb-2 shadow-sm">
                <h2 className="accordion-header" id={`heading${chapter.id}`}>
                  <button
                    className="accordion-button collapsed fw-bold"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target={`#collapse${chapter.id}`}
                    aria-expanded="false"
                    aria-controls={`collapse${chapter.id}`}
                  >
                    Capítulo {chapter.id}: {chapter.title} {/* [cite: 38] */}
                    <span className="badge bg-secondary ms-3">
                        {chapter.lessons} Lecciones - {chapter.duration} {/* [cite: 30, 31] */}
                    </span>
                  </button>
                </h2>
                <div
                  id={`collapse${chapter.id}`}
                  className="accordion-collapse collapse"
                  aria-labelledby={`heading${chapter.id}`}
                  data-bs-parent="#chaptersAccordion"
                >
                  <div className="accordion-body">
                    <ul className="list-group list-group-flush">
                      {chapter.content.map((lesson, lessonIndex) => (
                        <li key={lessonIndex} className="list-group-item">
                            <i className="bi bi-play-circle-fill text-danger me-2"></i> 
                            {lesson}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <hr className="mt-5" />

          {/* Sección de Valoraciones de estudiantes */}
          <h3 className="mb-4 text-danger">Valoraciones de estudiantes</h3> {/* [cite: 50] */}
          <div className="row">
            {studentReviews.map((review, index) => (
              <div key={index} className="col-12 mb-3">
                <div className="card p-3 border-0 bg-light">
                  <h6 className="fw-bold mb-1">{review.name}</h6> {/* [cite: 52] */}
                  <p className="small text-muted mb-2">Descripción del estudiante</p> {/* [cite: 53] */}
                  <p className="card-text small">"{review.text}"</p> {/* [cite: 56] */}
                </div>
              </div>
            ))}
          </div>

        </div>

        {/* --- Columna Lateral (Instructor y Estadísticas) --- */}
        <div className="col-lg-4">
          
          {/* Tarjeta de Estadísticas del Curso */}
          <div className="card p-4 mb-4 shadow-sm bg-light">
            <h5 className="mb-3 text-danger">Estadísticas Rápidas</h5>
            <ul className="list-group list-group-flush">
              <li className="list-group-item bg-light d-flex justify-content-between">
                Duración: 
                <span className="fw-bold">{duration}</span> {/* [cite: 47] */}
              </li>
              <li className="list-group-item bg-light d-flex justify-content-between">
                Lecciones Totales: 
                <span className="fw-bold">{lessonsTotal}</span> {/* [cite: 48] */}
              </li>
              <li className="list-group-item bg-light d-flex justify-content-between">
                Estudiantes Inscritos: 
                <span className="fw-bold">{students}</span> {/* [cite: 49] */}
              </li>
              <li className="list-group-item bg-light d-flex justify-content-between">
                Valoraciones Positivas: 
                <span className="fw-bold text-success">{rating} ({reviewsCount})</span> {/* [cite: 46] */}
              </li>
            </ul>
          </div>

          {/* Tarjeta del Instructor */}
          <div className="card p-4 shadow-sm">
            <h4 className="fw-bold mb-3">{instructor.name}</h4> {/* [cite: 43] */}
            <p className="text-muted small">{instructor.role}</p> {/* [cite: 44] */}
            <a href="#" className="btn btn-outline-danger mt-3">Contacto</a> {/* [cite: 45] */}
          </div>

        </div>
      </div>
    </div>
  );
};

export default CourseDetailScreen;