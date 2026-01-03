function Alumnos() {
	const alumnos = useLoaderData();

	<h1>Estás en la página Alumnos</h1>;

	return (
		<ul>
			{alumnos.map((alumno) => (
				<li key={alumno.id}>{alumno.name}</li>
			))}
		</ul>
	);
}

export default Alumnos;
