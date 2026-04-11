package com.madhouse.madhouse_app.controller;

import com.madhouse.madhouse_app.dto.ReservaRequest;
import com.madhouse.madhouse_app.model.Reserva;
import com.madhouse.madhouse_app.model.ReservaServicio;
import com.madhouse.madhouse_app.model.Servicio;
import com.madhouse.madhouse_app.model.Usuario; // Importante
import com.madhouse.madhouse_app.repo.ReservaRepository;
import com.madhouse.madhouse_app.repo.ReservaServicioRepository;
import com.madhouse.madhouse_app.repo.ServicioRepository;
import com.madhouse.madhouse_app.repo.UsuarioRepository; // Importante

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController // Agrega esta anotación para indicar que es un controlador REST
@RequestMapping("/api/reservas") // Agrega esta anotación para definir la ruta base del controlador
public class ReservaController { // Agrega esta anotación para indicar que es un controlador REST

    @Autowired // Agrega esta anotación para inyectar el repositorio de reservas
    private ReservaRepository reservaRepository; // define el repositorio de reservas que se utilizará para acceder a la base de datos, para guardar la información principal de cada reserva (fecha, hora, cliente, barbero, etc.)

    @Autowired// Agrega esta anotación para inyectar el repositorio de reservas-servicios
    private ReservaServicioRepository reservaServicioRepository; // define el repositorio de reservas-servicios que se utilizará para acceder a la base de datos, para guardar los detalles de cada reserva (los servicios asociados a cada reserva)

    @Autowired // Agrega esta anotación para inyectar el repositorio de servicios
    private ServicioRepository servicioRepository; // define el repositorio de servicios que se utilizará para acceder a la base de datos, para obtener la información de cada servicio (nombre, precio, etc.) al momento de guardar los detalles de cada reserva

    @Autowired // Agrega esta anotación para inyectar el repositorio de usuarios
    private UsuarioRepository usuarioRepository; // define el repositorio de usuarios que se utilizará para acceder a la base de datos, para obtener la información de cada usuario (nombre, apellido, etc.) al momento de guardar la información principal de cada reserva (cliente y barbero)

    @PostMapping("/crear") // Agrega esta anotación para definir la ruta del método de creación de reservas y para indicar que el método recibirá un objeto JSON en el cuerpo de la solicitud
    public Reserva crearReservaCompleta(@RequestBody ReservaRequest request) { // Agrega esta anotación para indicar que el método recibirá un objeto JSON en el cuerpo de la solicitud, que debe tener la estructura definida en la clase ReservaRequest (que incluye una Reserva y una lista de IDs de servicios)
        
        Reserva reservaParaGuardar = request.getReserva();  // 1. EXTRAEMOS la "Reserva" del "ReservaRequest", que es el objeto que viene con los datos principales de la reserva (fecha, hora, cliente, barbero, etc.) pero con los campos cliente y barbero incompletos (solo con el ID)

        // 2. BUSQUEDA ACTIVA: Traemos los datos reales de la BD antes de guardar
        // Esto llena los campos nombre, apellido, etc., que venían null en el JSON
        Usuario clienteBD = usuarioRepository.findById(reservaParaGuardar.getCliente().getIdUsuario()).orElse(null); // Traemos el cliente completo desde la base de datos usando el ID que viene en el JSON (reservaParaGuardar.getCliente().getIdUsuario()), y lo guardamos en una variable llamada "clienteBD"
        Usuario barberoBD = usuarioRepository.findById(reservaParaGuardar.getBarbero().getIdUsuario()).orElse(null); // Traemos el barbero completo desde la base de datos usando el ID que viene en el JSON (reservaParaGuardar.getBarbero().getIdUsuario()), y lo guardamos en una variable llamada "barberoBD"

        // 3. ASIGNACIÓN: Ponemos los objetos completos dentro de la reserva
        reservaParaGuardar.setCliente(clienteBD); // Asignamos el cliente completo (clienteBD) al campo cliente de la reserva (reservaParaGuardar.setCliente(clienteBD))
        reservaParaGuardar.setBarbero(barberoBD); // Asignamos el barbero completo (barberoBD) al campo barbero de la reserva (reservaParaGuardar.setBarbero(barberoBD))

        // 4. GUARDADO: Ahora la "nuevaReserva" tiene toda la info para el JSON
        Reserva nuevaReserva = reservaRepository.save(reservaParaGuardar); // Guardamos la reserva en la base de datos y obtenemos el objeto guardado (nuevaReserva), que ahora incluye el ID generado por la base de datos y toda la información completa del cliente y barbero

        // 5. Guardamos el "Detalle" (Igual que antes)
        for (Integer idServicio : request.getIdServicios()) { // Iteramos sobre la lista de IDs de servicios que viene en el JSON (request.getIdServicios()), y por cada ID hacemos lo siguiente:
            ReservaServicio detalle = new ReservaServicio(); // Creamos un nuevo objeto ReservaServicio llamado "detalle", que representa cada servicio asociado a la reserva
            detalle.setReserva(nuevaReserva); // Asignamos la reserva completa (nuevaReserva) al campo reserva del detalle (detalle.setReserva(nuevaReserva)), para establecer la relación entre el detalle y la reserva
            
            Servicio servicioBD = servicioRepository.findById(idServicio).orElse(null); // Traemos el servicio completo desde la base de datos usando el ID del servicio que estamos iterando (idServicio), y lo guardamos en una variable llamada "servicioBD"
            detalle.setServicio(servicioBD); // Asignamos el servicio completo (servicioBD) al campo servicio del detalle (detalle.setServicio(servicioBD)), para establecer la relación entre el detalle y el servicio, y para tener toda la información del servicio disponible en el detalle (nombre, precio, etc.)

            reservaServicioRepository.save(detalle); // Guardamos el detalle en la base de datos, para que quede registrado cada servicio asociado a la reserva
        }

        return nuevaReserva;  // Devolvemos la reserva completa (nuevaReserva), que incluye toda la información principal de la reserva (fecha, hora, cliente, barbero, etc.) y que ya está relacionada con los detalles (servicios) que se guardaron en la base de datos
    }

    // 1. Consultar reservas de un Cliente específico (Mis Reservas)
    @GetMapping("/cliente/{clienteId}")
    public List<Reserva> obtenerReservasPorCliente(@PathVariable Integer clienteId) {
        // Llama al método que acabamos de crear en el repositorio
        return reservaRepository.findByCliente_IdUsuario(clienteId);
    }

    // 2. Consultar servicios asignados a un Barbero específico (Mis Servicios)
    @GetMapping("/barbero/{barberoId}")
    public List<Reserva> obtenerReservasPorBarbero(@PathVariable Integer barberoId) {
        // Llama al método que acabamos de crear en el repositorio
        return reservaRepository.findByBarbero_IdUsuario(barberoId);
    }
}