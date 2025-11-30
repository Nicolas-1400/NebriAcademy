import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import MainLayout from './components/MainLayout.jsx';
import CourseList from './components/CourseList.jsx'; 
import CourseDetailScreen from './components/CourseDetailScreen.jsx';
import LoginScreen from './components/LoginScreen.jsx';
import NebrijaConfirmationScreen from './components/NebrijaConfirmationScreen.jsx';
import SavedCoursesScreen from './components/SavedCoursesScreen.jsx';
import ProfileScreen from './components/ProfileScreen.jsx';


// --- 1. Definición del Layout con Navbar ---
// Usaremos un componente LayoutRoute que siempre renderiza MainLayout
// y anidará las rutas que necesiten la Navbar (Cursos, Perfil, Academia)
const LayoutRoute = () => (
  <MainLayout>
    {/* Outlet renderizará el componente de la ruta anidada */}
    <Outlet /> 
  </MainLayout>
);

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        
        {/* --- 1. Rutas Públicas (SIN Layout) --- */}
        <Route path="/login" element={<LoginScreen />} />
        <Route path="/confirm-nebrija" element={<NebrijaConfirmationScreen />} />

        {/* --- 2. Rutas con el Layout (CON Navbar) --- */}
        {/* Usamos el componente MainLayout directamente en cada ruta que lo necesite */}
        
        <Route 
          path="/" 
          element={<MainLayout><CourseList /></MainLayout>} 
        />
        
        <Route 
          path="/course/:id" 
          element={<MainLayout><CourseDetailScreen /></MainLayout>} 
        />

        <Route 
          path="/my-academy" 
          element={<MainLayout><SavedCoursesScreen /></MainLayout>} 
        />

        <Route 
          path="/profile" 
          element={<MainLayout><ProfileScreen /></MainLayout>} 
        />

        {/* --- Ruta de Error 404 --- */}
        <Route path="*" element={<h1 className="text-center mt-5">404 - Página no encontrada</h1>} />

      </Routes>
    </BrowserRouter>
  );
};

export default App;