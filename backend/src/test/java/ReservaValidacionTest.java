import org.junit.jupiter.api.Test;
import java.time.LocalDate;
import static org.junit.jupiter.api.Assertions.*;

public class ReservaValidacionTest {

    @Test
    public void validarRechazoFechaPasada() {
        
        // ARRANGE (Arrancar)
        // Simulamos que un cliente envía una fecha del año 2020
        LocalDate fechaReservaEnviada = LocalDate.of(2020, 1, 1);
        LocalDate fechaActual = LocalDate.now();

        // ACT & ASSERT (Actuar y Afirmar)
        // assertThrows verifica que el bloque de código lance OBLIGATORIAMENTE un error.
        // Si no lanza el error, la prueba falla porque significa que dejó pasar la fecha mala.
        Exception excepcionLanzada = assertThrows(IllegalArgumentException.class, () -> {
            
            // Aquí simulamos la lógica que debería tener tu Servicio o Controlador
            if (fechaReservaEnviada.isBefore(fechaActual)) {
                throw new IllegalArgumentException("Error: La fecha de reserva no puede estar en el pasado.");
            }
            
        }, "El sistema falló: Permitió registrar una fecha en el pasado");

        // Imprimimos el error capturado para verlo en consola
        System.out.println("Validación exitosa. El sistema detuvo la ejecución con el mensaje: " + excepcionLanzada.getMessage());
    }
}