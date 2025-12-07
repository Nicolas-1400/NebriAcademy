const express = require("express");
const app = express();

app.use(express.json());

// Rutas CRUD para cada modelo
app.use("/usuarios", require("./routes/index")(require("./models/Usuarios")));
app.use("/administradores", require("./routes/index")(require("./models/Administradores")));
app.use("/alumnos", require("./routes/index")(require("./models/Alumnos")));
app.use("/profesores", require("./routes/index")(require("./models/Profesores")));
app.use("/cursos", require("./routes/index")(require("./models/Cursos")));
app.use("/profesores-cursos", require("./routes/index")(require("./models/ProfesoresCursos")));
app.use("/cursos-alumnos", require("./routes/index")(require("./models/CursosAlumnos")));
app.use("/apuntes", require("./routes/index")(require("./models/Apuntes")));
app.use("/incidencias", require("./routes/index")(require("./models/Incidencias")));
app.use("/ejercicios", require("./routes/index")(require("./models/Ejercicios")));
app.use("/puntuaciones-ejercicios", require("./routes/index")(require("./models/PuntuacionesEjercicios")));
app.use("/videos", require("./routes/index")(require("./models/Videos")));

// Inicia el servidor en el puerto 3000
app.listen(3000, () => console.log("Servidor corriendo en puerto 3000"));
