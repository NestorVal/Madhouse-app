package com.madhouse.madhouse_app.dto;

import com.madhouse.madhouse_app.model.Reserva;
import java.util.List;

public class ReservaRequest {
    
    private Reserva reserva; // Aquí viene la cabecera (fecha, hora, cliente, barbero)
    private List<Integer> idServicios; // Aquí viene la lista de los servicios que eligió (Ej: [1, 3])

    // --- Getters y Setters ---
    public Reserva getReserva() {
        return reserva;
    }

    public void setReserva(Reserva reserva) {
        this.reserva = reserva;
    }

    public List<Integer> getIdServicios() {
        return idServicios;
    }

    public void setIdServicios(List<Integer> idServicios) {
        this.idServicios = idServicios;
    }
}