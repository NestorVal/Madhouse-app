// Importaciones principales
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// Componentes globales
import Header from './components/Header';
import Footer from './components/Footer';
import RutaProtegida from './components/RutaProtegida';

// Páginas
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
import EditarPerfilBarbero from './pages/EditarPerfilBarbero';
import CrearServicio from './pages/CrearServicio';  

function App() {
  return (
    <BrowserRouter>
      <Header/>
      
      <Routes>
        {/* Rutas públicas: accesibles para todos */}
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Register />} />
        
        {/* Catálogos públicos */}
        <Route path="/servicios" element={<Servicios />} />
        <Route path="/barberos" element={<Barberos />} />
        <Route path="/sobre-nosotros" element={<Nosotros />} />


        {/* Rutas privadas cliente: requieren rol ROLE_CLIENTE */}
        <Route element={<RutaProtegida rolRequerido="ROLE_CLIENTE" />}>
            <Route path="/dashboard-cliente" element={<DashboardCliente />} />
            <Route path="/perfil-cliente" element={<PerfilCliente />} />
            <Route path="/reservas" element={<Reservas />} />
            <Route path="/mis-reservas" element={<MisReservas />} />
            <Route path="/fidelizacion" element={<Fidelizacion />} />
            <Route path="/editar-perfil" element={<EditarPerfil />} />
        </Route>


        {/* Rutas privadas barbero: requieren rol ROLE_BARBERO */}
        <Route element={<RutaProtegida rolRequerido="ROLE_BARBERO" />}>
            <Route path="/dashboard-barbero" element={<DashboardBarbero />} />
            <Route path="/perfil-barbero" element={<PerfilBarbero />} />
            <Route path="/mis-servicios-barbero" element={<MisServiciosBarbero />} />
            <Route path="/editar-perfil-barbero" element={<EditarPerfilBarbero />} />
            <Route path="/crear-servicio" element={<CrearServicio />} />
        </Route>


        {/* Rutas compartidas autenticadas: accesibles después de login */}
        <Route path="/cambiar-contrasena" element={<CambiarContrasena />} />

      </Routes>
      
      <Footer/>
    </BrowserRouter>
  );
}

export default App;