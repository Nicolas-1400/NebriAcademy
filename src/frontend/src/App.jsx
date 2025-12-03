import React from 'react';
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';

import MainLayout from './components/MainLayout.jsx';
import CourseList from './components/CourseList.jsx'; 
import CourseDetailScreen from './components/CourseDetailScreen.jsx';
import LoginScreen from './components/LoginScreen.jsx';
import NebrijaConfirmationScreen from './components/NebrijaConfirmationScreen.jsx';
import SavedCoursesScreen from './components/SavedCoursesScreen.jsx';
import ProfileScreen from './components/ProfileScreen.jsx';

// Layout que siempre muestra MainLayout y renderiza la ruta anidada
const LayoutRoute = () => (
  <MainLayout>
    <Outlet />
  </MainLayout>
);

const App = () => {
  return (
    <BrowserRouter>
      <Routes>

        {/* Rutas públicas (sin navbar) */}
        <Route path="/login" element={<LoginScreen />} />
        <Route path="/confirm-nebrija" element={<NebrijaConfirmationScreen />} />

        {/* Rutas con navbar (usando MainLayout) */}
        <Route path="/" element={<MainLayout><CourseList /></MainLayout>} />
        <Route path="/course/:id" element={<MainLayout><CourseDetailScreen /></MainLayout>} />
        <Route path="/my-academy" element={<MainLayout><SavedCoursesScreen /></MainLayout>} />
        <Route path="/profile" element={<MainLayout><ProfileScreen /></MainLayout>} />

        {/* 404 */}
        <Route path="*" element={<h1 className="text-center mt-5">404 - Página no encontrada</h1>} />

      </Routes>
    </BrowserRouter>
  );
};

export default App;
