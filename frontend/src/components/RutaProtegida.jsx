import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import Swal from 'sweetalert2';

const RutaProtegida = ({ rolRequerido }) => {
    // Leer el usuario guardado en localStorage
    const usuarioStr = localStorage.getItem("usuario");

    // Si no hay sesión, redirigir al login
    if (!usuarioStr) {
        return <Navigate to="/login" replace />;
    }

    const usuario = JSON.parse(usuarioStr);

    // Si el rol no coincide, mostrar error y redirigir al dashboard correcto
    if (usuario.rol !== rolRequerido) {
        Swal.fire({
            title: 'Acceso Denegado',
            text: 'No tienes los permisos para acceder a esta área.',
            icon: 'error',
            confirmButtonColor: '#121212'
        });

        // Redirigir al dashboard del usuario
        if (usuario.rol === 'ROLE_BARBERO') {
            return <Navigate to="/dashboard-barbero" replace />;
        } else {
            return <Navigate to="/dashboard-cliente" replace />;
        }
    }

    // Si todo está bien, mostrar el componente protegido
    return <Outlet />;
};

export default RutaProtegida;