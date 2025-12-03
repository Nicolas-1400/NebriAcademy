import React from 'react';
import AppNavbar from './AppNavbar.jsx'; 

// El componente debe recibir 'children' como prop
const MainLayout = ({ children }) => {
  return (
    <>
      <AppNavbar />
      {/* ¡Este es el punto crucial! El contenido debe renderizarse aquí. */}
      <main>
        {children}
      </main>
      {/* Podrías añadir un Footer aquí si fuera necesario */}
    </>
  );
};

export default MainLayout;