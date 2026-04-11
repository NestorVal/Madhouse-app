// --- IMPORTACIONES PRINCIPALES ---
// Importamos React, la librería base.
import React from 'react';
// Importamos las herramientas de enrutamiento de 'react-router-dom'.
// Estas son las palabras clave que nos permiten crear una aplicación SPA (Single Page Application)
// donde cambiamos de "página" sin recargar el navegador web.
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// --- IMPORTACIÓN DE COMPONENTES GLOBALES ---
// Estos son los componentes que se verán en todas las pantallas (Arriba y Abajo).
import Header from './components/Header';
import Footer from './components/Footer';

// --- IMPORTACIÓN DE VISTAS (PÁGINAS) ---
// Solo importamos las pantallas que YA existen en la carpeta pages.
// Cada uno de estos componentes representa una pantalla completa de la aplicación.
import Login from './pages/Login';
import Register from './pages/Register';
import Reservas from './pages/Reservas';
import Home from './pages/Home';
import DashboardCliente from './pages/DashboardClientes';
import PerfilCliente from './pages/PerfilCliente';
import Servicios from './pages/Servicios';
import Barberos from './pages/Barberos';
import Nosotros from './pages/SobreNosotros';
import MisReservas from './pages/MisReservas';  
import Fidelizacion from './pages/Fidelizacion';
import DashboardBarbero from './pages/DashboardBarbero';
import PerfilBarbero from './pages/PerfilBarbero';
import MisServiciosBarbero from './pages/MisServiciosBarbero';
import EditarPerfil from './pages/EditarPerfil';
import CambiarContrasena from './pages/CambiarContrasena';

function App() {
  // --- RENDERIZADO DE LA ARQUITECTURA ---
  return (
    // <BrowserRouter>: Es el contenedor principal. Activa el sistema de rutas en toda la app.
    // Envuelve todo para que React pueda leer y manipular la barra de direcciones (URL) del navegador.
    <BrowserRouter>
      
      {/* HEADER GLOBAL: Al estar por fuera de <Routes>, este componente SIEMPRE estará visible 
          en la parte superior de la pantalla, sin importar en qué URL estemos. */}
      <Header/>
      
      {/* <Routes>: Es el contenedor lógico de rutas. 
          Aquí adentro definimos las reglas de "Si la URL es X, muestra el componente Y". 
          React buscará aquí la coincidencia exacta y dibujará ese componente en el centro de la pantalla. */}
      <Routes>
        
        {/* REDIRECCIÓN AUTOMÁTICA: 
            path="/": Es la ruta raíz (cuando alguien entra a www.madhouse.com sin nada más).
            <Navigate to="/home" />: Intercepta esa visita y envía al usuario directamente a la pantalla de Home. */}
        <Route path="/" element={<Navigate to="/home" />} />
        
        {/* DEFINICIÓN DE RUTAS INDIVIDUALES:
            path="...": El texto que aparecerá en la URL del navegador.
            element={<... />}: El componente (pantalla) que se va a inyectar cuando se visite ese path. */}
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Register />} />
        <Route path="/reservas" element={<Reservas />} />
        <Route path ="/home" element={<Home />} />
        
        {/* RUTAS DEL CLIENTE */}
        <Route path ="/dashboard-cliente" element={<DashboardCliente />} />
        <Route path ="/perfil-cliente" element={<PerfilCliente />} />
        <Route path ="/servicios" element={<Servicios />} />
        <Route path ="/barberos" element={<Barberos />} />
        <Route path ="/sobre-nosotros" element={<Nosotros />} />
        <Route path ="/mis-reservas" element={<MisReservas />} />
        <Route path ="/fidelizacion" element={<Fidelizacion />} />
        
        {/* RUTAS DEL BARBERO */}
        <Route path="/dashboard-barbero" element={<DashboardBarbero />} />
        <Route path="/perfil-barbero" element={<PerfilBarbero />} />
        <Route path="/mis-servicios-barbero" element={<MisServiciosBarbero />} />
        
        {/* RUTAS COMPARTIDAS (Gestión de Perfil) */}
        <Route path="/editar-perfil" element={<EditarPerfil />} />
        <Route path="/cambiar-contrasena" element={<CambiarContrasena />} />
        
      </Routes>
      
      {/* FOOTER GLOBAL: Al igual que el Header, al estar por fuera de <Routes> pero dentro de <BrowserRouter>,
          se dibujará de forma estática en la parte inferior de todas las pantallas. */}
      <Footer/>
      
    </BrowserRouter>
  );
}

// Exportamos la función App para que el archivo index.js (el motor de arranque de React) lo pueda encender.
export default App;