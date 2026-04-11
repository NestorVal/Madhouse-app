package com.madhouse.madhouse_app.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.madhouse.madhouse_app.model.ReservaServicio;

@Repository
public interface ReservaServicioRepository extends JpaRepository<ReservaServicio, Integer> {
}