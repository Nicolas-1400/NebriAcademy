import "./App.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./Pages/Home";
import Alumnos from "./Pages/Alumnos";
import Cursos from "./Pages/Cursos";
import AppLayout from "./Components/AppLayout";
import ErrorPage from "./Pages/ErrorPage";
import MasterClass from "./Pages/MasterClass";

//Esto es con React Router versión 6.

const router = createBrowserRouter([
	{
		path: "/", //Ruta de la URL, en este caso HOME
		element: <AppLayout />,//Componente que debe renderizarse
		errorElement: <ErrorPage />,
		children: [
			{
				path: "/",
				element: <Home />,
			},
			{
				path: "/alumnos",
				element: <Alumnos />,

				loader: async () => {
					const res = await fetch("https://jsonplaceholder.typicode.com/alumnos");
					return res.json();
				},
			},
			{
				path: "/cursos",
				element: <Cursos />,
			},
			{
				path: "/masterclass",
				element: <MasterClass />,
			},
		], //Componentes navegables del elemento
	},
]);

function App() {
	return <RouterProvider router={router} />;
}

export default App;
