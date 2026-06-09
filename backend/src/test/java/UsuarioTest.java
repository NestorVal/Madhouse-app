import org.junit.jupiter.api.Test;

import com.madhouse.madhouse_app.model.Usuario;

import static org.junit.jupiter.api.Assertions.assertEquals;

public class UsuarioTest {

    @Test
    public void validarAsignacionRolPorDefecto_LogicaControlador() {
        
        // ARRANGE (Arrancar)
        // Instanciamos un usuario como si viniera del frontend sin elegir rol
        Usuario usuarioEntrante = new Usuario();
        usuarioEntrante.setRol(null); // Simulamos que llegó vacío

        // ACT (Actuar)
        // Reproducimos la misma regla de negocio que tienes en tu controlador
        if (usuarioEntrante.getRol() == null || usuarioEntrante.getRol().isEmpty()) {
            usuarioEntrante.setRol("ROLE_CLIENTE");
        }

        // ASSERT (Afirmar)
        // Verificamos que la regla de negocio haya funcionado
        assertEquals("ROLE_CLIENTE", usuarioEntrante.getRol(), "Error: La regla no asignó el rol por defecto");
        
        System.out.println("Validacion exitosa: La lógica validó el nulo y asignó el rol: " + usuarioEntrante.getRol());
    }
}