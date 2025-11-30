import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';

// 1. ESTILOS BASE (Reset y Tipografía)
import './index.css'; 

// 2. FRAMEWORK (Bootstrap)
import 'bootstrap/dist/css/bootstrap.min.css'; 

// 3. ESTILOS DE COMPONENTES Y OVERRIDES
import './App.css'; 

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);