const express = require("express");
const app = express();

app.use(express.json());

// Rutas
app.use("/usuarios", require("./routes/usuarios"));
app.use("/administradores", require("./routes/administradores"));
app.use("/alumnos", require("./routes/alumnos"));
app.use("/profesores", require("./routes/profesores"));
app.use("/cursos", require("./routes/cursos"));
app.use("/profesores-cursos", require("./routes/profesoresCursos"));
app.use("/cursos-alumnos", require("./routes/cursosAlumnos"));
app.use("/apuntes", require("./routes/apuntes"));
app.use("/incidencias", require("./routes/incidencias"));
app.use("/ejercicios", require("./routes/ejercicios"));
app.use("/puntuaciones-ejercicios", require("./routes/puntuacionesEjercicios"));
app.use("/videos", require("./routes/videos"));

app.listen(3000, () => console.log("Servidor corriendo en puerto 3000"));
