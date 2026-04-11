package com.madhouse.madhouse_app.repo;

import org.springframework.stereotype.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import com.madhouse.madhouse_app.model.Reserva;

@Repository
public interface ReservaRepository extends JpaRepository<Reserva, Integer> {
    // Busca todas las reservas donde el ID del cliente coincida con el número que le pasemos
    List<Reserva> findByCliente_IdUsuario(Integer idCliente);

    // Busca todas las reservas donde el ID del barbero coincida (Para la pantalla del barbero)
    List<Reserva> findByBarbero_IdUsuario(Integer idBarbero);
}
